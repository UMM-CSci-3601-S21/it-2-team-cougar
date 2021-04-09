import { Component, Input, OnInit } from '@angular/core';
import { RequiredValidator } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContextPack, Word, Wordlist, WordRole } from 'src/app/contextpacks/contextpack';
import { ContextPackService } from '../contextpacks/contextpack.service';

@Component({
  selector: 'app-add-wordlist',
  templateUrl: './add-wordlist.component.html',
  styleUrls: ['./add-wordlist.component.scss']
})
export class AddWordlistComponent implements OnInit {

  @Input() contextpack: ContextPack;

  id = '';
  wordlistname = '';
  type: boolean;
  finished = false;
  words: Word[] = [];

  wordList: Wordlist = {name: '', enabled:false,nouns:[],verbs:[],adjectives:[],misc:[]};

  constructor(private router: ActivatedRoute, private contextPackService: ContextPackService, private route: Router) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe((pmap) => {
      this.id = pmap.get('id');
    });
    console.log(this.id);
  }

  check(){
    this.finished = this.wordlistname.length > 1;
    console.log(this.wordlistname.length);
    return this.finished;
  }

  save(){
    this.wordList.name = this.wordlistname;
    this.wordList.enabled = this.type;
    this.contextPackService.addWordList(this.wordList, this.id).subscribe();
    this.route.navigate(['contextpacks', this.id]);
  }

}
