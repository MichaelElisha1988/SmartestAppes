import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ListId } from '../../../shared/models/list-id.model';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit, AfterViewInit {
  listId: ListId[] = [];
  addActive: boolean = false;
  listEdit: boolean = false;
  movearound: number = 0;
  @ViewChild('addInput') addInput: ElementRef | undefined;
  @ViewChild('ListId') ListId: ElementRef | undefined;

  constructor(private readonly dataSrv: DataService) {
    this.dataSrv.ListId$.subscribe((listId) => {
      this.listId = listId;
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSrv.setSelectedListId(
        Number(
          document
            .querySelector('.list-menu')
            ?.children[0]?.attributes.getNamedItem('listid')?.value
        )
      );
    }, 1000);
  }

  addListId(event: any) {
    if (!this.addActive) {
      this.addInput!.nativeElement.value = '';
      this.addActive = true;
    } else {
      this.addActive = false;
      this.addInput!.nativeElement.value != ''
        ? this.dataSrv.updateListId(this.addInput!.nativeElement.value)
        : '';
    }
  }

  getSelectedListId(): number {
    return this.dataSrv.getSelectedListId();
  }

  selectListId(event: any, list: ListId) {
    let listParent: any = event;
    if (event.target.classList.contains('list-name')) {
      listParent = event.target.parentElement;
    }
    if (
      event.target.attributes['listId']?.value == this.getSelectedListId() ||
      +(listParent as HTMLElement)?.attributes?.getNamedItem('listId')
        ?.value! == this.getSelectedListId()
    ) {
      list.editMode = true;
      setTimeout(() => {
        if ((listParent as HTMLElement)?.children != undefined) {
          ((listParent as HTMLElement).children[0] as HTMLInputElement).focus();
        } else {
          (listParent.target.children[0] as HTMLInputElement).focus();
        }
      });
    } else {
      if ((listParent as HTMLElement)?.children != undefined) {
        this.dataSrv.setSelectedListId(
          +(listParent as HTMLElement)?.attributes?.getNamedItem('listId')
            ?.value!
        );
      } else {
        this.dataSrv.setSelectedListId(
          event.target.attributes['listId']?.value
        );
      }
    }
  }
  updateListName(event: any, list: ListId) {
    if (list.name != event.target.value && event.target.value != '') {
      list.name = event.target.value;
      list.editMode = false;
      this.dataSrv.updateListData(list);
    } else {
      list.editMode = false;
    }
  }

  deleteList(event: any) {
    let listId = this.getSelectedListId();
    let taskIds = this.dataSrv.taskList.filter((x) => x.listID == listId);
    this.dataSrv.deleteList(listId, taskIds);
  }

  moveAround(moveNum: number) {
    this.ListId?.nativeElement.setAttribute(
      'style',
      `left: ${
        this.movearound + moveNum > 0
          ? this.movearound
          : (this.movearound += moveNum)
      }px;`
    );
  }
}
