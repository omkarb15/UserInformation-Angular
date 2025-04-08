import { Component, OnInit } from '@angular/core';
import { customers } from '../customers';
import { DataStateChangeEvent, FilterableSettings, GridDataResult, GridModule, KENDO_GRID } from "@progress/kendo-angular-grid";
import { PageChangeEvent } from '@progress/kendo-angular-pager';
import { UserService } from '../../app/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GroupDescriptor, process, State } from '@progress/kendo-data-query';

import { CompositeFilterDescriptor, SortDescriptor,orderBy  } from '@progress/kendo-data-query';
import { filter } from 'rxjs';
import { state } from '@angular/animations';
import { KENDO_DROPDOWNLIST } from "@progress/kendo-angular-dropdowns";
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-data-binding',
  imports: [KENDO_GRID, CommonModule,GridModule, KENDO_DROPDOWNLIST, FormsModule],
  templateUrl: './data-binding.component.html',
  styleUrl: './data-binding.component.css'
})
export class DataBindingComponent implements OnInit  {
// public gridData:unknown[]=customers

constructor (private  userService:UserService, private router:Router){}
ngOnInit(): void {
  this.getAssetData()

}
public gridview!:GridDataResult
public skip=0
public pageSize=5


  
private allAssets:any[]=[]

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

public buttonCount = 2;
public sizes = [10, 20, 50];





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



}
