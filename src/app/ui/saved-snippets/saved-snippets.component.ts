import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Snippet, SnippetsService } from 'src/app/snippets.service';

@Component({
  selector: 'app-saved-snippets',
  templateUrl: './saved-snippets.component.html',
  styleUrls: ['./saved-snippets.component.scss']
})
export class SavedSnippetsComponent {
  snippets: Observable<Snippet[]>;
  constructor(private snippetsService: SnippetsService) {
    this.snippets = this.snippetsService.getSnippets();
  }

  newSnippetTitle = "";
  newSnippetText = "";
  
  ready() {
    return this.newSnippetTitle != "" && this.newSnippetText != "";
  }

  createNewSnippet() {
    if (!this.ready()) return;
    this.snippetsService.addSnippet(this.newSnippetTitle, this.newSnippetText);
    this.newSnippetTitle = "";
    this.newSnippetText = "";
  }
}