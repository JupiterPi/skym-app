import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {BehaviorSubject, filter, first, map, Observable, OperatorFunction, pipe} from 'rxjs';
import {AngularFireAuth} from "@angular/fire/compat/auth";

function rejectNull<T>(): OperatorFunction<T, NonNullable<T>> {
  return pipe(filter((value): value is NonNullable<T> => value !== null && value !== undefined));
}

export interface Snippet {
  id?: string,
  createdAt: number,
  createdBy: string,
  title: string,
  text: string,
}

@Injectable({
  providedIn: 'root'
})
export class SnippetsService {
  private snippetsCollection: BehaviorSubject<AngularFirestoreCollection<Snippet> | null> = new BehaviorSubject<AngularFirestoreCollection<Snippet> | null>(null);
  private snippets: BehaviorSubject<Snippet[]> = new BehaviorSubject<Snippet[]>([]);

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    this.auth.user.pipe(filter((user) => user != null)).subscribe(user => {
      const collection = this.db.doc("/user/" + user?.uid).collection<Snippet>("snippets");
      this.snippetsCollection.next(collection);
      collection.valueChanges({ idField: "id" }).subscribe(snippets => {
        this.snippets.next(snippets);
      });
    });
  }

  getSnippets() {
    return this.snippets.pipe(map((snippets) => snippets.sort((a, b) => b.createdAt - a.createdAt)));
  }

  private getCollection() {
    return this.snippetsCollection.pipe(rejectNull(), first());
  }

  addSnippet(title: string, text: string) {
    this.auth.user.subscribe(user => {
      if (user == null) {
        alert("Need to be signed in!");
      } else {
        this.getCollection().subscribe(collection => {
          collection.add({
            createdAt: new Date().getTime(),
            createdBy: user.uid,
            title,
            text,
          });
        });
      }
    });
  }

  deleteSnippet(snippet: Snippet) {
    this.getCollection().subscribe(collection => {
      collection.doc(snippet.id).delete();
    });
  }
}
