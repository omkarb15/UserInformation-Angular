import { Component, numberAttribute, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export class QuestionsComponent implements OnInit {
  questions: any[] = [];
  userAnswers: {[questionId: number]:string[]}={}
  gender: any;
  totalAnswered: number = 0;
 
  userId:any;
  answerlist:any[]=[]

  constructor(private userservice: UserService, private router: Router) {
    this.gender= localStorage.getItem("gender")
    
    console.log("gender:",this.gender)
    
    this.userId = Number(localStorage.getItem("userId"))
    console.log("userId", this.userId)
  }

  ngOnInit(): void {
    this.getquestion()
  
  }

  getquestion() {
    debugger
    this.userservice.GetQuestions(this.gender).subscribe({
      
      next: (data: any) => {
        this.questions = data;
        console.log("questionText", this.questions);
        this.userAnswers ={}           // reset answer
        this.questions.forEach(q=>{    // each question start with an empty array
          this.userAnswers[q.id]=['']
        })
        

  
        this.userservice.UserAnswer(this.userId).subscribe({ 
          next: (response: any) => {
            debugger
            console.log("Previous Answers:", response);
            this.totalAnswered = response.totalAnswered;
         
            // Mapping previous answers to userAnswers object
            response.answers.forEach((answer: any) => {
             
              this.userAnswers[answer.questionId].push(answer.answerText);
            });
          },
        });
      },
      error: (error) => {
        console.log("Error fetching questions:", error);
      }
    });
  }
  

submitAnswer(){

  this.answerlist=[];

  Object.keys(this.userAnswers).forEach(questionId => { 


      debugger
      this.userAnswers[Number(questionId)].forEach(answerText => {
        debugger
        if (answerText.trim() !== '') {
          debugger
          this.answerlist.push({
            userId: this.userId,
            questionId: Number(questionId),
            answerText: answerText
          });
        }
      });
    
  });
  

 
 

  this.userservice.SubmitAnswer(this.answerlist).subscribe({
    next:(response:any)=>
       {console.log("Response", response)
 
  this.totalAnswered=response.totalAnswered
  alert("Answers Submitted Successfully")

    },
    
    
    error:(error)=> console.log("error", error)

  })

 
 
  


}

addanswer(questionId:number){

  this.userAnswers[questionId].push('')

}

removeanswer(questionId:number, index:number){
debugger
  this.userAnswers[questionId].splice(index, 1)

}
trackByIndex(index: number, obj: any): any {
  return index;
}


 OnLogin(){
  this.router.navigate(['/Login'])
 }




  
  }
