import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, NgModule, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shared-component',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './shared-component.component.html',
  styleUrl: './shared-component.component.css'
})
export class SharedComponentComponent implements OnInit {

  @Input() user :any;
  @Input() index:number=0
  @Output() onDelete:EventEmitter<number>=new EventEmitter();

  deleteUser(){
    this.onDelete.emit(this.user.id)
  }
  
  ngOnInit() {
  if (!this.user) {
    this.user = {
      id: 1,
      firstName: 'Demo',
      surName: 'User',
      gender: 'Other'
    };
  }
}


}
