import { Component, Input, OnInit } from '@angular/core';
import { ContextPack, Wordlist } from '../contextpacks/contextpack';

@Component({
  selector: 'app-wordlist-info',
  templateUrl: './wordlist-info.component.html',
  styleUrls: ['./wordlist-info.component.scss']
})
export class WordlistInfoComponent implements OnInit {

  @Input() contextpack: ContextPack;
  @Input() wordlist: Wordlist;

  constructor() { }

  ngOnInit(): void {
  }

}
