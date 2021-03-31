package umm3601.contextpack;

import static com.mongodb.client.model.Filters.eq;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.common.collect.ImmutableMap;
import com.mockrunner.mock.web.MockHttpServletRequest;
import com.mockrunner.mock.web.MockHttpServletResponse;
import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;

import org.bson.Document;
import org.bson.types.ObjectId;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.NotFoundResponse;
import io.javalin.http.util.ContextUtil;
import io.javalin.plugin.json.JavalinJson;
import umm3601.contextpack.ContextPackControllerSpec;

public class ContextPackControllerSpec {

  MockHttpServletRequest mockReq = new MockHttpServletRequest();
  MockHttpServletResponse mockRes = new MockHttpServletResponse();

  private ContextPackController contextPackController;

  private ObjectId testID;

  static MongoClient mongoClient;
  static MongoDatabase db;

  static ObjectMapper jsonMapper = new ObjectMapper();

  @BeforeAll
  public static void setupAll() {
    String mongoAddr = System.getenv().getOrDefault("MONGO_ADDR", "localhost");

    mongoClient = MongoClients.create(MongoClientSettings.builder()
        .applyToClusterSettings(builder -> builder.hosts(Arrays.asList(new ServerAddress(mongoAddr)))).build());

    db = mongoClient.getDatabase("test");
  }

  @BeforeEach
  public void setupEach() throws IOException {

    // Reset our mock request and response objects
    mockReq.resetAll();
    mockRes.resetAll();

    // Setup database
    MongoCollection<Document> contextPackDocuments = db.getCollection("contextpacks");
    contextPackDocuments.drop();
    testID = new ObjectId();
    Document testPackID = new Document()
    .append("_id", testID)
    .append("name", "baskets")
    .append("icon", "dog.png")
    .append("enabled", true)
    .append("wordlists", Arrays.asList(
      new Document("name", "dogs")
            .append("enabled", true)
            .append("verbs",
                Arrays.asList(new Document("word", "run").append("forms", Arrays.asList("horsie", "horse"))))
            .append("nouns",
                Arrays.asList(new Document("word", "horse").append("forms", Arrays.asList("horsie", "horse"))))
            .append("adjectives",
                Arrays.asList(new Document("word", "blue").append("forms", Arrays.asList("horsie", "horse"))))
            .append("misc",
                Arrays.asList(new Document("word", "goat").append("forms", Arrays.asList("horsie", "horse")))),

      new Document("name", "cats")
            .append("enabled", true)
            .append("verbs",
                Arrays.asList(new Document("word", "walk").append("forms", Arrays.asList("pink", "pork"))))
            .append("nouns",
                Arrays.asList(new Document("word", "goat").append("forms", Arrays.asList("goat", "goats"))))
            .append("adjectives",
                Arrays.asList(new Document("word", "red").append("forms", Arrays.asList("seven", "horse"))))
            .append("misc",
                Arrays.asList(new Document("word", "moo").append("forms", Arrays.asList("horse"))))

                )

    );
    contextPackDocuments.insertOne(testPackID);

    MongoCollection<Document> wordlistDocuments = db.getCollection("wordlists");

    Document testListID = new Document()
          .append("_id", testID)
          .append("name", "MountainDew")
          .append("enabled", true)
          .append("nouns",
                Arrays.asList(new Document("word", "horse").append("forms", Arrays.asList("horsie", "horse"))))
          .append("adjectives",
                Arrays.asList(new Document("word", "Bob").append("forms", Arrays.asList("Bob"))))
          .append("verbs",
                Arrays.asList(new Document("word", "run").append("forms", Arrays.asList("ran", "runs"))))
          .append("misc",
                Arrays.asList(new Document("word", "run").append("forms", Arrays.asList("ran", "runs"))));
    wordlistDocuments.insertOne(testListID);
    contextPackController = new ContextPackController(db);
  }

  @AfterAll
  public static void teardown() {
    db.drop();
    mongoClient.close();
  }

  @Test
  public void GetAllContextPacks() throws IOException {

    // Create our fake Javalin context
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/contextpacks");
    contextPackController.getContextPacks(ctx);

    assertEquals(200, mockRes.getStatus());

    String result = ctx.resultString();
    assertTrue(JavalinJson.fromJson(result, ContextPack[].class).length >= 1);
    assertEquals(db.getCollection("contextpacks").countDocuments(),
        JavalinJson.fromJson(result, ContextPack[].class).length);

  }


