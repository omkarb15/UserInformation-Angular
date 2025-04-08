import { Component, OnInit } from '@angular/core';
import { CreateFormGroupArgs, GridDataResult, GridModule, KENDO_GRID } from '@progress/kendo-angular-grid';
import { UserService } from '../../app/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, RequiredValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-buit-in-directive-binding',
  imports: [KENDO_GRID,CommonModule,GridModule,FormsModule],
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
    dob: item.dob ? new Date(item.dob) : null
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
    hobbyId:[item.hobbyId]
  
   
  });
};



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
  const user = formGroup.value;

  
  const formattedDob = this.formatDateForBackend(user.dob);
  user.dob = formattedDob;
  
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

public removeHandler({ dataItem }: any): void {
  if (confirm(`Are you sure you want to delete ${dataItem.firstName} ${dataItem.surName}?`)) {
    this.userService.deleteUser(dataItem.id).subscribe(() => {
      this.getAssetData(); 
    });
  }
}



public buttonCount = 2;
public sizes = [10, 20, 50];

}
