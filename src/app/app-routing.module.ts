import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavedSnippetsComponent } from './ui/saved-snippets/saved-snippets.component';

const routes: Routes = [
  {path: "snippets", component: SavedSnippetsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
