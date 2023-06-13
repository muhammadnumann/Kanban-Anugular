import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../../../../model/card/card.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  editAble = false
  @Input() card: Card;
  @Input() listIndex: number;
  @Input() cardIndex: number;
  @Output() deleteList: EventEmitter<number> = new EventEmitter<number>();



  ngOnInit() {

  }

  show = false;
  delete() {
    this.deleteList.emit(this.listIndex);
  }

  identifyCardBeingDragged(dragEvent: DragEvent) {

    dragEvent.dataTransfer.effectAllowed = 'move'
    dragEvent.dataTransfer.dropEffect = 'move'
    const transferObject = {
      'listIndex': this.listIndex,
      'cardIndex': this.cardIndex
    };
    dragEvent.dataTransfer.setData('text', JSON.stringify(transferObject));
  }

  allowCardDragToBeDropped(dragEvent: DragEvent) {
    dragEvent.dataTransfer.dropEffect = 'move'
    dragEvent.preventDefault();
  }




  closeResult: string;

  constructor(private modalService: NgbModal) { }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
