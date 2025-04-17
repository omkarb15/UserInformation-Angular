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
  NodeClickEvent,
  
} from "@progress/kendo-angular-treeview";
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContextMenuComponent, ContextMenuModule, ContextMenuSelectEvent, MenuEvent, MenusModule } from '@progress/kendo-angular-menu';
import { IconModule, SVGIconModule } from '@progress/kendo-angular-icons';
import { pencilIcon, plusIcon, trashIcon } from '@progress/kendo-svg-icons';
interface TreeNode {
  id: number;
  name: string;
  parentId?: number;
}

@Component({
  selector: 'app-tree-view-crud',
  imports: [TreeViewModule,CommonModule,FormsModule,ContextMenuModule, MenusModule,IconModule,SVGIconModule],
  templateUrl: './tree-view-crud.component.html',
  styleUrl: './tree-view-crud.component.css'
})
export class TreeViewCrudComponent implements OnInit {
  public plusIcon=plusIcon
 public trashIcon=trashIcon
 public editIcon=pencilIcon


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


 public selectedNodeId:number|null=null

 public handleSelection(event:any){
  if(event && event.dataItem){
    this.selectedNodeId=event.dataItem.id
   this.selectedNode=event.dataItem
    this.selectedKeys =[event.index]
    console.log("selected Node Id", this.selectedNodeId )
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

addNewNode(parentId:number|null){
  if(this.tempNodeName.trim()==="")return

  const newNode={name:this.tempNodeName,parentId:parentId?? null}
  this.userService.addNewNode(newNode).subscribe({
    next:()=>{  
      this.getTreeData()
      this.isAddingNodeId=null
      this.tempNodeName=''
      
    }   
  })
 }
 
saveEditedName(node:TreeNode){
  debugger
if(this.tempNodeName.trim()===""|| !node) return
node.name=this.tempNodeName
this.userService.updateNode(node.id,{name: node.name,
  parentId:node.parentId
}).subscribe({
next:()=>{
    console.log(`Node ${node.id} update successfully.`)
    this.getTreeData()
    this.isEditingNodeId=null
  } 
})
this.editNodeId=null
}
cancelEditing(){
  this.isEditingNodeId=null
  this.isAddingNodeId=null
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





// editNode(){
// const newText= prompt("Enter new Node Name:", this.selectedNode.name)
// if(newText){
//   this.selectedNode.name=newText
//   this.userService.updateNode(this.selectedNode.id,{ name:newText, parentId:this.selectedNode.parentId
//   }).subscribe({
//     next:()=>{
//       console.log("Selected Node is Updated", this.selectedNode.id)
//       this.getTreeData()
//     }
//   })  
// }   


// }
selectedNode:any=null
contextItem:any=null

public onNodeClick(event: NodeClickEvent, treeMenu: ContextMenuComponent): void {
  if (event.type === "contextmenu" && event.item && event.item.dataItem) {  // Ensure right-click on a node
    const originalEvent = event.originalEvent;
    originalEvent.preventDefault(); 

    this.contextItem = event.item.dataItem; 
    this.selectedNodeId = this.contextItem.id; 

    treeMenu.show({
      left: originalEvent.pageX, // Show context menu at mouse position
      top: originalEvent.pageY,
    });
  }
}
public isEditingNodeId:number| null=null
public isAddingNodeId:number| null=null
public tempNodeName:string=""




onContextMenuSelect(event:ContextMenuSelectEvent){
  const action=event.item.text
  console.log("Context Menu Action", action)

  switch(action){   
    case 'Add Child Node':
      if (this.selectedNodeId !== null) {
        this.isAddingNodeId = this.selectedNodeId; 
        this.tempNodeName = ""; 
      }
      // this.addNewNode(this.selectedNodeId)
      break
      case 'Add Root Node':
        this.isAddingNodeId=-1
        this.tempNodeName=''
        // this.addNewNode(null)
        break
      case 'Delete Node':
        this.deleteSelectedNode()
        break
        case "Update Node Name":
          if(this.selectedNode){
            this.isEditingNodeId=this.selectedNode.id
            this.tempNodeName=this.selectedNode.name
          }
          // this.editNode()
          break

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
OnLogout() {
  localStorage.clear();
  this.router.navigate(['/Login']);
}

navigateToWelcomePage(){
  this.router.navigate(['/Welcome'])
  }

}

