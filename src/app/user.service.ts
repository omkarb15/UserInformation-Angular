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
      const formData = new FormData();
    
      const finalUser = {
        FirstName: user.FirstName || user.firstName,
        SurName: user.SurName || user.surName,
        DOB: user.DOB || user.dob,
        Gender: user.Gender || user.gender,
        EmialId: user.EmialId || user.emialId,
        UserName: user.UserName || user.userName,
        PassWord: user.PassWord || user.passWord,
        HobbyId: user.HobbyId || user.hobbyId,
      };
    
      Object.entries(finalUser).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
    
      if (file) {
        formData.append("file", file);
      }
    
      return this.http.post<any>(`${this.apiurl}`, formData);
    }
    

    updateUser(user: any, file: File | null): Observable<any> {
      const formData = new FormData();
    
      const finalUser = {
        Id: user.Id || user.id,
        FirstName: user.FirstName || user.firstName,
        SurName: user.SurName || user.surName,
        DOB: user.DOB || user.dob,
        Gender: user.Gender || user.gender,
        EmialId: user.EmialId || user.emialId,
        UserName: user.UserName || user.userName,
        PassWord: user.PassWord || user.passWord,
        HobbyId: user.HobbyId || user.hobbyId,
      };
    
      Object.entries(finalUser).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
    
      if (file) {
        formData.append("file", file);
      }
    
      return this.http.put<any>(`${this.apiurl}/${finalUser.Id}`, formData);
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

getCustomerRowReorder():Observable<any>{
  return this.http.get(`http://localhost:5244/api/Trees/GetCustomerForRowReorder`)
}
updateRowOrder(customers:any[]){
  return this.http.post(`http://localhost:5244/api/Trees/Update-order`,customers)
}

getInStockProductGrid():Observable<any>{
  return this.http.get(`http://localhost:5244/api/Trees/InStockProduct`)
}
getDiscontinuedProduct():Observable<any>{
  return this.http.get(`http://localhost:5244/api/Trees/DiscontinuedProduct`)
}
updateStatus(id: number, discontinued: boolean): Observable<any> {
  debugger
  return this.http.put(`http://localhost:5244/api/Trees/UpdateForProduct/${id}`, { discontinued });

}
DeleteMultipleuserIngrid(userIds: number[]): Observable<any> {
  return this.http.post(`${this.apiurl}/DeleteUsers`, userIds);
}


  }