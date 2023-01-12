import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Snippet {
  id: string,
  title: string,
  text: string,
}

@Injectable({
  providedIn: 'root'
})
export class SnippetsService {
  private snippetsCollection: AngularFirestoreCollection<Snippet>;
  private snippets: Observable<Snippet[]>;

  constructor(public db: AngularFirestore) {
    this.snippetsCollection = this.db.collection<Snippet>("snippets");
    this.snippets = this.snippetsCollection.valueChanges({ idField: "id" });
  }

  getSnippets() {
    return this.snippets;
  }

  addSnippet(title: string, text: string) {
    this.snippetsCollection.add({
      id: "", title, text
    });
  }
}
