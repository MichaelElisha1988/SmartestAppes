import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TaskModel } from '../models/task.model';
import { FirebaseApp } from 'firebase/app';
import {
  CollectionReference,
  addDoc,
  updateDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import * as shajs from 'sha.js';
import { ListId } from '../models/list-id.model';
import { SharedEmail, SharingEmail } from '../models/shared-email.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  taskList: TaskModel[] = [];
  listId: ListId[] = [];
  sharingEmails: SharingEmail[] = [];
  sharedEmails: SharedEmail = { nameSharedLists: [] };
  favoriteMealList: { dbId?: string; id: number; name: string }[] = [];
  selectedId: number = 0;
  fbDataBase: FirebaseApp;
  DataBaseApp: any;
  listIdRef: CollectionReference;
  sharedListIdRef: CollectionReference | null = null;
  taskListRef: CollectionReference;
  sharedTaskListRef: CollectionReference | null = null;
  favoriteMealRef: CollectionReference;
  sharingWithEmailsRef: CollectionReference;
  sharedEmailsRef: CollectionReference | null = null;
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
    this.sharingWithEmailsRef = collection(
      this.DataBaseApp,
      `sharingEmails${JSON.parse(sessionStorage.getItem('UserDataLogin')!).uid}`
    );

    this.favoriteMealRef = collection(
      this.DataBaseApp,
      `favoriteMealRef${
        JSON.parse(sessionStorage.getItem('UserDataLogin')!).uid
      }`
    );
    /////////////////////////////////////

    // GET FIRST DATA FIREBASE/SESSION
    this.getSharingEmails();
    this.getSharedEmails();
    this.getListId();
    this.getTaskList();
    console.log(this.sharedEmails);
    console.log(this.sharingEmails);
    console.log(this.listId);
    console.log(this.taskList);
  }

  getLoginName(): string {
    this.setLoginName(
      JSON.parse(sessionStorage.getItem('UserDataLogin')!).email.split('@')[0]
    );
    return JSON.parse(sessionStorage.getItem('UserDataLogin')!).email.split(
      '@'
    )[0];
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
        if (this.sharingEmails.length > 0) {
          this.sharingEmails.forEach((email) => {
            email.nameSharedLists.forEach((nameList) => {
              {
                this.sharedListIdRef = collection(
                  this.DataBaseApp,
                  `sharedListId${shajs('sha256')
                    .update(email.allowedEmail + nameList)
                    .digest('hex')}`
                );
                getDocs(this.sharedListIdRef!).then((data) => {
                  data.docs.forEach((data) => {
                    tmpListId.push({
                      ...(data.data() as ListId),
                      dbId: data.id,
                    });
                  });
                });
              }
            });
          });
        }
      })
      .then(() => {
        if (this.sharedEmails && this.sharedEmails.nameSharedLists.length > 0) {
          this.sharedEmails.nameSharedLists.forEach((listName) => {
            this.sharedListIdRef = collection(
              this.DataBaseApp,
              `sharedListId${shajs('sha256')
                .update(
                  JSON.parse(sessionStorage.getItem('UserDataLogin')!).email +
                    listName
                )
                .digest('hex')}`
            );
            getDocs(this.sharedListIdRef!).then((data) => {
              data.docs.forEach((data) => {
                tmpListId.push({ ...(data.data() as ListId), dbId: data.id });
              });
            });
          });
        }
      })
      .then(() => {
        this.listId = tmpListId;
        this.ListIdSubject.next(this.listId);
        setTimeout(() => {
          this.ListIdChgSubject.next(this.selectedId);
        });
      });
    console.log(tmpListId);

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
        this.sharingEmails.forEach((email) => {
          email.nameSharedLists.forEach((nameList) => {
            this.sharedTaskListRef = collection(
              this.DataBaseApp,
              `sharedTaskList${shajs('sha256')
                .update(email.allowedEmail + nameList)
                .digest('hex')}`
            );
            getDocs(this.sharedTaskListRef!).then((data) => {
              data.docs.forEach((data) => {
                tmpTaskList.push({
                  ...(data.data() as TaskModel),
                  dbId: data.id,
                });
              });
            });
          });
        });
      })
      .then(() => {
        if (this.sharedEmails && this.sharedEmails.nameSharedLists.length > 0) {
          this.sharedEmails.nameSharedLists.forEach((listname) => {
            this.sharedTaskListRef = collection(
              this.DataBaseApp,
              `sharedTaskList${shajs('sha256')
                .update(
                  JSON.parse(sessionStorage.getItem('UserDataLogin')!).email +
                    listname
                )
                .digest('hex')}`
            );

            getDocs(this.sharedTaskListRef!).then((data) => {
              data.docs.forEach((data) => {
                tmpTaskList.push({
                  ...(data.data() as TaskModel),
                  dbId: data.id,
                });
              });
            });
          });
        }
      })
      .then(() => {
        this.taskList = tmpTaskList;
        this.TaskListSubject.next(this.taskList);
      });
    console.log(tmpTaskList);
  }

  getSharingEmails() {
    let tmpSharingEmails: SharingEmail[] = [];

    getDocs(this.sharingWithEmailsRef!)
      .then((data) => {
        data.docs.forEach((data) => {
          tmpSharingEmails.push({
            ...(data.data() as SharingEmail),
            dbId: data.id,
          });
        });
      })
      .then(() => {
        this.sharingEmails = tmpSharingEmails;
      });
  }

  getSharedEmails() {
    let tmpSharedEmails: SharedEmail;

    this.sharedEmailsRef = collection(
      this.DataBaseApp,
      `sharedEmails${shajs('sha256')
        .update(`${JSON.parse(sessionStorage.getItem('UserDataLogin')!).email}`)
        .digest('hex')}`
    );

    getDocs(this.sharedEmailsRef!)
      .then((data) => {
        data.docs.forEach((data) => {
          console.log(data.data());
          tmpSharedEmails = { ...(data.data() as SharedEmail), dbId: data.id };
        });
      })
      .then(() => {
        this.sharedEmails = tmpSharedEmails;
      });
  }

  getDateString(): string {
    return this.todayDate;
  }

  getSelectedListId(): number {
    return this.selectedId;
  }

  setLoginName(logUser: string) {
    this.loginName = logUser;
  }

  setDateString(todayDate: string) {
    this.todayDate = todayDate;
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
      listID: 0,
      showSharedList: true,
      isShared: false,
      sharedWith: '',
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
    const tmpListItem: ListId | undefined = this.listId.find(
      (x) => x.id == task.listID
    )
      ? this.listId.find((x) => x.id == task.listID)
      : undefined;

    if (!tmpListItem?.isShared) {
      addDoc(this.taskListRef!, task);
    } else {
      const colRef = collection(
        this.DataBaseApp,
        `sharedTaskList${shajs('sha256')
          .update(`${tmpListItem?.sharedWith}${tmpListItem?.name}`)
          .digest('hex')}`
      );
      addDoc(colRef!, task);
    }
    this.taskList.push(task);
    this.TaskListSubject.next(this.taskList);
    this.ListIdChgSubject.next(this.selectedId);

    this.getTaskList();
  }

  updateTaskData(task: TaskModel) {
    const tmpListItem: ListId | undefined = this.listId.find(
      (x) => x.id == task.listID
    )
      ? this.listId.find((x) => x.id == task.listID)
      : undefined;

    const dbId = this.taskList.find((x) => x.id == task.id)
      ? this.taskList.find((x) => x.id == task.id)?.dbId
      : '';

    if (!tmpListItem?.isShared) {
      const docRef = doc(
        this.DataBaseApp,
        `taskList${JSON.parse(sessionStorage.getItem('UserDataLogin')!).uid}`,
        '' + dbId
      );
      updateDoc(docRef, { ...task });
    } else {
      const docRef = doc(
        this.DataBaseApp,
        `sharedTaskList${shajs('sha256')
          .update(`${tmpListItem?.sharedWith}${tmpListItem?.name}`)
          .digest('hex')}`,
        '' + dbId
      );
      updateDoc(docRef, { ...task });
    }
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

  deleteTask(id: number) {
    const dbId = this.taskList.find((x) => x.id == id)
      ? this.taskList.find((x) => x.id == id)?.dbId
      : '';
    const tmpListItem: ListId | undefined = this.listId.find(
      (x) => x.id == this.selectedId
    )
      ? this.listId.find((x) => x.id == this.selectedId)
      : undefined;

    if (!tmpListItem?.isShared) {
      const docRef = doc(
        this.DataBaseApp,
        `taskList${JSON.parse(sessionStorage.getItem('UserDataLogin')!).uid}`,
        '' + dbId
      );
      deleteDoc(docRef);
    } else {
      const docRef = doc(
        this.DataBaseApp,
        `sharedTaskList${shajs('sha256')
          .update(`${tmpListItem?.sharedWith}${tmpListItem?.name}`)
          .digest('hex')}`,
        '' + dbId
      );
      deleteDoc(docRef);
    }

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

    const tmpListIdItem = this.listId.find((item) => {
      return item.id == id;
    });
    const dbId = this.listId.find((x) => x.id == id)
      ? this.listId.find((x) => x.id == id)?.dbId
      : '';

    if (!tmpListIdItem?.isShared) {
      const docRef = doc(
        this.DataBaseApp,
        `listId${JSON.parse(sessionStorage.getItem('UserDataLogin')!).uid}`,
        '' + dbId
      );
      deleteDoc(docRef);
    } else {
      const docRef = doc(
        this.DataBaseApp,
        `sharedListId${shajs('sha256')
          .update(`${tmpListIdItem.sharedWith}${tmpListIdItem!.name}`)
          .digest('hex')}`,
        '' + dbId
      );
      deleteDoc(docRef);
    }
    this.listId = this.listId.filter((x) => x.id != id);
    this.ListIdSubject.next(this.listId);
    this.ListIdChgSubject.next(this.selectedId);
  }

  createSharedList(listId: number, sheredWithEmail: string) {
    const shareListItem = this.listId.find((x) => x.id == listId);
    const allListTasks = this.taskList.filter((x) => {
      return x.listID == listId;
    });

    this.deleteList(listId, allListTasks);

    shareListItem
      ? ((shareListItem!.showSharedList = false),
        (shareListItem!.isShared = true),
        (shareListItem.sharedWith = sheredWithEmail))
      : '';

    let tmpTaskList = this.taskList.filter((x) => {
      return x.listID == listId;
    });

    let tmpAllowedEmails: SharingEmail;
    let tmpOldAllowedEmails: SharingEmail | undefined | null =
      this.sharingEmails.find((x) => {
        return x.allowedEmail == sheredWithEmail;
      });

    if (tmpOldAllowedEmails) {
      const dbIdSharingEmail = this.sharingEmails.find((x) => {
        return x.allowedEmail == sheredWithEmail;
      })
        ? this.sharingEmails.find((x) => x.allowedEmail == sheredWithEmail)
            ?.dbId
        : '';
      console.log(dbIdSharingEmail);
      const docSharingRef = doc(
        this.DataBaseApp,
        `sharingEmails${
          JSON.parse(sessionStorage.getItem('UserDataLogin')!).uid
        }`,
        '' + dbIdSharingEmail
      );
      tmpOldAllowedEmails.nameSharedLists.push(shareListItem!.name);
      tmpAllowedEmails = {
        allowedEmail: sheredWithEmail,
        nameSharedLists: tmpOldAllowedEmails.nameSharedLists,
      };
      updateDoc(docSharingRef, { ...tmpAllowedEmails });
    } else {
      tmpAllowedEmails = {
        allowedEmail: sheredWithEmail,
        nameSharedLists: [shareListItem!.name],
      };
      addDoc(this.sharingWithEmailsRef!, tmpAllowedEmails);
    }

    this.sharedEmailsRef = collection(
      this.DataBaseApp,
      `sharedEmails${shajs('sha256')
        .update(`${sheredWithEmail}`)
        .digest('hex')}`
    );

    if (this.sharedEmails && this.sharedEmails?.nameSharedLists.length > 0) {
      const docSharedRef = doc(
        this.DataBaseApp,
        `sharedEmails${shajs('sha256')
          .update(`${sheredWithEmail}`)
          .digest('hex')}`,
        '' + this.sharedEmails?.dbId
      );

      this.sharedEmails.nameSharedLists.push(shareListItem?.name!);
      updateDoc(docSharedRef, { ...this.sharedEmails });
    } else {
      this.sharedEmails = {
        nameSharedLists: [shareListItem?.name!],
      };
      addDoc(this.sharedEmailsRef!, this.sharedEmails);
    }

    this.sharedListIdRef = collection(
      this.DataBaseApp,
      `sharedListId${shajs('sha256')
        .update(`${sheredWithEmail}${shareListItem!.name}`)
        .digest('hex')}`
    );

    this.sharedTaskListRef = collection(
      this.DataBaseApp,
      `sharedTaskList${shajs('sha256')
        .update(`${sheredWithEmail}${shareListItem!.name}`)
        .digest('hex')}`
    );

    addDoc(this.sharedListIdRef!, shareListItem);
    tmpTaskList.forEach((task) => {
      addDoc(this.sharedTaskListRef!, task);
    });

    this.getSharingEmails();
    this.getSharedEmails();
    this.getListId();
    this.getTaskList();
  }
}
