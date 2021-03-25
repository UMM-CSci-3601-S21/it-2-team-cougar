import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContextPackListComponent } from './contextpacks/contextpack-list.component';
import { ContextPackInfoComponent } from './contextpacks/contextpack-info.component';
import { AddContextpacksComponent } from './contextpacks/add-contextpacks.component';
import { WordlistInfoComponent } from './wordlist-info/wordlist-info.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'contextpacks', component: ContextPackListComponent},
  {path: 'contextpacks/:id', component: ContextPackInfoComponent},
  {path: 'edit', component: AddContextpacksComponent},
  {path: 'wordlist/:name', component: WordlistInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
