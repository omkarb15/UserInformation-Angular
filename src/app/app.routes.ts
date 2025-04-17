import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { UserFormComponent } from './user-form/user-form.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionOptionComponent } from './question-option/question-option.component';
import { TreeViewCrudComponent } from './TreeView/tree-view-crud/tree-view-crud.component';
import { TreeDragDropComponent } from './TreeView/tree-drag-drop/tree-drag-drop.component';
import { CheckBoxesComponent } from './TreeView/check-boxes/check-boxes.component';
import { ContextMenuComponent } from './TreeView/context-menu/context-menu.component';
import { authGuard } from './auth.guard';
import { DataBindingComponent } from '../Kendo-Grid/data-binding/data-binding.component';
import { BuitInDirectiveBindingComponent } from '../Kendo-Grid/buit-in-directive-binding/buit-in-directive-binding.component';
import { ExternalEditingComponent } from '../Kendo-Grid/external-editing/external-editing.component';
import { RowreOrderingComponent } from '../Kendo-Grid/rowre-ordering/rowre-ordering.component';
import { DragDropBetGridComponent } from '../Kendo-Grid/drag-drop-bet-grid/drag-drop-bet-grid.component';
import { RadioButtonComponent } from '@progress/kendo-angular-inputs';
import { RadioButtonWithGridComponent } from '../Kendo-Grid/radio-button-with-grid/radio-button-with-grid.component';


export const routes: Routes = [
    { path: '', 
        redirectTo: 'Login',
         pathMatch: 'full' 
        },

  
    {
        path:'Login',
        component:LoginComponent,
      

    },
    {
        path:'UserForm',
        component:UserFormComponent,
        canActivate:[authGuard]
    },
    {
        path:'Welcome',
        component:WelcomeComponent,
        canActivate:[authGuard]
    },
    {
        path:'Questions',
        component:QuestionsComponent,
        canActivate:[authGuard]
    },
    {
        path:'QuestionOption',
        component:QuestionOptionComponent,
        canActivate:[authGuard]
    },
    {
        path:'TreeViewCrudOperation',
        component:TreeViewCrudComponent,
        canActivate:[authGuard]
    },
    {
        path:'TreeViewDragDrop',
        component:TreeDragDropComponent,
        canActivate:[authGuard]
    },
    {
        path:'TreeViewCheckBoxes',
        component:CheckBoxesComponent,
        canActivate:[authGuard]
    },
    {
        path:'ContextMenu',
        component:ContextMenuComponent,
        canActivate:[authGuard]
    },
    {
        path:'KendoGridDataBinding',
        component:DataBindingComponent,
        canActivate:[authGuard]
    },
    {path:'BuitInDirectiveBindingInGrid',
        component:BuitInDirectiveBindingComponent
    },
    {
        path:'ExternalEditing',
        component:ExternalEditingComponent
    },


    {path:'RowReorderIng',
        component:RowreOrderingComponent

    },
    {
        path:'GridDragDrop',
        component:DragDropBetGridComponent
    },
    {
        path:'RadioButtonWithGrid',
        component:RadioButtonWithGridComponent
    }
];

