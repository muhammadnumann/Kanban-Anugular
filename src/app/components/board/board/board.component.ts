import { Component, NgModule, OnInit } from '@angular/core';
import { List, ListInterface } from '../../../model/list/list.model';
import { MovementIntf } from 'src/app/model/card/movement';
import { BoardService } from '../../../service/board/board-service';
import { BoardModel } from '../../../model/board/board.model';
import { LocalService } from '../../../service/board/local/local.service';
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {


  lists: ListInterface[] | undefined;
  searchForm: any;
  searchByPriority: any;
  public status: { field: string }[] = [
    { field: 'Option 1' },
    { field: 'Option 2' },
    { field: 'Option 3' }
  ];

  sortOrders: string[] = ["Priority", "High", "Medium", "Low"];
  selectedSortOrder: string = "Priority";
  sortStatus: string[] = ["Status", "In review", "Process", "Blocked"];
  selectedSortStatus: string = "Status";

  constructor(private localService: LocalService, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      search: '',
    });
    this.searchByPriority = this.formBuilder.group({
      search: '',
    });
  }
  ChangeSortOrder(newSortOrder: string) {
    this.selectedSortOrder = newSortOrder;
  }
  ChangeSortStatus(newSortOrder: string) {
    this.selectedSortStatus = newSortOrder;
  }
  ngOnInit() {

    const board = this.localService.getBoard();
    this.lists = board.lists || [
      {
        "id": '1',
        "cards": [],
        "position": 1,
        "name": "Todo"
      },
      {
        "id": '2',
        "cards": [],
        "position": 2,
        "name": "InProgress"
      },
      {
        "id": '3',
        "cards": [],
        "position": 3,
        "name": "Completed"
      }
    ];
  }

  addList() {
    const newList: ListInterface = new List();
    newList.position = this.lists!.length + 1;
    newList.name = `List #${newList.position}`;
    if (this.lists === undefined) {
      this.lists = [];
    }
    this.lists.push(newList);
    console.log(this.lists)
  }

  moveCardAcrossList(movementInformation: MovementIntf) {
    const cardMoved = this.lists![movementInformation.fromListIdx].cards.splice(movementInformation.fromCardIdx, 1);
    this.lists![movementInformation.toListIdx].cards.splice(movementInformation.toCardIdx, 0, ...cardMoved);
  }

  saveBoard() {
    const boardModel = new BoardModel();
    boardModel.lists = this.lists!;
    this.localService.saveBoard(boardModel);
  }

  deleteList(listIndex: number) {
    this.lists!.splice(listIndex, 1);
  }
}
