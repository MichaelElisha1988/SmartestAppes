import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TaskModel } from '../models/task.model';
import { ListId } from '../models/list-id.model';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  CollectionReference,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from 'firebase/firestore';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  taskList: TaskModel[] = [];
  listId: ListId[] = [];
  selectedId: number = 0;
  fbDataBase: FirebaseApp;
  DataBaseApp: any;
  listIdRef: CollectionReference;
  taskListRef: CollectionReference;
  loginName: string = 'Login User Name';
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

  private readonly ListIdChgSubject = new BehaviorSubject<number>(0);
  readonly ListIdChg$ = this.ListIdChgSubject.asObservable();

  constructor() {
    // FIREBASE INITIALIZER
    this.fbDataBase = initializeApp(this.firebaseConfig);
    this.DataBaseApp = getFirestore(this.fbDataBase);
    /////////////////////////////////
    // CALLING DATABASE
    this.listIdRef = collection(this.DataBaseApp, 'listId');
    this.taskListRef = collection(this.DataBaseApp, 'taskList');
    /////////////////////////////////////

    // GET FIRST DATA FIREBASE/SESSION
    this.getListId();
    this.getTaskList();
  }
  getLoginName(): string {
    return this.loginName;
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
      id: this.listId.length,
      name: name,
    };
    addDoc(this.listIdRef, listItem);
    this.listId.push(listItem);
    sessionStorage.setItem('listId', JSON.stringify(this.listId));
    this.ListIdSubject.next(this.listId);
    this.getListId();
  }

  updateTaskList(task: TaskModel) {
    task.id =
      this.taskList.length > 0
        ? this.taskList[this.taskList.length - 1].id + 1
        : 0;
    task.listID = this.selectedId;
    addDoc(this.taskListRef, task);
    this.taskList.push(task);
    this.TaskListSubject.next(this.taskList);
    this.ListIdChgSubject.next(this.selectedId);
  }

  deleteTask(id: number) {
    const dbId = this.taskList.find((x) => x.id == id)
      ? this.taskList.find((x) => x.id == id)?.dbId
      : '';
    const docRef = doc(this.DataBaseApp, 'taskList', '' + dbId);
    deleteDoc(docRef);
    this.taskList = this.taskList.filter((x) => x.id != id);
    this.TaskListSubject.next(this.taskList);
    this.ListIdChgSubject.next(this.selectedId);
  }

  deleteList(id: number, taskIds: TaskModel[]) {
    taskIds.forEach((x) => this.deleteTask(x.id));
    const dbId = this.listId.find((x) => x.id == id)
      ? this.listId.find((x) => x.id == id)?.dbId
      : '';
    const docRef = doc(this.DataBaseApp, 'listId', '' + dbId);
    deleteDoc(docRef);
    this.listId = this.listId.filter((x) => x.id != id);
    this.ListIdSubject.next(this.listId);
    this.ListIdChgSubject.next(this.selectedId);
  }

  getListId() {
    let tmpListId: ListId[] = [];

    getDocs(this.listIdRef)
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
  }
  getTaskList() {
    let tmpTaskList: TaskModel[] = [];

    getDocs(this.taskListRef)
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
}
