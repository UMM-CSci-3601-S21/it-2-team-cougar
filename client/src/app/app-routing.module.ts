import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContextPackListComponent } from './contextpacks/contextpack-list.component';
import { ContextPackInfoComponent } from './contextpacks/contextpack-info.component';
import { AddContextpacksComponent } from './contextpacks/add-contextpacks.component';
import { AddWordlistComponent } from './add-wordlist/add-wordlist.component';
import { AddWordComponent } from './add-word/add-word.component';
import { WordlistInfoComponent } from './wordlist-info/wordlist-info.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const COMMON_IMPORTS = [
  MatButtonModule,
  MatCardModule,
  MatOptionModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatIconModule,
  MatRadioModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTooltipModule,
  BrowserAnimationsModule,
];


const routes: Routes = [
  {path: '', redirectTo:'/contextpacks', pathMatch: 'full'},
  {path: 'contextpacks', component: ContextPackListComponent},
  {path: 'contextpacks/:id', component: ContextPackInfoComponent},
  {path: 'contextpacks/:id/addwordlist', component: AddWordlistComponent},
  {path: 'edit', component: AddContextpacksComponent},
  {path: 'contextpacks/:id/:name/addword', component: AddWordComponent},
  {path: 'contextpacks/:id/:name', component: WordlistInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
