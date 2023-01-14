import { Injectable } from '@angular/core';
import {BehaviorSubject, filter, first, map, OperatorFunction, pipe} from "rxjs";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";

function rejectNull<T>(): OperatorFunction<T, NonNullable<T>> {
  return pipe(filter((value): value is NonNullable<T> => value !== null && value !== undefined));
}

export interface Preferences {
  wpm: number,
}

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {
  private preferencesDoc: BehaviorSubject<AngularFirestoreDocument<Preferences> | null> = new BehaviorSubject<AngularFirestoreDocument<Preferences> | null>(null);
  private preferences: BehaviorSubject<Preferences> = new BehaviorSubject<Preferences>({wpm: 200});

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    this.auth.user.pipe(filter((user) => user != null)).subscribe(user => {
      const doc = this.db.doc("/user/" + user?.uid) as AngularFirestoreDocument<Preferences>;
      this.preferencesDoc.next(doc);
      doc.valueChanges().subscribe(preferences => {
        this.preferences.next(preferences as Preferences);
      });
    });
  }

  getPreferences() {
    return this.preferences;
  }

  setWpm(wpm: number) {
    this.preferencesDoc.pipe(rejectNull(), first()).subscribe(doc => {
      doc.update({
        wpm
      });
    });
  }
}
