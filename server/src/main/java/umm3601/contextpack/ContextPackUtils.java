package umm3601.contextpack;

import java.util.Arrays;

public class ContextPackUtils {
  ContextPack contextPack;


  public ContextPackUtils(ContextPack cp) {
    contextPack = cp;
  }

  public void addWordList(Wordlist wordList) {
    if (wordListsContain(wordList.name))
      throw new RuntimeException();

    Wordlist[] result = Arrays.copyOf(contextPack.wordlists, contextPack.wordlists.length + 1);
    result[contextPack.wordlists.length] = wordList;
    contextPack.wordlists = result;
  }


  public boolean wordListsContain(String name) {
    return Arrays.asList(contextPack.wordlists).stream().anyMatch(i -> i.name.equals(name));
  }


}
