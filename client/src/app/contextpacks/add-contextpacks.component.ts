/* eslint-disable guard-for-in */
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContextPackService } from './contextpack.service';
import { Router } from '@angular/router';
import { ContextPackCardComponent } from './contextpack-card.component';

@Component({
  selector: 'app-add-contextpacks',
  templateUrl: './add-contextpacks.component.html',
  styleUrls: ['./add-contextpacks.component.scss']
})
export class AddContextpacksComponent implements OnInit {
  contextPackForm: FormGroup;
  contextpackcard = new ContextPackCardComponent();
  isShown = false;
  enabled: true;
  formErrors = {
    contextPacks: this.contextPacksErrors(),
    wordlists: this.wordlistsErrors()
  };

  validationMessages = {
    contextPacks: {
      name: [
      {type: 'required', message: 'Name is required'},
      {type: 'max length', message: 'Name must be shorter than 50 characters'}
      ]
    },
    wordlists: {
      name: [
        {type: 'required', message: 'Name is required'},
        {type: 'max length', message: 'Name must be shorter than 50 characters'}
      ],
      nouns: {
        word: {
        },
        forms: {
        },
      },
      adjectives: {
        word: {
        },
        forms: {
        },
      },
      verbs: {
        word: {
        },
        forms: {
        },
      },
      misc: {
        word: {
        },
        forms: {
        },
      }
    }
  };

  constructor(private fb: FormBuilder, private contextPackService: ContextPackService,
    private snackBar: MatSnackBar, private router: Router) { }




  ngOnInit() {
    this.contextPackForm = this.fb.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
      ])),
      icon: '',
      wordlists: this.fb.array([])
    });
    this.contextPackForm.valueChanges.subscribe(data => this.validateForm());
  }

  initwordlist() {
    return this.fb.group({
      //  ---------------------forms fields on x level ------------------------
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
      ])),
      // ---------------------------------------------------------------------
      nouns: this.fb.array([]),
      adjectives: this.fb.array([]),
      verbs: this.fb.array([]),
      misc: this.fb.array([])

    });
  }

  initNouns() {
    return this.fb.group({
      //  ---------------------forms fields on y level ------------------------
      word: [''],
      // ---------------------------------------------------------------------
      forms: this.fb.array([
        this.fb.control('')
      ])
    });
  }
  enable(val) {
    this.enabled = val;
  }
  addWordlist() {
    const control = this.contextPackForm.controls.wordlists as FormArray;
    control.push(this.initwordlist());
  }
  addPosArray(ix: number, pos: string){
    const control = (this.contextPackForm.controls.wordlists as FormArray).at(ix).get(`${pos}`) as FormArray;
    control.push(this.initNouns());
  }
  addForms(ix: number, iy: number, pos: string) {
    const control = ((this.contextPackForm.controls.wordlists as FormArray).at(ix).get(`${pos}`) as FormArray)
    .at(iy).get('forms') as FormArray;
    control.push(this.fb.control(''));
  }
  setWord(ix: number, iy: number, pos: string){
    const control = (((this.contextPackForm.controls.wordlists as FormArray).at(ix).get(`${pos}`) as FormArray).at(iy)
    .get('word'));

    const formAdd = (((this.contextPackForm.controls.wordlists as FormArray).at(ix).get(`${pos}`) as FormArray).at(iy)
    .get('forms') as FormArray).at(0).value.toString();
    console.log('didnt go through');
      control.setValue(formAdd);
      console.log(ix,iy);
  }


  removeWordlists(empIndex: number){
    (this.contextPackForm.controls.wordlists as FormArray).removeAt(empIndex);
  }

  removeWord(ix: number, iy: number, pos: string){
    ((this.contextPackForm.controls.wordlists as FormArray).at(ix).get(`${pos}`) as FormArray).removeAt(iy);
  }

  removeForm(ix: number, iy: number, iz: number,  pos: string){
    (((this.contextPackForm.controls.wordlists as FormArray).at(ix).get(`${pos}`) as FormArray)
    .at(iy).get('forms') as FormArray).removeAt(iz);
  }

  wordlistsErrors() {
    return [{
      //  ---------------------forms errors on x level ------------------------
      name: [' ', [Validators.required], [Validators.maxLength]],

      // ---------------------------------------------------------------------
      nouns: this.nounsErrors()

    }];

  }

  contextPacksErrors() {
    return [{
      //  ---------------------forms errors on x level ------------------------
      name: [' ', [Validators.required], [Validators.maxLength]],
    }];

  }

  nounsErrors() {
    return [{
      //  ---------------------forms errors on y level ------------------------
      word: '',
      forms: this.fb.array([
        this.fb.control('')
      ]),

    }];
  }
  // form validation
  validateForm() {
    this.validateWordlists();
  }
  validateWordlists() {
    const wordlistsA = this.contextPackForm.controls.wordlists as FormArray;
    // console.log(XsA.value);
    this.formErrors.wordlists = [];
    let x = 1;
    while (x <= wordlistsA.length) {
      this.formErrors.wordlists.push({
        name: [' ', [Validators.required], [Validators.maxLength]],
        nouns: [{
          word: '',
          forms: this.fb.array([
            this.fb.control('')
          ]),
        }]
      });
      x++;
    }
  }


toggleShow() {
this.isShown = ! this.isShown;
return this.isShown;
}

  submitForm() {
    this.contextPackService.addContextPack(this.contextPackForm.value).subscribe(newID => {
      this.snackBar.open('Added Pack ' + this.contextPackForm.value.name, null, {
        duration: 2000,
      });
      this.router.navigate(['/contextpacks/', newID]);
    }, err => {
      this.snackBar.open('Failed to add the pack', 'OK', {
        duration: 5000,
      });
    });
  }





}
