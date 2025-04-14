import { Component, OnInit } from '@angular/core';
import { KENDO_GRID } from '@progress/kendo-angular-grid';
import { UserService } from '../../app/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drag-drop-bet-grid',
  imports: [KENDO_GRID],
  templateUrl: './drag-drop-bet-grid.component.html',
  styleUrl: './drag-drop-bet-grid.component.css'
})
export class DragDropBetGridComponent  implements OnInit{
  constructor(private userService:UserService, private router:Router){}

  public gridDataItem1:any[]=[]
  public gridDataItem2:any[]=[]
  ngOnInit(): void {
    this.getDiscontinuedProduct()
    this.getInstockProduct()
  }

getInstockProduct(){
  this.userService.getInStockProductGrid().subscribe((Data)=>{
    this.gridDataItem1=Data
console.log("GridDataItem1", this.gridDataItem1)
  })
}

getDiscontinuedProduct(){
  this.userService.getDiscontinuedProduct().subscribe((response)=>{
    this.gridDataItem2=response
    console.log("GridDataItem2", this.gridDataItem2)
  })
}

}
