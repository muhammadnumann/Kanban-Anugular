import { Component, ElementRef, Input, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ListInterface, List } from '../../../model/list/list.model';
import { Card, CardInterface } from '../../../model/card/card.model';
import { MovementIntf, Movement } from 'src/app/model/card/movement';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})




export class ListComponent implements OnInit {

  @Input() list: ListInterface;
  @Input() listIndex: number;
  @Output() moveCardAcrossList: EventEmitter<MovementIntf> = new EventEmitter<MovementIntf>();
  @Output() newCardAdded: EventEmitter<Card> = new EventEmitter<CardInterface>();
  @Output() deleteList: EventEmitter<number> = new EventEmitter<number>();

  private cardCount = 0;

  constructor(
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {

  }

  addNewCard() {
    const today = new Date();
    let yyyy = today.getFullYear()
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = dd;
    if (mm < 10) mm = mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;

    const card = new Card(this.cardCount++ + Math.floor((Math.random() * 100000)) + '', 'header' + this.cardCount, 'summary' + this.cardCount, 'sample desc', 'medium', formattedToday, 'In review');
    this.list.cards.push(card);
    this.newCardAdded.emit(card);
  }


  allowCardReplacement(dragEvent: DragEvent) {
    dragEvent.dataTransfer.dropEffect = 'move';
    dragEvent.preventDefault();
  }

  delete() {
    this.deleteList.emit(this.listIndex);
  }

  CardDelete() {
    // this.card
  }
  dropCard(dragEvent: DragEvent) {
    const data = JSON.parse(dragEvent.dataTransfer.getData('text'));
    const elements: Element[] = this.document.elementsFromPoint(dragEvent.x, dragEvent.y);
    const cardElementBeingDroppedOn = elements.find(x => x.tagName.toLowerCase() === 'app-card-summary');
    const listElementBeingDroppedOn = elements.find(x => x.tagName.toLowerCase() === 'app-list');
    const listIndexDroppedOn = parseInt(listElementBeingDroppedOn.getAttribute('listIndex'), 10);
    const cardIndexDroppedOn = cardElementBeingDroppedOn === undefined ? undefined :
      parseInt(cardElementBeingDroppedOn.getAttribute('cardIndex'), 10);
    const listIndexDragged = parseInt(data.listIndex, 10);
    const cardIndexDragged = parseInt(data.cardIndex, 10);

    if (listIndexDragged === listIndexDroppedOn) {
      // same list just re-organize the cards
      const cardDragged = this.list.cards.splice(cardIndexDragged, 1);
      this.list.cards.splice(cardIndexDroppedOn, 0, ...cardDragged);
    } else {
      this.moveCardAcrossList.emit(new Movement(listIndexDragged, listIndexDroppedOn, cardIndexDragged, cardIndexDroppedOn));
    }

  }



}