  @Test
  public void AddInvalidContextPackNullTopic(){
    String test = "{"
    + "\"topic\": \"\","
    + "\"enabled\": true,"
    + "\"nouns\": ["
    + "{\"word\": \"he\", \"forms\": [\"he\"]},"
    + "{\"word\": \"she\", \"forms\": [\"he\"]}"
    + "],"
    + "\"adjectives\": ["
    + "{\"word\": \"he\", \"forms\": [\"he\"]},"
    + "{\"word\": \"he\", \"forms\": [\"he\"]}"
    + "],"
    + "\"verbs\": ["
    + "{\"word\": \"he\", \"forms\": [\"he\"]},"
    + "{\"word\": \"he\", \"forms\": [\"he\"]}"
    + "],"
    + "\"misc\": ["
    + "{\"word\": \"he\", \"forms\": [\"he\"]},"
    + "{\"word\": \"he\", \"forms\": [\"he\"]}"
    + "]"
    + "}"
    ;

    mockReq.setBodyContent(test);
    mockReq.setMethod("POST");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/contextpacks");

    assertThrows(BadRequestResponse.class, () -> {
      contextPackController.addNewContextPack(ctx);
    });

  }


  @Test
  public void AddInvalidContextPackIllegalStatus(){
    String test = "{"
    + "\"topic\": \"cats\","
    + "\"enabled\": hockey,"
    + "\"nouns\": ["
    + "{\"word\": \"he\", \"forms\": [\"he\"]},"
    + "{\"word\": \"she\", \"forms\": [\"he\"]}"
    + "],"
    + "\"adjectives\": ["
    + "{\"word\": \"he\", \"forms\": [\"he\"]},"
    + "{\"word\": \"he\", \"forms\": [\"he\"]}"
    + "],"
    + "\"verbs\": ["
    + "{\"word\": \"he\", \"forms\": [\"he\"]},"
    + "{\"word\": \"he\", \"forms\": [\"he\"]}"
    + "],"
    + "\"misc\": ["
    + "{\"word\": \"he\", \"forms\": [\"he\"]},"
    + "{\"word\": \"he\", \"forms\": [\"he\"]}"
    + "]"
    + "}"
    ;

    mockReq.setBodyContent(test);
    mockReq.setMethod("POST");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/contextpacks");

    assertThrows(BadRequestResponse.class, () -> {
      contextPackController.addNewContextPack(ctx);
    });
  }


  @Test
  public void AddInvalidContextPackEmptyStatus(){
    String test = "{"
    + "\"topic\": \"cats\","
    + "\"enabled\": ,"
    + "\"nouns\": ["
    + "{\"word\": \"he\", \"forms\": [\"he\"]},"
    + "{\"word\": \"she\", \"forms\": [\"he\"]}"
    + "],"
    + "\"adjectives\": ["
    + "{\"word\": \"he\", \"forms\": [\"he\"]},"
    + "{\"word\": \"he\", \"forms\": [\"he\"]}"
    + "],"
    + "\"verbs\": ["
    + "{\"word\": \"he\", \"forms\": [\"he\"]},"
    + "{\"word\": \"he\", \"forms\": [\"he\"]}"
    + "],"
    + "\"misc\": ["
    + "{\"word\": \"he\", \"forms\": [\"he\"]},"
    + "{\"word\": \"he\", \"forms\": [\"he\"]}"
    + "]"
    + "}"
    ;

    mockReq.setBodyContent(test);
    mockReq.setMethod("POST");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/contextpacks");

    assertThrows(BadRequestResponse.class, () -> {
      contextPackController.addNewContextPack(ctx);
    });

  }
  @Test
  public void AddNewInvalidContextPackEmptyListTopic() throws IOException {
    String test = "{"
    + "\"name\": \"no topic wordlist pack\","
    + "\"icon\": \"eye.png\","
    + "\"enabled\": true,"
    + "\"wordlist\":"
    + "{"
    + "\"topic\": \"\","
    + "\"enabled\": true,"
    + "\"nouns\": [],"
    + "\"adjectives\": [],"
    + "\"verbs\": [],"
    + "\"misc\": []"
    + "}}"
  ;

    mockReq.setBodyContent(test);
    mockReq.setMethod("POST");

    Context ctx = ContextUtil.init(mockReq, mockRes, "api/contextpacks");

    contextPackController.addNewContextPack(ctx);
    assertEquals(201, mockRes.getStatus());

    String result = ctx.resultString();
    String id = jsonMapper.readValue(result, ObjectNode.class).get("id").asText();

    assertNotEquals("", id);
    System.out.println(id);
    System.out.println(result);

    assertEquals(1, db.getCollection("contextpacks").countDocuments(eq("_id", new ObjectId(id))));


    Document addedPack = db.getCollection("contextpacks").find(eq("_id", new ObjectId(id))).first();
    assertNotNull(addedPack);
    assertEquals("no topic wordlist pack", addedPack.getString("name"));
    assertNotNull(addedPack);

  }
  @Test
  public void AddNewInvalidContextPackEmptyListStatus() throws IOException {
    String test = "{"
    + "\"name\": \"no status wordlist pack\","
    + "\"icon\": \"eye.png\","
    + "\"enabled\": true,"
    + "\"wordlist\":"
    + "{"
    + "\"topic\": \"houses\","
    + "\"enabled\": ,"
    + "\"nouns\": [],"
    + "\"adjectives\": [],"
    + "\"verbs\": [],"
    + "\"misc\": []"
    + "}}"
  ;

    mockReq.setBodyContent(test);
    mockReq.setMethod("POST");

    Context ctx = ContextUtil.init(mockReq, mockRes, "api/contextpacks");

    contextPackController.addNewContextPack(ctx);
    assertEquals(201, mockRes.getStatus());

    String result = ctx.resultString();
    String id = jsonMapper.readValue(result, ObjectNode.class).get("id").asText();

    assertNotEquals("", id);
    System.out.println(id);
    System.out.println(result);

    assertEquals(1, db.getCollection("contextpacks").countDocuments(eq("_id", new ObjectId(id))));


    Document addedPack = db.getCollection("contextpacks").find(eq("_id", new ObjectId(id))).first();
    assertNotNull(addedPack);
    assertEquals("no status wordlist pack", addedPack.getString("name"));
    assertNotNull(addedPack);

  }

