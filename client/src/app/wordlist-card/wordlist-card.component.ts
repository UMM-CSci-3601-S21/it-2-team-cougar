import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContextPack, Word, Wordlist, WordRole } from 'src/app/contextpacks/contextpack';
import { ContextPackService } from '../contextpacks/contextpack.service';

@Component({
  selector: 'app-wordlist-card',
  templateUrl: './wordlist-card.component.html',
  styleUrls: ['./wordlist-card.component.scss']
})
export class WordlistCardComponent implements OnInit {

  @Input() contextpack: ContextPack;
  @Input() wordlist: Wordlist;
  @Input() simple ? = false;
  getUserSub: Subscription;
  originalName: string;
  hideButton: false;






  constructor(private router: ActivatedRoute, private contextPackService: ContextPackService) { }

  ngOnInit(): void {
  }






}
