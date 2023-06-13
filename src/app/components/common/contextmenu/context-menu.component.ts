import { Component, OnInit, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent implements OnInit {

  show = false;
  confirmation = false;
  visible: boolean;
  @Output() contextAction: EventEmitter<string> = new EventEmitter<string>();

  constructor(private elementRef: ElementRef, private modalService: NgbModal) { }

  ngOnInit() {
  }

  showDialog() {
    this.visible = true;
  }

  emitCloseEvent() {
    this.contextAction.emit('DELETE');
    this.show = false;
  }

  @HostListener('document:click', ['$event'])
  closeOutClickOutside(event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.show = false;
    }
  }

  closeResult: string;


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