  @Test
  public void AddNewContextPack() throws IOException {
    String test = "{"
    + "\"name\": \"sight words\","
    + "\"icon\": \"eye.png\","
    + "\"enabled\": true,"
    + "\"wordlist\":"
      + "{"
      + "\"topic\": \"goats\","
      + "\"enabled\": true,"
      + "\"nouns\": ["
      + "{\"word\": \"boat\", \"forms\": [\"he\"]},"
      + "{\"word\": \"she\", \"forms\": [\"he\"]}"
      + "],"
      + "\"adjectives\": ["
      + "{\"word\": \"he\", \"forms\": [\"he\"]},"
      + "{\"word\": \"he\", \"forms\": [\"he\"]}"
      + "],"
      + "\"verbs\": ["
      + "{\"word\": \"he\", \"forms\": [\"he\"]},"
      + "{\"word\": \"he\", \"forms\": [\"he\"]}"
      + "],"
      + "\"misc\": ["
      + "{\"word\": \"duck\", \"forms\": [\"ducky\"]},"
      + "{\"word\": \"he\", \"forms\": [\"he\"]}"
      + "]"
      + "}}"
    ;

    mockReq.setBodyContent(test);
    mockReq.setMethod("POST");

    Context ctx = ContextUtil.init(mockReq, mockRes, "api/contextpacks");

    contextPackController.addNewContextPack(ctx);
    assertEquals(201, mockRes.getStatus());

    String result = ctx.resultString();
    String id = jsonMapper.readValue(result, ObjectNode.class).get("id").asText();

    assertNotEquals("", id);
    System.out.println(id);
    System.out.println(result);

    assertEquals(1, db.getCollection("contextpacks").countDocuments(eq("_id", new ObjectId(id))));


    Document addedPack = db.getCollection("contextpacks").find(eq("_id", new ObjectId(id))).first();
    assertNotNull(addedPack);
    assertEquals("sight words", addedPack.getString("name"));
    assertNotNull(addedPack);

  }
  @Test
  public void AddNewEmptyContextPack() throws IOException {
    String test = "{"
    + "\"name\": \"empty pack\","
    + "\"icon\": \"eye.png\","
    + "\"enabled\": true,"
    ;

    mockReq.setBodyContent(test);
    mockReq.setMethod("POST");

    Context ctx = ContextUtil.init(mockReq, mockRes, "api/contextpacks");

    contextPackController.addNewContextPack(ctx);
    assertEquals(201, mockRes.getStatus());

    String result = ctx.resultString();
    String id = jsonMapper.readValue(result, ObjectNode.class).get("id").asText();

    assertNotEquals("", id);
    System.out.println(id);
    System.out.println(result);

    assertEquals(1, db.getCollection("contextpacks").countDocuments(eq("_id", new ObjectId(id))));


    Document addedPack = db.getCollection("contextpacks").find(eq("_id", new ObjectId(id))).first();
    assertNotNull(addedPack);
    assertEquals("empty pack", addedPack.getString("name"));
    assertNotNull(addedPack);

  }
  @Test
  public void AddNewContextPackWithEmptyList() throws IOException {
    String test = "{"
    + "\"name\": \"empty wordlist pack\","
    + "\"icon\": \"eye.png\","
    + "\"enabled\": true,"
    + "\"wordlist\":"
    + "{"
    + "\"topic\": \"goats\","
    + "\"enabled\": true,"
    + "\"nouns\": [],"
    + "\"adjectives\": [],"
    + "\"verbs\": [],"
    + "\"misc\": []"
    + "}}"
  ;

    mockReq.setBodyContent(test);
    mockReq.setMethod("POST");

    Context ctx = ContextUtil.init(mockReq, mockRes, "api/contextpacks");

    contextPackController.addNewContextPack(ctx);
    assertEquals(201, mockRes.getStatus());

    String result = ctx.resultString();
    String id = jsonMapper.readValue(result, ObjectNode.class).get("id").asText();

    assertNotEquals("", id);
    System.out.println(id);
    System.out.println(result);

    assertEquals(1, db.getCollection("contextpacks").countDocuments(eq("_id", new ObjectId(id))));


    Document addedPack = db.getCollection("contextpacks").find(eq("_id", new ObjectId(id))).first();
    assertNotNull(addedPack);
    assertEquals("empty wordlist pack", addedPack.getString("name"));
    assertNotNull(addedPack);

  }

