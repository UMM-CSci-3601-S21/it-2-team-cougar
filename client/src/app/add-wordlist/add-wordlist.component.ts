import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContextPack, Wordlist, WordRole } from 'src/app/contextpacks/contextpack';

@Component({
  selector: 'app-add-wordlist',
  templateUrl: './add-wordlist.component.html',
  styleUrls: ['./add-wordlist.component.scss']
})
export class AddWordlistComponent implements OnInit {

  @Input() contextpack: ContextPack;

  id = '';

  wordList: Wordlist = {name:'',enabled:false,nouns:[],verbs:[],adjectives:[],misc:[]};

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe((pmap) => {
      this.id = pmap ? pmap.get('id') : '';
    });
    console.log(this.id);
  }

}
