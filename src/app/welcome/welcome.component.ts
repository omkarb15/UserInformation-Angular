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
OnLogout() {
  // Clear local storage and redirect to login
  localStorage.clear();
  this.router.navigate(['/Login']);
}

}
