import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-info-with-flyer',
  imports: [],
  templateUrl: './user-info-with-flyer.component.html',
  styleUrl: './user-info-with-flyer.component.css'
})
export class UserInfoWithFlyerComponent implements OnInit {
  constructor(private userservice:UserService, private roter:Router){}
 public gridData:any[]=[]
 public formGroup!:FormGroup

  ngOnInit(): void {
    
  }

getAssetData(){
  this.userservice.getUsers().subscribe((data)=>{
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



}
