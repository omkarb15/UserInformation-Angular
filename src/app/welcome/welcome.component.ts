import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {
  FirstName:string | null=""
  SurName: string| null=""
  Gender: string| null=""
  userId:any

  ngOnInit(): void {
    console.log("Retrieving values from localStorage...")
    this.FirstName = localStorage.getItem("firstName") 
    this.SurName = localStorage.getItem("surName")
    this.Gender = localStorage.getItem("gender")
    this.userId = localStorage.getItem("userId")
    console.log("firstName:", this.FirstName);
    console.log("surName:", this.SurName);
    console.log("gender:", this.Gender);
    console.log("userId:", this.userId);

    
  }
  constructor(private userService: UserService, private router: Router) {}

  OnuserForm(){
    this.router.navigate(['/UserForm'])
  }
OnQuestion(){
 
  this.router.navigate(['/Questions'] )
}
OnQuestionOption(){
  this.router.navigate(['/QuestionOption'])
}
treeViewCrudOperation(){
  this.router.navigate(['/TreeViewCrudOperation'])
}
treeViewDragAndDrop(){
  this.router.navigate(['/TreeViewDragDrop'])
}
treeViewCheckBox(){
  this.router.navigate(['/TreeViewCheckBoxes'])
}
treeViewContextMenu(){
  this.router.navigate(['/ContextMenu'])
}

KendoGridDataBinding(){
  this,this.router.navigate(['/KendoGridDataBinding'])
}

KendoGridBuitInBinding(){
  this,this.router.navigate(['/BuitInDirectiveBindingInGrid'])
}
kendoGridExternalEditing(){
  this.router.navigate(['/ExternalEditing'])
}
KendoGridRowReorder(){
  this.router.navigate(['/RowReorderIng'])
}
kendoGridDragDrop(){
  this.router.navigate(['/GridDragDrop'])
}
gridWithRadioButton(){
  this.router.navigate(['/RadioButtonWithGrid'])
}
ChartIntegration(){
  this.router.navigate(['/ChartIntegration'])
}
sharedComponent(){
  this.router.navigate(['/sharedCompoent'])
}
AM5chartComponent(){
  this.router.navigate(['/Am5 Chart'])

}
XYChart(){
  this.router.navigate(['/XY Chart'])
}
StackedChart(){
  this.router.navigate(['/StakedChart'])
}

pieChart(){
  this.router.navigate(['/PieChart'])
}

sankeyChart(){
  this.router.navigate(['/SankeyChart'])
}
StudentBar(){
  this.router.navigate(['/StudentBar'])
}
FlyerWithUserInfo(){
  this.router.navigate(['/FlyerEditUserInfo'])
}

OnLogout() {
  localStorage.clear();
  this.router.navigate(['/Login']);
}


}
