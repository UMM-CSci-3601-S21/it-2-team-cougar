import { FnParam } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.scss']
})
export class AddWordComponent implements OnInit {
  @Output() addWord = new EventEmitter();

  id: string;
  name: string;
  forms = [];
  wordName = '';
  finished = false;
  type: string;

  added = false;

  valid: boolean;


  constructor(private router: ActivatedRoute) { }

  check() {
    if (this.wordName && this.type) {
      this.finished =
        this.wordName.length > 1 && this.type.length > 1;
      console.log(this.wordName.length);
    }
    return this.finished;
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe((pmap) => {
      this.id = pmap ? pmap.get('id') : '';
      this.name = pmap ? pmap.get('name') : '';
    });
    console.log(this.id);
    console.log(this.name);

  }

  add(val) {
    if (!this.added) {
      this.forms.push('');
      this.added = true;
    }
    else { this.forms.push(val); }
  }

  save() {
    this.addWord.emit({name:this.wordName,forms: this.forms.slice(1),type: this.type});
    console.log(this.forms + this.wordName + this.type);
    this.wordName = '';
    this.forms = [];
    this.added = false;
    this.finished = false;
  }
}
