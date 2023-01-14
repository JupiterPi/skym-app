import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Snippet, SnippetsService } from 'src/app/snippets.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-saved-snippets',
  templateUrl: './saved-snippets.component.html',
  styleUrls: ['./saved-snippets.component.scss']
})
export class SavedSnippetsComponent {
  snippets: Observable<Snippet[]>;
  constructor(private snippetsService: SnippetsService, private router: Router) {
    this.snippets = this.snippetsService.getSnippets();
  }

  formatCreatedAt(snippet: Snippet) {
    return prettyDate(new Date(snippet.createdAt).toISOString());
  }

  openSkimmer(snippet: Snippet) {
    this.router.navigate(['/skimmer'], { queryParams: {snippet: snippet.id} });
  }

  deleteSnippet(snippet: Snippet) {
    this.snippetsService.deleteSnippet(snippet);
  }

  newSnippetTitle = "";
  newSnippetText = "";

  readyToCreateNewSnippet() {
    return this.newSnippetTitle != "" && this.newSnippetText != "";
  }

  createNewSnippet() {
    if (!this.readyToCreateNewSnippet()) return;
    this.snippetsService.addSnippet(this.newSnippetTitle, this.newSnippetText);
    this.newSnippetTitle = "";
    this.newSnippetText = "";
  }
}

// https://stackoverflow.com/a/7641822/13164753
function prettyDate(time: string){
  const date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
    diff = (((new Date()).getTime() - date.getTime()) / 1000),
    day_diff = Math.floor(diff / 86400);

  if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
    return;

  return day_diff == 0 && (
      diff < 60 && "just now" ||
      diff < 120 && "1 minute ago" ||
      diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
      diff < 7200 && "1 hour ago" ||
      diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
    day_diff == 1 && "Yesterday" ||
    day_diff < 7 && day_diff + " days ago" ||
    day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
}
