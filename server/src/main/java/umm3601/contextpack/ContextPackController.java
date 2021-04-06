package umm3601.contextpack;

import static com.mongodb.client.model.Filters.and;


import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.ImmutableMap;

import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Updates;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.mongojack.JacksonMongoCollection;

import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.NotFoundResponse;
import static com.mongodb.client.model.Filters.eq;

public class ContextPackController {
  String statusRegex = "^(?i)(true|false)$";


  private final JacksonMongoCollection<ContextPack> contextPackCollection;


  public ContextPackController(MongoDatabase database){
    contextPackCollection = JacksonMongoCollection.builder().build(database, "contextpacks", ContextPack.class);
  }




  public void getContextPack(Context ctx) {
    String id = ctx.pathParam("id");
    ContextPack contextpack;

    try {
      contextpack = contextPackCollection.find(eq("_id", new ObjectId(id))).first();
    } catch(IllegalArgumentException e) {
      throw new BadRequestResponse("The requested contextpack id wasn't a legal Mongo Object ID.");
    }
    if (contextpack == null) {
      throw new NotFoundResponse("The requested contextpack was not found");
    } else {
      ctx.json(contextpack);
    }
  }


  //ContextPack Functions:


  public void getContextPacks(Context ctx){

    List<Bson> filters = new ArrayList<>();

    ctx.json(contextPackCollection.find(filters.isEmpty()? new Document() : and(filters))
    .into(new ArrayList<>()));
  }


  public void addNewContextPack(Context ctx){
    ContextPack newPack = ctx.bodyValidator(ContextPack.class)
      .check(pack -> pack.name != null )
      .check(pack -> String.valueOf(pack.enabled).matches(statusRegex))

      .get();

      contextPackCollection.insertOne(newPack);
      ctx.status(201);
      ctx.json(ImmutableMap.of("id", newPack._id));

  }

  public void editContextPackName(Context ctx) {
    String id = ctx.pathParam("id");
    String name = ctx.pathParam("name");
    ContextPack contextPack = contextPackCollection.findOneById(id);

    contextPack.name = name;
  }

  public void editContextPackIcon(Context ctx) {
    String id = ctx.pathParam("id");
    String icon = ctx.pathParam("icon");
    ContextPack contextPack = contextPackCollection.findOneById(id);

    contextPack.icon = icon;
  }

  public void updateContextPack(ContextPack contextPack) {
    contextPackCollection.replaceOne(eq("name", contextPack.name), contextPack);
  }

  //Worldlist Functions:

  public void getWordList(Context ctx) {

    String name = ctx.pathParam("name");

    String id = ctx.pathParam("id");

    ContextPack contextPack;
    Wordlist wordlist = null;

    contextPack = contextPackCollection.findOneById(id);

    for (Wordlist list : contextPack.wordlists) {

      if (list.name.equals(name)) {

        wordlist = list;
        break;
      }
    }
    if (wordlist == null) {

      throw new NotFoundResponse("The requested WordList was not absent");

    } else {

      ctx.json(wordlist);
    }
  }



  public void addWordList(Context ctx){

    String id = ctx.pathParam("id");
    Wordlist newWordList = ctx.bodyValidator(Wordlist.class).get();
    contextPackCollection.updateById(id, Updates.push("wordlists", newWordList));

    ctx.status(201);
    ctx.json(ImmutableMap.of("id", contextPackCollection.findOneById(id)._id));

  }

  public void editWordList(Context ctx) {

    String id = ctx.pathParam("id");
    String wordListName = ctx.pathParam("name");

    ContextPack contextPack = contextPackCollection.findOneById(id);
    Wordlist newList = ctx.bodyValidator(Wordlist.class).get();
    for (int i = 0; i < contextPack.wordlists.size(); i++) {

      Wordlist theWordList = contextPack.wordlists.get(i);
      if (theWordList.name.equals(wordListName)) {

        contextPackCollection.updateById(id, Updates.pull("wordlists", theWordList));
        contextPackCollection.updateById(id, Updates.push("wordlists", newList));

      }
    }
  }

  public void getWordlists(Context ctx){

    String id = ctx.pathParam("id");

    ArrayList<Wordlist> wordlists;

    ContextPack contextPack = contextPackCollection.findOneById(id);

    wordlists = contextPack.wordlists;

    ctx.json(wordlists);
  }









}
