import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from "@angular/common";
import { Snippet, SnippetsService } from 'src/app/snippets.service';

@Component({
  selector: 'app-skimmer-page',
  templateUrl: './skimmer-page.component.html',
  styleUrls: ['./skimmer-page.component.scss']
})
export class SkimmerPageComponent {
  availableSnippets?: Snippet[];
  chosenSnippetId?: string;

  snippet?: Snippet;
  
  constructor(private route: ActivatedRoute, private router: Router, private location: Location, private snippetsService: SnippetsService) {
    this.route.queryParams.subscribe(queryParams => {
      const snippetId = queryParams["snippet"];
      if (snippetId != "") {
        this.chosenSnippetId = snippetId;
        this.loadSnippet(snippetId);
      }
      this.snippetsService.getSnippets().subscribe(snippets => {
        this.availableSnippets = snippets;
      });
    });
  }

  loadSnippet(id: string) {
    const url = this.router.createUrlTree([], {relativeTo: this.route, queryParams: {snippet: id}});
    this.location.replaceState(url.toString());

    this.snippetsService.getSnippets().subscribe(snippets => {
      this.snippet = snippets.find(snippet => snippet.id == id);
    });
  }
}
