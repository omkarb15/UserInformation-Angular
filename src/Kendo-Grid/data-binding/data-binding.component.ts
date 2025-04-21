import { Component, OnInit } from '@angular/core';
import { customers } from '../customers';
import { AddEvent, CancelEvent, CellClickEvent, CellCloseEvent, DataStateChangeEvent, FilterableSettings, GridDataResult, GridModule, KENDO_GRID, RemoveEvent, SaveEvent } from "@progress/kendo-angular-grid";
import { PageChangeEvent } from '@progress/kendo-angular-pager';
import { UserService } from '../../app/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GroupDescriptor, process, State } from '@progress/kendo-data-query';
import { KENDO_DIALOG } from "@progress/kendo-angular-dialog";

import { CompositeFilterDescriptor, SortDescriptor,orderBy  } from '@progress/kendo-data-query';
import { filter } from 'rxjs';
import { state } from '@angular/animations';
import { KENDO_DROPDOWNLIST, KENDO_DROPDOWNS } from "@progress/kendo-angular-dropdowns";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Keys } from '@progress/kendo-angular-common';
import { fileExcelIcon, filePdfIcon, SVGIcon } from '@progress/kendo-svg-icons';
@Component({
  selector: 'app-data-binding',
  imports: [KENDO_GRID, CommonModule,GridModule, KENDO_DROPDOWNLIST, FormsModule, KENDO_DROPDOWNS,ReactiveFormsModule,KENDO_DIALOG],
  templateUrl: './data-binding.component.html',
  styleUrl: './data-binding.component.css'
})
export class DataBindingComponent implements OnInit  {
// public gridData:unknown[]=customers

constructor (private  userService:UserService, private router:Router,  private fb: FormBuilder){}
ngOnInit(): void {
  this.getAssetData()

}
public gridview!:GridDataResult
public skip=0
public pageSize=5
public editForm!: FormGroup;
public buttonCount = 2;
public sizes = [10, 20, 50];
public fileExcelIcon:SVGIcon=fileExcelIcon
public filePdfIcon:SVGIcon=filePdfIcon



  
private allAssets:any[]=[]
public hobbyOptions = [
  { text: 'Reading', value: '1' },
  { text: 'Traveling', value: '2' },
  { text: 'Gardening', value: '3' },
  { text: 'Painting', value: '4' },
  { text: 'Playing', value: '5' }
];

private createFormGroup(dataItem:any):FormGroup{
  return this.fb.group({
    firstName:[dataItem.firstName||'', Validators.required],
    surName:[dataItem.surName||'', Validators.required],
    dob:[dataItem.dob||'', Validators.required],
    gender:[dataItem.gender||'', Validators.required],
    emialId:[dataItem.emialId||'', Validators.required],
    userName:[dataItem.userName||'', Validators.required],
    passWord:[dataItem.passWord||'', Validators.required],
    // hobbyName:[dataItem.hobbyName|| []]
    hobbyId:[dataItem.hobbyId]
    


  })
}

getAssetData() {
  this.userService.getUsers().subscribe((data) => {
    console.log("User Information", data);
    
    
    this.allAssets = data.map((item: any) => {
      return {
        ...item,                    //It takes all the existing properties of item and copies them into the new object.
        dob: item.dob ? new Date(item.dob) : null
      };
    });

    this.loadItems();
  });
}

public state: DataStateChangeEvent = {
  skip: 0,
  take: 5,
  sort: [],
  group: [],
  filter: {
    logic: 'and',
    filters: []
  }
};


private loadItems():void{

  const result = process(this.allAssets,this.state);

  this.gridview={
    data:result.data,
    total:result.total
  }
  console.log("All Assets", this.allAssets);
}

public dataStateChange(state:DataStateChangeEvent):void{
  this.state=state
  this.loadItems()
}
public cellClickHandler(args:CellClickEvent):void{
  if(!args.isEdited){                                        //if not in edit mode already 
    args.sender.editCell(
      args.rowIndex,
      args.columnIndex,
      this.createFormGroup(args.dataItem)
    )
  }
}

public cellCloseHandler(args: CellCloseEvent): void {
  const { formGroup, dataItem } = args;
  const user = formGroup.value;

  if (!formGroup.valid) {
    args.preventDefault();
    return;
  }

  if (formGroup.dirty) {
    if (args.originalEvent && args.originalEvent.keyCode === Keys.Escape) return;

    const formattedDob = this.formatDateForBackend(user.dob);
    user.dob = formattedDob;


    // user.hobbyId = Array.isArray(user.hobbyName) ? user.hobbyName.join(',') : '';

    const isNew = dataItem.id == null || dataItem.id === 0;

    if (isNew) {
      this.userService.createUser(user, null).subscribe(() => this.getAssetData());
    } else {
      user.id = dataItem.id;  
      this.userService.updateUser(user, null).subscribe(() => this.getAssetData());
    }
  }
}

public addHandler(args:AddEvent):void{
  args.sender.addRow(this.createFormGroup({}));
}

public cancelHandler(args:CancelEvent):void{
  args.sender.cancelCell();
}
public saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent): void {
  const user = formGroup.value;
  const formattedDob = this.formatDateForBackend(user.dob);
  user.dob = formattedDob;

  if (!formGroup.valid) {
    return;
  }

  if (isNew) {
    this.userService.createUser(user, null).subscribe(() => this.getAssetData());
  } else {
    user.id = this.gridview.data[rowIndex].id;  // Use existing id
    this.userService.updateUser(user, null).subscribe(() => this.getAssetData());
  }

  sender.closeRow(rowIndex);
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


OnLogout() {
  localStorage.clear();
  this.router.navigate(['/Login']);
}




















// private loadItems():void{
//   const state = {
//     skip: this.skip,
//     take: this.pageSize,
//     sort: this.sort,
//     filter: this.filter,
//     group: this.groups
//   };
//   const result = process(this.allAssets, state);
//   this.gridview={

//     data:result.data,
//     total:result.total
//   }
// }
// public onPageChange(event:PageChangeEvent){
//   this.skip=event.skip
//   this.loadItems()
// }
// public sort:SortDescriptor[]=[]

// public onSortChange(sort:SortDescriptor[]):void{
//   this.sort=  sort
//   this.loadItems()

// }
// public filter: CompositeFilterDescriptor = {
//   logic: "and",    // logic and for different column filter to get exact data
//   filters: []   // filter stores conditions for filter
// };
// public onFilterChange(filter: CompositeFilterDescriptor): void {
//   this.filter = filter;
//   this.loadItems();
// }
// public groups: GroupDescriptor[] = [];
// public onGroupChange(groups: GroupDescriptor[]): void {
//   this.groups = groups;
//   this.loadItems();
// }

navigateToWelcomePage(){
  this.router.navigate(['/Welcome'])
  }

}
