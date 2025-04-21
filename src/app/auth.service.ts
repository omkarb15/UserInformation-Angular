import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  saveToken(token:string):void{
    localStorage.setItem('token', token)

  }

getToken():string|null{
return localStorage.getItem('token')
}
isloggedIn():boolean{
  return this.getToken()!==null

}
logout(){
  localStorage.removeItem('token')
}

}
