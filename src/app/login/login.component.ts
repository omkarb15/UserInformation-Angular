import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from '../user.service';



@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  LoginForm:FormGroup= new FormGroup({
    UserName: new FormControl("",[Validators.required]),
    PassWord: new FormControl("",[Validators.required] )   
    
    })
    userData:any;

constructor(private userService: UserService, private router: Router) {}


ngOnInit() {

localStorage.clear()
  sessionStorage.clear();
}


OnLogin() {
  debugger
  if (this.LoginForm.valid) {
    const credentials = this.LoginForm.value;

    this.userService.login(credentials).subscribe({
      next: (response: any) => {
        debugger
   // this.userData=response
        alert("Login Successful");
        console.log("API Response:", response); 
        //localStorage.removeItem("userData")
       // localStorage.setItem("userData" ,this.userData)
         localStorage.setItem("username",response.username)
        localStorage.setItem("firstName",response.firstName)
         localStorage.setItem("surName",response.surName)
        localStorage.setItem("gender",response.gender )
        localStorage.setItem("userId",response.userId)
        this.router.navigate(['/Welcome']) 
      },
      error: (error) => {
        alert("Invalid username or password");
      }
    });
  }
}
OnCancel() {
  this.LoginForm.reset(); 
}




}