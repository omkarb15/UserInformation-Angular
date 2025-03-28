  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
import { UserAnswer } from './user-answer';

  @Injectable({
    providedIn: 'root'
  })
  export class UserService {
  private apiurl= "http://localhost:5244/api/Users"
    constructor(private http:HttpClient) { }

    getUsers(): Observable<any>{
      return this.http.get<any>(this.apiurl);
    }

    getHobbies(): Observable<any>{
      return this.http.get<any>("http://localhost:5244/api/hobbies")
    }
  

    createUser(user: any, file: File | null): Observable<any> {
      debugger


      // const formData = new FormData();
      // formData.append("user", user);
      const formData = new FormData();
      formData.append("FirstName", user.FirstName);
      formData.append("SurName", user.SurName);
      formData.append("DOB", user.DOB);
      formData.append("Gender", user.Gender);
      formData.append("EmialId", user.EmialId);
      formData.append("UserName", user.UserName);
      formData.append("PassWord", user.PassWord);
      formData.append("HobbyId", user.HobbyId);
    
      if (file) {
        formData.append("file", file);
      }
    
      return this.http.post<any>(`${this.apiurl}`, formData);
    }
    

    updateUser( user: any, file: File | null): Observable<any> {
      debugger
      const formData = new FormData();
          formData.append("Id", user.id);
      formData.append("FirstName", user.FirstName);
      formData.append("SurName", user.SurName);
      formData.append("DOB", user.DOB);
      formData.append("Gender", user.Gender);
      formData.append("EmialId", user.EmialId);
      formData.append("UserName", user.UserName);
      formData.append("PassWord", user.PassWord);
      formData.append("HobbyId", user.HobbyId);

      if (file) {
        formData.append("file", file);
      }

    

      return this.http.put<any>(`${this.apiurl}/${user.id}`, formData);
  }

    

    deleteUser(id:number): Observable<any>{
      return this.http.delete<any>(`${this.apiurl}/${id}`)
    }
    login(credentials: any): Observable<any> {
      debugger
      return this.http.post<any>(`${this.apiurl}/Login`, credentials);
    }
    GetQuestions(gender:string):Observable<any> {
      return this.http.get<any>(`${this.apiurl}/GetQuestions/${gender}`)

    }
    
    SubmitAnswer(answer: UserAnswer[]): Observable<any> {
      return this.http.post<any>(`${this.apiurl}/SubmitAnswer`, answer, {
       
      });

      
    }
  


    UserAnswer( userId:number):Observable<any>{
      return this.http.get<any>(`${this.apiurl}/GetUserAns/${userId}`)
    }


    GetQuestion():Observable<any>{
      return this.http.get<any>(`${this.apiurl}/QuestionOpt`)

    }
    SubmitOptionAnswer(answers:any):Observable<any>{
      return this.http.post<any>(`${this.apiurl}/UserAnswers`,answers)

    } 
    getUserans(userId:number):Observable<any>{
      return this.http.get<any>(`${this.apiurl}/GetAnswithOption/${userId}`)

    }
    

    GetTreeData():Observable<any>{
      return this.http.get<any>("http://localhost:5244/api/Trees/GetTreeData")
    }

    addNewNode(node:any):Observable<any>{
      return this.http.post<any>("http://localhost:5244/api/Trees/AddNewNode", node)
    }
    updateNode(nodeId: number, updatedNode: any): Observable<any> {
      return this.http.put(`http://localhost:5244/api/Trees/${nodeId}`, updatedNode);
    }
    deleteSelectedNode(nodeId:number):Observable<any>{
      return this.http.delete(`http://localhost:5244/api/Trees/${nodeId}/DeleteNode`)
    }
    getTreeDragDropByTreeviewId(treeviewId:number):Observable<any>{
      return this.http.get(`http://localhost:5244/api/Trees/${treeviewId}/GetTreeDragDrop`)
    }
    
    UpdateDragAndDrop(id:number,parentId:number|null,treeViewId:number):Observable<any>{
      return this.http.put(`http://localhost:5244/api/Trees/DragAndDrop`,{id,parentId,treeViewId})
    }

  getCheckBoxTree():Observable<any>{
    return this.http.get(`http://localhost:5244/api/Trees/GetCheckBoxTree`)
  }
updateIschecked(node:any):Observable<any>{
  return this.http.put(`http://localhost:5244/api/Trees/ChangeIschecked`,node)
}



  }