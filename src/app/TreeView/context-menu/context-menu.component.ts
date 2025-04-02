import { Component } from '@angular/core';


import { ContextMenuModule, MenusModule } from "@progress/kendo-angular-menu";
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

@Component({
  selector: 'app-context-menu',
  imports: [MenusModule, TreeViewModule,ContextMenuModule],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.css'
})
export class ContextMenuComponent {
  treeData = [
    { id: 1, text: 'Node 1', parent: null, items: [{ id: 2, text: 'Child 1.1', parent: 1 }] },
    { id: 3, text: 'Node 2', parent: null }
  ];

  selectedNode: any = null; // Store the selected node

  onNodeClick(event: any) {
    this.selectedNode = event.dataItem;
    console.log('Node Clicked:', this.selectedNode);
  }

  onContextMenuSelect(event: any) {
    const action = event.item.text; // Get the selected action
    console.log('Context Menu Action:', action);


    switch (action) {
      case 'Add Node':
        this.addNode();
        break;
      case 'Edit Node':
        this.editNode();  
        break;
      case 'Delete Node':
        this.deleteNode();
        break;
    }
  }

  addNode() {
    const newNode = {
      id: Math.random(), // Generate unique ID
      text: 'New Node',
      parent: this.selectedNode.id
    };

    if (!this.selectedNode.items) {
      this.selectedNode.items = [];
    }
    this.selectedNode.items.push(newNode);
    console.log('Node Added:', newNode);
  }

  editNode() {
    const newText = prompt('Enter new node name:', this.selectedNode.text);
    if (newText) {
      this.selectedNode.text = newText;
      console.log('Node Edited:', this.selectedNode);
    }
  }

  deleteNode() {
    if (confirm(`Delete ${this.selectedNode.text}?`)) {
      this.treeData = this.treeData.filter(node => node.id !== this.selectedNode.id);
      console.log('Node Deleted:', this.selectedNode);
      this.selectedNode = null; // Clear selection
    }
  }

}

