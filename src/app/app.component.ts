import { Component, input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, RequiredValidator, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';


export function noWhitespaceValidator():ValidatorFn{

  return (control:AbstractControl)=>{
    const isWhiteSpace=(control.value|| '').trim().length===0
    return isWhiteSpace ?{Whitespace:true}: null
  }
}

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [ ReactiveFormsModule,CommonModule ,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent implements OnInit  {
  title = 'UserInfo'
userForm: FormGroup= new FormGroup({
  id: new FormControl(0),// to update user and 

  FirstName: new FormControl("",[Validators.required, noWhitespaceValidator()] ),
  SurName:new FormControl("",[Validators.required, noWhitespaceValidator()] ),
  DOB : new FormControl("",[Validators.required, noWhitespaceValidator()]) ,
  Gender: new FormControl('',[Validators.required, noWhitespaceValidator()] ),
  EmialId:new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")]),
  UserName:new FormControl("",[Validators.required, noWhitespaceValidator()] ),
  PassWord:new FormControl("",[Validators.required,Validators.minLength(4), noWhitespaceValidator()]),
  ProfilImage:new FormControl(""),
  HobbyId: new FormControl([])
 
})
selectedFile: File | null = null;
userList: any[] = [];
HobbyList: any[]=[]

constructor(private userservice: UserService) {}

ngOnInit() {
  this.getUsers();
  this.getHobbies()
}

getHobbies(){
  this.userservice.getHobbies().subscribe(response=> {
    this.HobbyList=response
  })
}




getUsers() {
  this.userservice.getUsers().subscribe(response => {
    console.log(response);
    this.userList = response;
  });
}

onfileSelected(event: any) {
  if (event.target.files.length > 0) {
    this.selectedFile = event.target.files[0];
  } else {
    this.selectedFile = null;
  }
}

resetInput(fileInput: HTMLInputElement) {
  if (fileInput) {
    fileInput.value = ''; // clears the UI field
  }
  this.selectedFile = null;// reset file in component

  if (!this.userForm.get("id")?.value) {  
    this.userForm.patchValue({ ProfilImage: null }); // clears profileImgae in form
  }
}

onUserSave(fileInput: HTMLInputElement) {
  debugger
 
  console.log("Form Submitted", this.userForm.value);
   


  if (this.userForm.valid) {
    const user = this.userForm.value;
    user.HobbyId = this.userForm.value.HobbyId ? this.userForm.value.HobbyId.map(String).join(',') : "";



    if (user.id!=0) {
      
      this.userservice.updateUser( user, this.selectedFile).subscribe(response => {
        console.log("User updated successfully", response);
        this.getUsers();
        this.userForm.reset();
        this.resetInput(fileInput);
      });
    } else {
      
     
      
      this.userservice.createUser(user,this.selectedFile ).subscribe(createdUser => {
    
       
          this.getUsers();
          this.userForm.reset();
      
          this.resetInput(fileInput);
        
      });
    }
  } else {
    console.log("Form is Invalid", this.userForm.errors);
  }
}



editUser(user: any) {
  
  debugger
  let formattedDate = user.dob ? new Date(user.dob).toISOString().split('T')[0] : '';

  this.userForm.patchValue({
  
    id: user.id,  // need to determine which user is edited
    FirstName: user.firstName,
    SurName: user.surName,
    DOB: formattedDate,
    Gender: user.gender,
    EmialId: user.emialId,
    UserName: user.userName,
    PassWord: user.passWord,
    ProfilImage: user.profilImage || "",
    HobbyId: user.hobbyId ? user.hobbyId.split(',').map(Number) : []
  });


}

deleteUser(id: number) {
  if (confirm("Are you sure you want to delete this user?")) {
    this.userservice.deleteUser(id).subscribe(() => {
      console.log("User deleted successfully!");
      this.getUsers();
      this.userForm.reset();
      this.selectedFile = null;
    });
  }
}
}