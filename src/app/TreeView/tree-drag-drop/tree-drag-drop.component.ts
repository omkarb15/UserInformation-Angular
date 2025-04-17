import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import {
  TreeItemDropEvent,
  DropPosition,
  TreeViewModule,
  TreeViewFilterSettings,
  DragAndDropScrollSettings,
  DropAction,
  CheckableSettings,
  CheckMode,
  SelectionMode,
  TreeViewSize,
  SelectableSettings,
  TreeItemDragEvent,
  TreeItemLookup,
  FilterExpandSettings,
  
} from "@progress/kendo-angular-treeview";
import { forkJoin, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tree-drag-drop',
  imports: [TreeViewModule,FormsModule],
  templateUrl: './tree-drag-drop.component.html',
  styleUrl: './tree-drag-drop.component.css'
})
export class TreeDragDropComponent implements OnInit {
  public treeData1:any[]=[]
  public treeData2:any[]=[]

  ngOnInit(): void {
    this.LoadTreeDragDrop()
  }
  
   constructor(private userService: UserService, private router: Router) {}

  LoadTreeDragDrop(){
    this.userService.getTreeDragDropByTreeviewId(1).subscribe({
      next:(response:any)=>{
        this.treeData1=response
        console.log("TreeData1",this.treeData1)

        this.userService.getTreeDragDropByTreeviewId(2).subscribe({
          next:(data:any)=>{
            this.treeData2=data
          }
        })
      }
    })
  }

  onNodeDragStart(event:any) {
  if (event.sourceItem.item.dataItem.id === 1 || event.sourceItem.item.dataItem.id === 9) {
      event.preventDefault()
      // event.setValid(false)
    }
  }
  
  onNodeDrop(event: TreeItemDropEvent) { 
    debugger;
    console.log("Drag and Drop event", event)

    const draggedItem = event.sourceItem.item.dataItem
    const NewParent = event.destinationItem?.item.dataItem
    const dropPosition: DropPosition = event.dropPosition

   
    const newTreeViewId = this.treeData1.includes(NewParent) ? 1 : 2  //if newparent is not include in treedata1 then it will get treeviewID 2
    draggedItem.treeViewId = newTreeViewId;



    if (dropPosition === DropPosition.Over) {  
      draggedItem.parentId = NewParent ? NewParent.id : null
    } else {
      draggedItem.parentId = NewParent?.parentId || null

      const siblings = this.treeData1.concat(this.treeData2)
        .filter(item => item.parentId === draggedItem.parentId) // find nodes that have same parentId

      const newIndex = siblings.findIndex(item => item.id === NewParent.id)

      if (dropPosition === DropPosition.Before) {  
        siblings.splice(newIndex, 0, draggedItem)
      } else if (dropPosition === DropPosition.After) {  
        siblings.splice(newIndex + 1, 0, draggedItem)
      }
    }
 

 console.log("Updated Node:", draggedItem)

 const children= this.treeData1.filter(item=>item.parentId===draggedItem.id)  
 .concat(this.treeData2.filter(item=>item.parentId===draggedItem.id)) //If draggedItem.id is a parent to other nodes, this retrieves all direct children.

 children.forEach(child => {
  child.treeViewId = newTreeViewId
});

 this.userService.UpdateDragAndDrop(draggedItem.id, draggedItem.parentId, draggedItem.treeViewId).pipe(
  switchMap(() => {
    return forkJoin(children.map(child => 
      this.userService.UpdateDragAndDrop(child.id, child.parentId, child.treeViewId)
    ));
  })
).subscribe(response => {
  console.log("All updates successful", response)
  this.LoadTreeDragDrop()
});
// switchMap ensures that the first API call (for the dragged item) completes first before updating its children.
// forkJoin executes all child updates in parallel and waits until all are completed.
}

public getActionText(action:DropAction):string{
  
  switch(action){
  
  case DropAction.Add:
    return "Add";
    case DropAction.InsertTop:
  return "InsertTop" 
  case DropAction.InsertMiddle:
    return "InsertMiddle"
    case DropAction.InsertBottom:
      return "InsertBottom"
      case DropAction.Invalid:
        default:
          return "Invalid"
  
  }
  } 
  OnLogout() {
    localStorage.clear();
    this.router.navigate(['/Login']);
  }
  navigateToWelcomePage(){
    this.router.navigate(['/Welcome'])
    }
}
