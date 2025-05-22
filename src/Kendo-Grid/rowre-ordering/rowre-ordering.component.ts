import { Component, OnInit } from '@angular/core';
import { UserService } from '../../app/user.service';
import { Router } from '@angular/router';
import { KENDO_GRID } from '@progress/kendo-angular-grid';
import { customers } from '../customers';
import { LoaderModule, LoaderType } from '@progress/kendo-angular-indicators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rowre-ordering',
  imports: [KENDO_GRID , LoaderModule,CommonModule] ,
  templateUrl: './rowre-ordering.component.html',
  styleUrl: './rowre-ordering.component.css'
})
export class RowreOrderingComponent implements OnInit {
constructor(private userService:UserService, private router:Router){}

public gridData:any[]=[]
public Loading:boolean=true
public Loadertype:LoaderType="infinite-spinner"
  ngOnInit(): void {
this.getCustomer()
  }
getCustomer(){
  this.Loading=true
  this.userService.getCustomerRowReorder().subscribe((data)=>{
    this.gridData=data
    console.log("GetCustomer", this.gridData)
  })
  setTimeout(() => {
    this.Loading=false
  }, 1500);
}


onRowReorder(event: any): void {
  debugger;
  const prevIndex = event.draggedRows[0].rowIndex
  const dropIndex = event.dropTargetRow.rowIndex
  const position = event.dropPosition;

  let newIndex = dropIndex;

  if (position === 'after') {
    newIndex = dropIndex + 1
  }

  if (prevIndex < newIndex) {
    newIndex--; 
  }
  const item = this.gridData.splice(prevIndex, 1)[0]                 //remove item from the gridata
  this.gridData.splice(newIndex, 0, item)                           //for adding item to new index

  this.gridData.forEach((customer, index) => {
    customer.displayOrder = index + 1                    //index is starting from 0 and we want displayorder satrt from 1 =index+1   
  });

  console.log('Updated displayOrder list:', this.gridData)

  this.userService.updateRowOrder(this.gridData).subscribe(() => {
    console.log(" Updated order saved to DB");
  });
}
navigateToWelcomePage(){
  this.router.navigate(['/Welcome'])
  }
  OnLogout() {
    localStorage.clear();
    this.router.navigate(['/Login']);
  }
  
  
}
