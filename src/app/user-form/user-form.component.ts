import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export function noWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const isWhiteSpace = (control.value || '').trim().length === 0;
    return isWhiteSpace ? { Whitespace: true } : null;
  };
}

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {
  title = 'UserInfo';
  userForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    FirstName: new FormControl('', [Validators.required, noWhitespaceValidator()]),
    SurName: new FormControl('', [Validators.required, noWhitespaceValidator()]),
    DOB: new FormControl('', [Validators.required]),
    Gender: new FormControl('', [Validators.required]),
    EmialId: new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"),]),
    UserName: new FormControl('', [Validators.required, noWhitespaceValidator()]),
    PassWord: new FormControl('', [Validators.required, Validators.minLength(4), noWhitespaceValidator()]),
    ProfilImage: new FormControl(''),
    HobbyId: new FormControl([]),
  });

  selectedFile: File | null = null;
  userList: any[] = [];
  HobbyList: any[] = [];

  constructor(private userservice: UserService, private router: Router) {} 

  ngOnInit() {
    this.getUsers();
    this.getHobbies();
  }

  getHobbies() {
    this.userservice.getHobbies().subscribe((response) => {
      this.HobbyList = response;
    });
  }

  getUsers() {
    this.userservice.getUsers().subscribe((response) => {
      console.log(response);
      this.userList = response;
    });
  }
  OnredirectToLogin(){
    this.router.navigate(['/Login']);
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
      fileInput.value = '';
    }
    this.selectedFile = null;
    if (!this.userForm.get('id')?.value) {
      this.userForm.patchValue({ ProfilImage: null });
    }
  }

  onUserSave(fileInput: HTMLInputElement) {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      user.HobbyId = this.userForm.value.HobbyId ? this.userForm.value.HobbyId.map(String).join(',') : ''; // convert it into comma separeted value before saving

      if (user.id != 0) {
        this.userservice.updateUser(user, this.selectedFile).subscribe((response) => {
          console.log('User updated successfully', response);
          this.getUsers();
          this.userForm.reset();
          this.resetInput(fileInput); 
        });
      } else {
        this.userservice.createUser(user, this.selectedFile).subscribe(() => {
          this.getUsers();
          this.userForm.reset();
          this.resetInput(fileInput);
        });
      }
    } else {
      console.log('Form is Invalid', this.userForm.errors);
    }
  }

  editUser(user: any) {
    let formattedDate = user.dob ? new Date(user.dob).toISOString().split('T')[0] : '';

    this.userForm.patchValue({
      id: user.id,
      FirstName: user.firstName,
      SurName: user.surName,
      DOB: formattedDate,
      Gender: user.gender,
      EmialId: user.emialId,
      UserName: user.userName,
      PassWord: user.passWord,
      ProfilImage: user.profilImage || '',
      HobbyId: user.hobbyId ? user.hobbyId.split(',').map(Number) : [], 
    });
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userservice.deleteUser(id).subscribe(() => {
        console.log('User deleted successfully!');
        this.getUsers();
        this.userForm.reset();
        this.selectedFile = null;
      });
    }
  }
  navigateToWelcomePage(){
  this.router.navigate(['/Welcome'])
  }
}     

