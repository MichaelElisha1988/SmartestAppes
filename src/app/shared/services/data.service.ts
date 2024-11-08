import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TaskModel } from '../models/task.model';
import { ListId } from '../models/list-id.model';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  CollectionReference,
  addDoc,
  updateDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { MealModel } from '../models/meal.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  taskList: TaskModel[] = [];
  listId: ListId[] = [];
  favoriteMealList: { dbId?: string; id: number; name: string }[] = [];
  selectedId: number = 0;
  fbDataBase: FirebaseApp;
  DataBaseApp: any;
  listIdRef: CollectionReference;
  taskListRef: CollectionReference;
  favoriteMealRef: CollectionReference;
  loginName: string = '';
  todayDate: string = '';

  private readonly firebaseConfig = {
    apiKey: environment.apiKey,
    authDomain: environment.authDomain,
    projectId: environment.projectId,
    storageBucket: environment.storageBucket,
    messagingSenderId: environment.messagingSenderId,
    appId: environment.appId,
    measurementId: environment.measurementId,
  };

  private readonly TaskListSubject = new BehaviorSubject<TaskModel[]>([]);
  readonly taskList$ = this.TaskListSubject.asObservable();

  private readonly ListIdSubject = new BehaviorSubject<ListId[]>([]);
  readonly ListId$ = this.ListIdSubject.asObservable();

  private readonly favoriteMealListSubject = new BehaviorSubject<
    { dbId?: string; id: number; name: string }[]
  >([]);
  readonly favoriteMealList$ = this.favoriteMealListSubject.asObservable();

  private readonly ListIdChgSubject = new BehaviorSubject<number>(0);
  readonly ListIdChg$ = this.ListIdChgSubject.asObservable();

  Sub$ = new Subscription();

  constructor(private router: Router, private loginSrv: LoginService) {
    sessionStorage.getItem('UserDataLogin') ? '' : this.router.navigate(['']);
    // FIREBASE INITIALIZER
    this.fbDataBase = this.loginSrv.getfbDataBase();
    this.DataBaseApp = this.loginSrv.getDataBaseApp();
    /////////////////////////////////
    // CALLING DATABASE
    this.listIdRef = collection(
      this.DataBaseApp,
      `listId${JSON.parse(sessionStorage.getItem('UserDataLogin')!).uid}`
    );
    this.taskListRef = collection(
      this.DataBaseApp,
      `taskList${JSON.parse(sessionStorage.getItem('UserDataLogin')!).uid}`
    );
    this.favoriteMealRef = collection(
      this.DataBaseApp,
      `favoriteMealRef${
        JSON.parse(sessionStorage.getItem('UserDataLogin')!).uid
      }`
    );
    /////////////////////////////////////

    // GET FIRST DATA FIREBASE/SESSION
    this.getListId();
    this.getTaskList();
  }
  getLoginName(): string {
    return JSON.parse(sessionStorage.getItem('UserDataLogin')!).email.split(
      '@'
    )[0];
  }

  setLoginName(logUser: string) {
    this.loginName = logUser;
  }

  getDateString(): string {
    return this.todayDate;
  }
  setDateString(todayDate: string) {
    this.todayDate = todayDate;
  }
  getSelectedListId(): number {
    return this.selectedId;
  }

  setSelectedListId(id: number) {
    this.selectedId = id;
    this.ListIdChgSubject.next(id);
  }

  updateListId(name: string) {
    const listItem: ListId = {
      id: new Date().valueOf() * 2,
      name: name,
      editMode: false,
    };
    addDoc(this.listIdRef!, listItem);
    this.listId.push(listItem);
    sessionStorage.setItem(
      `listId${JSON.parse(sessionStorage.getItem('UserDataLogin')!).uid}`,
      JSON.stringify(this.listId)
    );
    this.ListIdSubject.next(this.listId);
    this.getListId();
  }

  updateFavoriteMeal(name: string) {
    const meal: { dbId?: string; id: number; name: string } = {
      id: new Date().valueOf(),
      name: name,
    };
    addDoc(this.favoriteMealRef!, meal);
    this.favoriteMealList.push(meal);
    sessionStorage.setItem(
      `listId${JSON.parse(sessionStorage.getItem('UserDataLogin')!).uid}`,
      JSON.stringify(this.favoriteMealList)
    );
    this.favoriteMealListSubject.next(this.favoriteMealList);
    this.getFavoriteMealList();
  }

  updateTaskList(task: TaskModel) {
    task.id = new Date().valueOf();
    task.listID = this.selectedId;
    addDoc(this.taskListRef!, task);
    this.taskList.push(task);
    this.TaskListSubject.next(this.taskList);
    this.ListIdChgSubject.next(this.selectedId);
  }

  deleteTask(id: number) {
    const dbId = this.taskList.find((x) => x.id == id)
      ? this.taskList.find((x) => x.id == id)?.dbId
      : '';
    const docRef = doc(
      this.DataBaseApp,
      `taskList${JSON.parse(sessionStorage.getItem('UserDataLogin')!).uid}`,
      '' + dbId
    );
    deleteDoc(docRef);
    this.taskList = this.taskList.filter((x) => x.id != id);
    this.TaskListSubject.next(this.taskList);
    this.ListIdChgSubject.next(this.selectedId);
  }

  deleteFavoriteMeal(mealName: string) {
    let dbId = this.favoriteMealList.find(
      (favMeal) => favMeal.name == mealName
    )?.dbId;
    const docRef = doc(
      this.DataBaseApp,
      `favoriteMealRef${
        JSON.parse(sessionStorage.getItem('UserDataLogin')!).uid
      }`,
      '' + dbId
    );
    deleteDoc(docRef);
    this.getFavoriteMealList();
  }

  deleteList(id: number, taskIds: TaskModel[]) {
    taskIds.forEach((x) => this.deleteTask(x.id));
    const dbId = this.listId.find((x) => x.id == id)
      ? this.listId.find((x) => x.id == id)?.dbId
      : '';
    const docRef = doc(
      this.DataBaseApp,
      `listId${JSON.parse(sessionStorage.getItem('UserDataLogin')!).uid}`,
      '' + dbId
    );
    deleteDoc(docRef);
    this.listId = this.listId.filter((x) => x.id != id);
    this.ListIdSubject.next(this.listId);
    this.ListIdChgSubject.next(this.selectedId);
  }

  getListId(): ListId[] {
    let tmpListId: ListId[] = [];

    getDocs(this.listIdRef!)
      .then((data) => {
        data.docs.forEach((data) => {
          tmpListId.push({ ...(data.data() as ListId), dbId: data.id });
        });
      })
      .then(() => {
        this.listId = tmpListId;
        this.ListIdSubject.next(this.listId);
        setTimeout(() => {
          this.ListIdChgSubject.next(this.selectedId);
        });
      });

    return this.listId;
  }
  getFavoriteMealList() {
    let tmpFavoriteMealList: { dbId?: string; id: number; name: string }[] = [];

    getDocs(this.favoriteMealRef!)
      .then((data) => {
        data.docs.forEach((data) => {
          tmpFavoriteMealList.push({
            ...(data.data() as { dbId?: string; id: number; name: string }),
            dbId: data.id,
          });
        });
      })
      .then(() => {
        this.favoriteMealList = tmpFavoriteMealList;
        this.favoriteMealListSubject.next(this.favoriteMealList);
      });
  }
  getTaskList() {
    let tmpTaskList: TaskModel[] = [];

    getDocs(this.taskListRef!)
      .then((data) => {
        data.docs.forEach((data) => {
          tmpTaskList.push({ ...(data.data() as TaskModel), dbId: data.id });
        });
      })
      .then(() => {
        this.taskList = tmpTaskList;
        this.TaskListSubject.next(this.taskList);
      });
  }

  updateTaskData(task: TaskModel) {
    const dbId = this.taskList.find((x) => x.id == task.id)
      ? this.taskList.find((x) => x.id == task.id)?.dbId
      : '';
    const docRef = doc(
      this.DataBaseApp,
      `taskList${JSON.parse(sessionStorage.getItem('UserDataLogin')!).uid}`,
      '' + dbId
    );
    updateDoc(docRef, { ...task });
  }

  updateListData(list: ListId) {
    const dbId = this.listId.find((x) => x.id == list.id)
      ? this.listId.find((x) => x.id == list.id)?.dbId
      : '';
    const docRef = doc(
      this.DataBaseApp,
      `listId${JSON.parse(sessionStorage.getItem('UserDataLogin')!).uid}`,
      '' + dbId
    );
    updateDoc(docRef, { ...list });
  }
}
