import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './ui/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from "@angular/material/select";

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { SavedSnippetsComponent } from './ui/saved-snippets/saved-snippets.component';
import { FormsModule } from '@angular/forms';
import { SkimmerComponent } from './ui/skimmer/skimmer.component';
import { SkimmerPageComponent } from './ui/skimmer-page/skimmer-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SavedSnippetsComponent,
    SkimmerComponent,
    SkimmerPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
