import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import '@angular/localize/init';



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
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
interface TreeNode {
  id: number;
  name: string;
  parentId?: number;
}

@Component({
  selector: 'app-tree-view-crud',
  imports: [TreeViewModule,CommonModule,FormsModule],
  templateUrl: './tree-view-crud.component.html',
  styleUrl: './tree-view-crud.component.css'
})
export class TreeViewCrudComponent implements OnInit {

  Data:TreeNode[]=[]

 constructor(private userService: UserService, private router: Router) {}
ngOnInit(): void {
  this.getTreeData()
}

public selectedKeys:string[]=["0"]
public expandedKeys:string[]=["0","0_0"]

 getTreeData(){
  this.userService.GetTreeData().subscribe({
    next:(response:any)=>{
      this.Data=response
      console.log("GetTreeData", this.Data)
    }
  })
 }

 addNewNode(parentId:number|null){
  const newNode={name:"new Node",parentId:parentId}
  this.userService.addNewNode(newNode).subscribe({
    next:()=>
      this.getTreeData()
  })
 }

 public selectedNodeId:number|null=null

 public handleSelection(event:any){
  if(event && event.dataItem){
    this.selectedNodeId=event.dataItem.id
    this.selectedKeys =[event.index]
    console.log("selected Node Id", this.selectedNodeId)
  }
 }

 editNodeId:number|null=null
 editNodeName:string=""

 startEditing(node:TreeNode){
  this.editNodeId=node.id
  this.editNodeName=node.name
}

 onNodeDrop(event: TreeItemDragEvent){
  debugger
  console.log("dragand drop event",event)
  const draggedItem=event.sourceItem?.item?.dataItem
  const NewParent=event.destinationItem?.item?.dataItem
if(!draggedItem){
  console.log("DraggedItem is undefined")
   return 
  
}
  draggedItem.parentId=NewParent ? NewParent.id:null
  console.log("Updating Node:", draggedItem);

  this.userService.updateNode(draggedItem.id, draggedItem).subscribe({
    next:()=>this.getTreeData()
  })
}

saveNodeName(node:TreeNode){
  debugger
if(this.editNodeName.trim()==="") return
node.name=this.editNodeName
this.userService.updateNode(node.id,{name: node.name,
  parentId:node.parentId
}).subscribe({
next:()=>{
    console.log(`Node ${node.id} update successfully.`)
    this.getTreeData()
  } 
})
this.editNodeId=null
}
cancelEditing(){
  this.editNodeId=null
}

deleteSelectedNode(){
  if(this.selectedNodeId){
    if(confirm(`Are you sure you want to delete node Id ${this.selectedNodeId}?`)){

      this.userService.deleteSelectedNode(this.selectedNodeId).subscribe({
        next:()=>{
          console.log(`Node ${this.editNodeName } Deleted Successfully`)
          this.getTreeData()
          this.selectedNodeId=null
                  }
      })
    }
  }

}

public key:string[]=[]
public isexpand=(dataItem:any, index:string)=>{
  return this.key.indexOf(index)>-1
}

public expandOnclear:any=false

public disabledKeys:string[]=["0_2"]
// public filterExpandSetting:FilterExpandSettings={
  
//   expandMatches:true   //Ensures that when a node matches the filter condition, it automatically expands so that it becomes visible in the tree.


// }
public get filterExpandSettings(): FilterExpandSettings {
  return { expandedOnClear: this.expandOnclear };
  

}


treeViewDragDrop(){
  this.router.navigate(['/TreeViewDragDrop'])
}
treeViewCheckBox(){
  this.router.navigate(['/TreeViewCheckBoxes'])
}

public iconClass(name:any):any{
  return {
    "k-i-folder":name !== undefined,
    "k-icon":true,
    "k-font-icon":true,
  }
}

}

