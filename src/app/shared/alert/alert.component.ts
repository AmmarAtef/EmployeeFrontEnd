import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Output() close = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  onDelete(){
    this.delete.emit();
  }

  onClose(){
    this.close.emit()
  }

}
