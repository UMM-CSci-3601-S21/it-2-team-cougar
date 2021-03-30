export class Word{
  word?: string;
  forms?: string[];

  constructor(word: string,forms: string[],type?: string){}
}
export class Wordlist{
  name?: string;
  enabled?: boolean;
  nouns?: Word[];
  adjectives?: Word[];
  verbs?: Word[];
  misc?: Word[];
}

export class ContextPack {
  _id: string;
  name: string;
  icon?: string;
  enabled: boolean;
  wordlists?: Wordlist[];

}

export type WordRole = 'nouns' | 'verbs' | 'adjectives' | 'misc';
