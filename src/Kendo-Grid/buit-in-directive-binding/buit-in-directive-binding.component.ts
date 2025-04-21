import { Component, OnInit } from '@angular/core';
import { CreateFormGroupArgs, GridDataResult, GridModule, KENDO_GRID } from '@progress/kendo-angular-grid';
import { UserService } from '../../app/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { KENDO_DROPDOWNS } from '@progress/kendo-angular-dropdowns';
import { KENDO_DIALOG } from "@progress/kendo-angular-dialog";

@Component({
  selector: 'app-buit-in-directive-binding',
  imports: [KENDO_GRID,CommonModule,GridModule,FormsModule,KENDO_DROPDOWNS,ReactiveFormsModule,KENDO_DIALOG],
  templateUrl: './buit-in-directive-binding.component.html',
  styleUrl: './buit-in-directive-binding.component.css'
})
export class BuitInDirectiveBindingComponent  implements OnInit{


  constructor (private  userService:UserService, private router:Router, private formBuilder:FormBuilder){}
  ngOnInit(): void {

    this.getAssetData()
  }
public gridData:any[]=[]
public formGroup!:FormGroup
public editedRowIndex:number|undefined


getAssetData(){
  this.userService.getUsers().subscribe((data)=>{
this.gridData=data
console.log("userInformation", data)
this.gridData = data.map((item: any) => {
  return {
    ...item,                    //It takes all the existing properties of item and copies them into the new object.
    dob: item.dob ? new Date(item.dob) : null,
    hobbyName: item.hobbyId ? item.hobbyId.split(',') : [] 
  };
});
  })
}



public reactiveFormGroup = (args: { dataItem?: any; isNew: boolean }): FormGroup => {
  const item = args.isNew ? {} : args.dataItem;
  return this.formBuilder.group({
    
    firstName: [item.firstName, Validators.required],
    surName: [item.surName, Validators.required],
    dob: [item.dob, Validators.required],
    gender: [item.gender, Validators.required],
    emialId: [item.emialId, Validators.required],
    userName: [item.userName, Validators.required],
    passWord: [item.passWord, Validators.required],
    hobbyName:[item.hobbyName || []]
   

  
   
  });
}



public genderOptions = [
  { text: 'Male', value: 'Male' },
  { text: 'Female', value: 'Female' }
];
public hobbyOptions = [
  { text: 'Reading', value: '1' },
  { text: 'Traveling', value: '2' },
  { text: 'Gardening', value: '3' },
  { text: 'Painting', value: '4' },
  { text: 'Playing', value: '5' }
];



public addHandler({ sender }: any): void {
  
  this.formGroup = this.reactiveFormGroup({ isNew: true });
  sender.addRow(this.formGroup);
}

public editHandler({ sender, rowIndex, dataItem }: any): void {
  this.formGroup = this.reactiveFormGroup({ dataItem, isNew: false });
  this.editedRowIndex = rowIndex;
  sender.editRow(rowIndex, this.formGroup);
}

public cancelHandler({ sender, rowIndex }: any): void {
  sender.cancelRow(rowIndex);
}

public saveHandler({ sender, rowIndex, formGroup,isNew }: any): void {
  
  if (formGroup.invalid) {
    return;
  }
  const user = formGroup.value;

  
  const formattedDob = this.formatDateForBackend(user.dob);
  user.dob = formattedDob;

  if (user.hobbyName && Array.isArray(user.hobbyName)) {            // if hobbyname is not array set hobbyid to empty string
    user.hobbyId = user.hobbyName.join(',');                     //convert hobbynam into id
  } else {
    user.hobbyId = '';
  }
  
if(isNew){
  this.userService.createUser(user, null).subscribe(() => {
    this.getAssetData(); 
    sender.closeRow(rowIndex);
  });
  
}
else{
  user.id = this.gridData[rowIndex].id;
  this.userService.updateUser(user,null).subscribe(()=>{
    this.getAssetData()
    sender.closeRow(rowIndex)
  })
}
 
}

private formatDateForBackend(date: Date): string {
  if (!date) return '';

  const pad = (n: number) => n.toString().padStart(2, '0');
  const yyyy = date.getFullYear();
  const MM = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const HH = pad(date.getHours());
  const mm = pad(date.getMinutes());
  const ss = pad(date.getSeconds());

  return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}.0000000`;
}

public itemToRemove: any = null;
public removeHandler({ dataItem }: any): void {
  this.itemToRemove = dataItem;
}
public confirmRemove(confirm: boolean): void {
  if (confirm && this.itemToRemove) {
    this.userService.deleteUser(this.itemToRemove.id).subscribe(() => {
      this.getAssetData();
    });
  }
  this.itemToRemove = null;
}



public selectedKeys: number[] = []; 
 deleteSelectedUser(){
  debugger
  if(this.selectedKeys.length===0)return                                               //if no keys selected  function exist immediately
const confirmDelete=confirm(`Are you sure you want to delete this  ${this.selectedKeys} user(s) ??`)
if(!confirmDelete)return
  this.userService.DeleteMultipleuserIngrid(this.selectedKeys).subscribe({
    next: () => {
      this.gridData = this.gridData.filter(user => !this.selectedKeys.includes(user.id));
      this.getAssetData(); 
      this.selectedKeys = []; 
    },
    error: (err) => {
      console.error("Error deleting users:", err);
    }
  });
 }



public buttonCount = 2;
public sizes = [10, 20, 50];
navigateToWelcomePage(){
  this.router.navigate(['/Welcome'])
  }
  OnLogout() {
    localStorage.clear();
    this.router.navigate(['/Login']);
  }
}