  @Test
  public void GetContextPack(){
    String testContextPackID = testID.toHexString();

    Context ctx = ContextUtil.init(mockReq, mockRes, "api/contextpacks/:id" , ImmutableMap.of("id", testContextPackID));
    contextPackController.getContextPack(ctx);
    assertEquals(200, mockRes.getStatus());

    String result = ctx.resultString();
    ContextPack resultPack = JavalinJson.fromJson(result, ContextPack.class);

    assertEquals(resultPack._id, testContextPackID);
    assertEquals("baskets", resultPack.name);
  }

  @Test
  public void getContextPackInvalidID(){
     Context ctx = ContextUtil.init(mockReq, mockRes, "api/contextpacks/:id" , ImmutableMap.of("id", "chickens"));

    assertThrows(BadRequestResponse.class, ()->{
      contextPackController.getContextPack(ctx);
    });

  }

  @Test
  public void getContextPackNOID(){
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/contextpacks/:id" , ImmutableMap.of("id", "58af3a600343927e48e87335"));

    assertThrows(NotFoundResponse.class, ()->{
      contextPackController.getContextPack(ctx);
    });

  }

  @Test
  public void addNewWordlist(){

    String testWordList = "{\n\"name\":\"birthday21\",\n\"enabled\":true,\n\"nouns\":[\n{\n\"word\":\"somestuff\",\n\"forms\":[\n\"cake\",\n\"cakes\"\n]\n}\n],\n\"verbs\":[\n{\n\"word\":\"blow\",\n\"forms\":[\n\"blow\",\n\"blows\",\n\"blew\",\n\"blown\",\n\"blowing\"\n]\n}\n],\n\"adjectives\":[\n{\n\"word\":\"fun\",\n\"forms\":[\n\"fun\"\n]\n}\n],\n\"misc\":[]\n}";

    String IdTest = testID.toHexString();

    mockReq.setBodyContent(testWordList);
    mockReq.setMethod("POST");

    ObjectId Id = testID;

    Context ctx = ContextUtil.init(mockReq, mockRes, "/api/contextpacks/:id", ImmutableMap.of("id", IdTest));

    contextPackController.addWordList(ctx);

    assertEquals(201, mockRes.getStatus());
    Document cxtPack = db.getCollection("contextpacks").find(Filters.eq("_id", Id)).first();

    ArrayList<Wordlist> ctxWrdList = (ArrayList<Wordlist>) cxtPack.get("wordlists");

    String ctxWrdListAdded = ctxWrdList.toString();

    System.out.println(ctxWrdListAdded);

  }
}



