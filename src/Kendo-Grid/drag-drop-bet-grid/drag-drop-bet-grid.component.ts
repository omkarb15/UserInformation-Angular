import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { GridModule, KENDO_GRID } from '@progress/kendo-angular-grid';
import { UserService } from '../../app/user.service';
import { Router } from '@angular/router';
import { DragAndDropModule, DragTargetContainerDirective, DropTargetContainerDirective, DropTargetEvent, KENDO_DRAGANDDROP } from '@progress/kendo-angular-utils';
import { DraggableDirective } from '@progress/kendo-angular-common';
import { FormsModule } from '@angular/forms';
import { LoaderModule, LoaderType } from '@progress/kendo-angular-indicators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drag-drop-bet-grid',
  imports: [KENDO_GRID ,FormsModule,KENDO_DRAGANDDROP,CommonModule,  DragAndDropModule, 
    GridModule , DropTargetContainerDirective,  
    DragTargetContainerDirective,LoaderModule ],
  templateUrl: './drag-drop-bet-grid.component.html',
  styleUrl: './drag-drop-bet-grid.component.css',

})
export class DragDropBetGridComponent  implements OnInit,AfterViewInit  {
  constructor(private userService:UserService, private router:Router){}

@ViewChild('wrapper', { read: DragTargetContainerDirective }) dragTargetContainer!: DragTargetContainerDirective;
@ViewChild('wrapper', { read: DropTargetContainerDirective }) dropTargetContainer!: DropTargetContainerDirective;

  public gridDataItem1:any[]=[]
  public loading:boolean=true
  public loadertype:LoaderType="infinite-spinner"
  public gridDataItem2:any[]=[]
  ngOnInit(): void {
    this.getDiscontinuedProduct()
    this.getInstockProduct()
  }
  ngAfterViewInit(): void {
    debugger
    setTimeout(() => {
      this.dragTargetContainer?.notify()
      this.dropTargetContainer?.notify()
    }, 0);
  }
//This is the optional chaining operator (?.), and it prevents runtime errors if the object is null or undefined.
  // ngAfterViewInit(): void {
  //   // Ensure drag and drop container is initialized after view is ready
  //   setTimeout(() => {
  //     this.dragTargetContainer?.notify()
  //     this.dropTargetContainer?.notify()
  //   });
  // }
getInstockProduct(){
  this.loading=true
  this.userService.getInStockProductGrid().subscribe((Data)=>{
    this.gridDataItem1=Data
console.log("GridDataItem1", this.gridDataItem1)
  })
  setTimeout(() => {
    this.loading=false  
  }, 1500);

}

getDiscontinuedProduct(){
  this.userService.getDiscontinuedProduct().subscribe((response)=>{
    this.gridDataItem2=response
    console.log("GridDataItem2", this.gridDataItem2)
  })
}
public dragData = ({ dragTarget }: { dragTarget: HTMLElement }) => {  //This tells TypeScript that the input is an object with a dragTarget of type HTMLElement.

  return {
    fromGrid: +dragTarget.closest(".k-grid")?.getAttribute("data-kendo-grid-index")!, //! (Non-null assertion operator):to check null value
    fromIndex: +dragTarget.getAttribute("data-kendo-grid-item-index")!,
      //item-index index of item 
       //data-kendo-grid-index is unique index asigned for different 
       //.k-grid is the default class used by Kendo UI Grid components, and it’s used here to locate the Kendo Grid that contains the dragged item.
       //The + operator is used to convert the value returned from getAttribute (which is a string) into a number.
        //   
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
  
    if(fromGrid !== toGrid){
      item.discontinued = !item.discontinued;
    }
    
    fromCollection.splice(fromIndex, 1)
  
    const toIndex = this.calculateDestinationIndex(event, fromGrid, fromIndex, toGrid);
  
    toCollection.splice(toIndex, 0, item)

  // Force grid to re-evaluate by reassigning reference
  // if (toGrid === 0) {
  //   //
  //   this.gridDataItem1 = [...this.gridDataItem1];
  // } else {
  
  //   this.gridDataItem2 = [...this.gridDataItem2];
  // }

  

 
  this.userService.updateStatus(item.id, item.discontinued).subscribe((data) => {
    debugger
    console.log("Updated Data", data);
    this.getDiscontinuedProduct()
    this.getInstockProduct()
   
  });
  this.dragTargetContainer?.notify()
  this.dropTargetContainer?.notify()
}


private calculateDestinationIndex( event: DropTargetEvent,fromGrid: number,fromIndex: number,toGrid: number): number {
debugger
  const dropTarget = event.dropTarget as HTMLElement
  const targetRow = dropTarget.closest(".k-master-row") as HTMLElement | null      //.closest(".k-master-row") searches up the DOM tree from the drop target to find the row where the drop occurred.
  const gridElement = dropTarget.closest(".k-grid") as HTMLElement | null    //Similarly, this finds the parent .k-grid element to know which grid the drop happened in.

  if (!targetRow || !gridElement) return toGrid === 0 ? this.gridDataItem1.length : this.gridDataItem2.length;

  const allRows = Array.from(gridElement.querySelectorAll(".k-master-row"));  //This selects all the rows (.k-master-row) within the target grid and converts the NodeList to an array for easier manipulation.
  const dropIndex = allRows.indexOf(targetRow);   //Finds the index (position) of the row over which the item was dropped.

  return fromGrid === toGrid && dropIndex > fromIndex ? dropIndex - 1 : dropIndex
}



navigateToWelcomePage(){
  this.router.navigate(['/Welcome'])
  }
  OnLogout() {
    localStorage.clear();
    this.router.navigate(['/Login']);
  }
  
  

}
