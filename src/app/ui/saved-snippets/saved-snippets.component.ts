import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { read } from 'fs';
import { Observable } from 'rxjs';

export interface Snippet {
  title: string,
  text: string,
}

@Component({
  selector: 'app-saved-snippets',
  templateUrl: './saved-snippets.component.html',
  styleUrls: ['./saved-snippets.component.scss']
})
export class SavedSnippetsComponent {
  private snippetsCollection: AngularFirestoreCollection<Snippet>;
  snippets: Observable<Snippet[]>;

  constructor(public db: AngularFirestore) {
    this.snippetsCollection = this.db.collection<Snippet>("snippets");
    this.snippets = this.snippetsCollection.valueChanges();
  }

  newSnippetTitle = "";
  newSnippetText = "";
  
  ready() {
    return this.newSnippetTitle != "" && this.newSnippetText != "";
  }

  createNewSnippet() {
    if (!this.ready()) return;
    this.snippetsCollection.add({
      title: this.newSnippetTitle,
      text: this.newSnippetText,
    });
    this.newSnippetTitle = "";
    this.newSnippetText = "";
  }
}