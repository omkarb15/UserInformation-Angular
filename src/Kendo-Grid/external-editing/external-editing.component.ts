import { Component, NgModule, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../app/user.service';
import { KENDO_DIALOG } from '@progress/kendo-angular-dialog';
import { KENDO_DROPDOWNS } from '@progress/kendo-angular-dropdowns';
import { GridModule, KENDO_GRID, RowClassArgs } from '@progress/kendo-angular-grid';
import { CommonModule } from '@angular/common';
import { fileExcelIcon, filePdfIcon, SVGIcon } from '@progress/kendo-svg-icons';
import { KENDO_INDICATORS } from "@progress/kendo-angular-indicators";
import { KENDO_TOOLBAR } from "@progress/kendo-angular-toolbar";
@Component({
  selector: 'app-external-editing',
   imports: [KENDO_GRID,CommonModule,GridModule,FormsModule,KENDO_DROPDOWNS,ReactiveFormsModule,KENDO_DIALOG,KENDO_INDICATORS,KENDO_TOOLBAR],
  templateUrl: './external-editing.component.html',
  styleUrl: './external-editing.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ExternalEditingComponent implements OnInit {
constructor (private  userService:UserService, private router:Router, private formBuilder:FormBuilder){}
ngOnInit(): void {
  this.getAssetData()
}
public gridData:any[]=[]
public formGroup!:FormGroup
public editedRowIndex:number|undefined
public filepdfIcon:SVGIcon=filePdfIcon
public filExcelIcon:SVGIcon=fileExcelIcon



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
]

public onCellClick(event:any):void{
  debugger
  console.log("cell Clicked", event)
  const rowIndex=event.rowIndex
  if(event.columnIndex===this.getActionColumnIndex()){
    return
  }
if(this.editedRowIndex!==rowIndex){                   //Checks if the clicked row is different from the one currently being edited.
  const sender=event.sender
  if (this.editedRowIndex !== undefined && this.editedRowIndex !== rowIndex) {
    this.cancelHandler({ sender, rowIndex: this.editedRowIndex });
  }

  if (this.editedRowIndex !== rowIndex) {
    this.editHandler({ sender, rowIndex, dataItem: event.dataItem })
  }
}
this.editedRowIndex = undefined  
}


private getActionColumnIndex(): number {

  return 9; 
}
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
  if (rowIndex !== undefined) {
    sender.cancelRow(rowIndex);
  }
  this.editedRowIndex = undefined;                      //o that future clicks can correctly enter edit mode.
}

public saveHandler({ sender, rowIndex, formGroup,isNew }: any): void {
  const user = formGroup.value;
  const formattedDob = this.formatDateForBackend(user.dob);
  user.dob = formattedDob;

  if (user.hobbyName && Array.isArray(user.hobbyName)) {
    user.hobbyId = user.hobbyName.join(',');
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



public buttonCount = 2;
public sizes = [10, 20, 50];

}

