import { Component, OnInit } from '@angular/core';
import { GridModule, KENDO_GRID } from '@progress/kendo-angular-grid';
import { UserService } from '../../app/user.service';
import { Router } from '@angular/router';
import { DragAndDropModule, DragTargetContainerDirective, DropTargetContainerDirective, DropTargetEvent, KENDO_DRAGANDDROP } from '@progress/kendo-angular-utils';
import { DraggableDirective } from '@progress/kendo-angular-common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-drag-drop-bet-grid',
  imports: [KENDO_GRID ,FormsModule,KENDO_DRAGANDDROP,  DragAndDropModule, 
    GridModule , DropTargetContainerDirective,  
    DragTargetContainerDirective ],
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
public dragData = ({ dragTarget }: { dragTarget: HTMLElement }) => {

  return {
    fromGrid: +dragTarget.closest(".k-grid")?.getAttribute("data-kendo-grid-index")!, //! (Non-null assertion operator):to check null value
    fromIndex: +dragTarget.getAttribute("data-kendo-grid-item-index")!,  //item-index index of item 
       //data-kendo-grid-index is unique index asigned for diferent 
       //.k-grid is the default class used by Kendo UI Grid components, and it’s used here to locate the Kendo Grid that contains the dragged item.
       //The + operator is used to convert the value returned from getAttribute (which is a string) into a number.
           
  };
};

public onDrop(event: DropTargetEvent): void {
debugger
  const { fromGrid, fromIndex } = event.dragData;
  const gridElement = event.dropTarget.closest(".k-grid") as HTMLElement | null;
  if (!gridElement) return;

  const toGrid = +gridElement.getAttribute("data-kendo-grid-index")!;
  const fromCollection = fromGrid === 0 ? this.gridDataItem1 : this.gridDataItem2; // getting grid data
  const toCollection = toGrid === 0 ? this.gridDataItem1 : this.gridDataItem2;

  const item = fromCollection[fromIndex];

  // Update the status (toggle discontinued)
  item.discontinued = !item.discontinued;

  // Remove from original grid collection
  fromCollection.splice(fromIndex, 1);

  // Calculate destination index
  const toIndex = this.calculateDestinationIndex(event, fromGrid, fromIndex, toGrid);

  // Add to new collection
  toCollection.splice(toIndex, 0, item);

  // Update the backend via API
  this.userService.updateStatus(item.id, item.discontinued).subscribe((data) => {
    console.log("Updated Data", data);
  });
}

private calculateDestinationIndex( event: DropTargetEvent,fromGrid: number,fromIndex: number,toGrid: number): number {

  const dropTarget = event.dropTarget as HTMLElement;
  const targetRow = dropTarget.closest(".k-master-row") as HTMLElement | null;
  const gridElement = dropTarget.closest(".k-grid") as HTMLElement | null;

  if (!targetRow || !gridElement) return toGrid === 0 ? this.gridDataItem1.length : this.gridDataItem2.length;

  const allRows = Array.from(gridElement.querySelectorAll(".k-master-row"));
  const dropIndex = allRows.indexOf(targetRow);

  return fromGrid === toGrid && dropIndex > fromIndex ? dropIndex - 1 : dropIndex;
}




  

}
