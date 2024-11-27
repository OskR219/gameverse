import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule],
  providers: [
    provideFirebaseApp(() => initializeApp({"projectId":"quvels-gameverse","appId":"1:52882914182:web:6efed75f78fefd23710a07","storageBucket":"quvels-gameverse.firebasestorage.app","apiKey":"AIzaSyCsQ0TtDJNhKqKDOsN1i4mC3SS91p7bT8s","authDomain":"quvels-gameverse.firebaseapp.com","messagingSenderId":"52882914182"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase())
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
