import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContextPack, Wordlist } from '../contextpacks/contextpack';
import { ContextPackService } from '../contextpacks/contextpack.service';

@Component({
  selector: 'app-wordlist-info',
  templateUrl: './wordlist-info.component.html',
  styleUrls: ['./wordlist-info.component.scss']
})
export class WordlistInfoComponent implements OnInit {

  @Input() contextpack: ContextPack;
  wordlist: Wordlist;
  getUserSub: Subscription;

  id = '';
  name = '';

  constructor(private router: ActivatedRoute, private contextPackService: ContextPackService) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe((pmap) => {
      this.id = pmap ? pmap.get('id') : '';
      this.name = pmap ? pmap.get('name') : '';
      this.load();
    });

    console.log(this.id);
    console.log(this.name);
    console.log(this.wordlist);
  }

  load() {
    this.getUserSub = this.contextPackService.getWordListByName(this.name, this.id).subscribe(i => {
      this.wordlist = i;
    });
  }

}
