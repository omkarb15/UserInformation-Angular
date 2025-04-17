import { Component, OnInit } from '@angular/core';
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
import { RTL } from '@progress/kendo-angular-l10n';

@Component({
  selector: 'app-check-boxes',
  imports: [TreeViewModule],
  templateUrl: './check-boxes.component.html',
  styleUrl: './check-boxes.component.css',
  providers:[{provide:RTL, useValue:false}]
})
export class CheckBoxesComponent implements OnInit {
  public checkBoxTree:any[]=[]

  ngOnInit(): void {
    this.getCheckBoxTreeData()
  }
constructor(private userService:UserService, private router:Router){

}

public chekedKeys:any[]=[]
public key="name"
  getCheckBoxTreeData(){
    debugger
    this.userService.getCheckBoxTree().subscribe({
      next:(Data:any)=>{
        this.checkBoxTree=Data
        this.chekedKeys = Data.filter((node: any) => node.isChecked).map((node: any) => node.name)


        console.log("GetCheckBoxTreeData:",this.checkBoxTree)
        console.log("Checked kays", this.chekedKeys)
      }
    })
  }

  oncheckedChange(event: any) {
    debugger
    const node = event.item
 const nodeId = node.dataItem.id
    const nodeName = node.dataItem.name
    const isChecked = this.chekedKeys.includes(nodeName);

    const updateChidNodes=(parentId:number, isChecked:boolean)=>{
      
      this.checkBoxTree.forEach((node)=>{
      if(node.parent===parentId){
        
          const childname=node.name  
        if(isChecked){
          
          if(!this.chekedKeys.includes(childname)){ // checks if childname (the child node’s name) already exists in the chekedKeys array.
            
        this.chekedKeys.push(childname)

              }
         else{
          //if the parent is unchecked, remove the child node from chekedKeys to mark it as unchecked.
              this.chekedKeys=this.chekedKeys.filter((name)=>name !==childname) 
            }
            node.isChecked=isChecked
            updateChidNodes(node.id, isChecked)
          }
        }
      })
    }
  
    if (isChecked) {
      this.chekedKeys.push(nodeName);
    } else {
      this.chekedKeys = this.chekedKeys.filter(name => name !== nodeName)
    }
 
    const updatedNode = this.checkBoxTree.find(n => n.id === nodeId)
    if (updatedNode) {
      updatedNode.isChecked = isChecked;
      updateChidNodes(nodeId,isChecked)
    }
  
    const payload = { id: nodeId, isChecked }

  
    console.log("Payload being sent:", payload)
  
    this.userService.updateIschecked(payload).subscribe({
      next: (response: any) => {

        this.getCheckBoxTreeData()  
      },
      
    });
  }
  
public componentSize:TreeViewSize[]=["small", "medium","large"]
public selectedComponentSize:TreeViewSize="large"
OnLogout() {
  localStorage.clear();
  this.router.navigate(['/Login']);
}
  
navigateToWelcomePage(){
  this.router.navigate(['/Welcome'])
  }

}
  


