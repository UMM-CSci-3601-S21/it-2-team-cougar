import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContextPackListComponent } from './contextpacks/contextpack-list.component';
import { ContextPackInfoComponent } from './contextpacks/contextpack-info.component';
import { AddContextpacksComponent } from './contextpacks/add-contextpacks.component';
import { AddWordlistComponent } from './add-wordlist/add-wordlist.component';
import { AddWordComponent } from './add-word/add-word.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'contextpacks', component: ContextPackListComponent},
  {path: 'contextpacks/:id', component: ContextPackInfoComponent},
  {path: 'contextpacks/:id/addwordlist', component: AddWordlistComponent},
  {path: 'edit', component: AddContextpacksComponent},
  {path: 'contextpacks/:id/:name/addword', component: AddWordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
