import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavedSnippetsComponent } from './ui/saved-snippets/saved-snippets.component';
import { SkimmerPageComponent } from './ui/skimmer-page/skimmer-page.component';

const routes: Routes = [
  {path: "snippets", component: SavedSnippetsComponent},
  {path: "skimmer", component: SkimmerPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
