import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-question-option',
  imports: [CommonModule ,FormsModule],
  templateUrl: './question-option.component.html',
  styleUrl: './question-option.component.css'
})
export class QuestionOptionComponent  implements OnInit{
  questions:any[]=[]
  userId:any
  userAnswers: { questionId: number, optionId:number }[] = [];

  
 constructor(private userService: UserService, private router: Router) {
  this.userId = (localStorage.getItem("userId"))
 }
  
    

ngOnInit(): void {
  this.loadQuestion()
  this.getUserans()
  
}

 loadQuestion(){
  debugger
  this.userService.GetQuestion().subscribe({
    next:(data:any)=>{
      this.questions=data;
      console.log("Question", this.questions)
    


    },
    error: (err) => {
      console.error("Error fetching questions:", err);
    }
  })
 }
 submitAnswers() { 
  debugger
  const answers = this.questions.map(q => ({
    userId: this.userId,
    questionId: q.questionId,
    optionId: this.userAnswers[q.questionId] // gets the selected optionId
  })).filter(ans => ans.optionId !== undefined); // Remove unanswered questions

  if (answers.length === 0) {
    alert("Please select answers before submitting.");
    return;
  }

 this.userService.SubmitOptionAnswer(answers).subscribe({
  
  next:(response:any)=>{
    console.log("Response", response)

  }
  
 })
 alert("Anwers Submit Successfully")

}
getUserans(){
  debugger
  this.userService.getUserans(this.userId).subscribe({
    next:(Data:any)=>{
      console.log("Data: ", Data)

      Data.forEach((answer: any) => {
        this.userAnswers[answer.questionId]=answer.optionId
        
      });
    }
  })
}

}
