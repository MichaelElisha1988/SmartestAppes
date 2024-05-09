import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Header } from '../models/header.model';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { getFirestore } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly firebaseConfig = {
    apiKey: environment.apiKey,
    authDomain: environment.authDomain,
    projectId: environment.projectId,
    storageBucket: environment.storageBucket,
    messagingSenderId: environment.messagingSenderId,
    appId: environment.appId,
    measurementId: environment.measurementId,
  };

  fbDataBase: FirebaseApp;
  DataBaseApp: any;
  headerInnerData = new Subject<Header>();

  private readonly LoginSubject = new BehaviorSubject<any>(null);
  readonly login$ = this.LoginSubject.asObservable();

  private readonly LoginErrorSubject = new BehaviorSubject<any>(null);
  readonly loginError$ = this.LoginErrorSubject.asObservable();

  private readonly afterLoginSubject = new BehaviorSubject<boolean>(false);
  readonly afterlogin$ = this.afterLoginSubject.asObservable();

  constructor(private http: HttpClient) {
    this.http.get<Header>('assets/headerInnerDate.json').subscribe((data) => {
      this.headerInnerData.next(data);
    });
    // FIREBASE INITIALIZER
    this.fbDataBase = initializeApp(this.firebaseConfig);
    this.DataBaseApp = getFirestore(this.fbDataBase);
    /////////////////////////////////
  }
  setAfterLogin() {
    this.afterLoginSubject.next(
      sessionStorage.getItem('UserDataLogin') != null
    );
  }

  getfbDataBase(): FirebaseApp {
    return this.fbDataBase;
  }
  getDataBaseApp(): any {
    return this.DataBaseApp;
  }

  createAccount(email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential: any) => {
        // Signed up
        const user = userCredential?.user;
        // ...
      })
      .catch((error: any) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  signIn(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: any) => {
        // Signed up
        this.LoginSubject.next(userCredential?.user);
        this.setAfterLogin();

        // ...
      })
      .catch((error: any) => {
        const errorCode = error.code;
        this.LoginErrorSubject.next(error.message);
        // ..
      });
  }
}
