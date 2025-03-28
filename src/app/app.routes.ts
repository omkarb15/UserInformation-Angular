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
        component:UserFormComponent
    },
    {
        path:'Welcome',
        component:WelcomeComponent
    },
    {
        path:'Questions',
        component:QuestionsComponent
    },
    {
        path:'QuestionOption',
        component:QuestionOptionComponent
    },
    {
        path:'TreeViewCrudOperation',
        component:TreeViewCrudComponent
    },
    {
        path:'TreeViewDragDrop',
        component:TreeDragDropComponent
    },
    {
        path:'TreeViewCheckBoxes',
        component:CheckBoxesComponent
    }
];

