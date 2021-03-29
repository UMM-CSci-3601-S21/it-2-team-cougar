import { Component, Input, OnInit } from '@angular/core';
import { ContextPack, Wordlist, WordRole } from 'src/app/contextpacks/contextpack';

@Component({
  selector: 'app-wordlist-card',
  templateUrl: './wordlist-card.component.html',
  styleUrls: ['./wordlist-card.component.scss']
})
export class WordlistCardComponent implements OnInit {

  @Input() contextpack: ContextPack;
  @Input() wordlist: Wordlist;
  @Input() simple ? = false;
  editshow= true;
  name = '';

  constructor() { }

  ngOnInit(): void {
  }

  change(){
    this.editshow = !this.editshow;
  }

  save(){
    this.wordlist.name = this.name;
    this.editshow = !this.editshow;
  }




}
