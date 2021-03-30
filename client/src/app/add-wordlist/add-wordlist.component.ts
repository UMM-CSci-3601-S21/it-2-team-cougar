import { Component, OnInit } from '@angular/core';
import { ContextPack, Wordlist, WordRole } from 'src/app/contextpacks/contextpack';

@Component({
  selector: 'app-add-wordlist',
  templateUrl: './add-wordlist.component.html',
  styleUrls: ['./add-wordlist.component.scss']
})
export class AddWordlistComponent implements OnInit {

  wordList: Wordlist = {name:'',enabled:false,nouns:[],verbs:[],adjectives:[],misc:[]};

  constructor() { }

  ngOnInit(): void {
  }

}
