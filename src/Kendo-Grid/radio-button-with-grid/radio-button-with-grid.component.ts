import { Component, OnInit } from '@angular/core';
import { UserService } from '../../app/user.service';
import { Router } from '@angular/router';
import { GridModule, KENDO_GRID } from '@progress/kendo-angular-grid';
import { FormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { CommonModule } from '@angular/common';
import { LabelModule } from "@progress/kendo-angular-label";
import { LoaderModule, LoaderType } from '@progress/kendo-angular-indicators';

@Component({
  selector: 'app-radio-button-with-grid',
  imports: [KENDO_GRID, GridModule,FormsModule ,InputsModule,LoaderModule, CommonModule, LabelModule],
  templateUrl: './radio-button-with-grid.component.html',
  styleUrl: './radio-button-with-grid.component.css'
})
export class RadioButtonWithGridComponent implements OnInit {
userId:any
questions:any[]=[]
public Loading:boolean=true
public loadertype:LoaderType='pulsing'
userAnswers: { [key: number]: number } = {}; // key: questionId, value: optionId

 constructor(private userService: UserService, private router: Router) {
  this.userId = (localStorage.getItem("userId"))
 }
  ngOnInit(): void {
    this.loadQuestion()
    this.getUserans()
  }

  loadQuestion(){
    this.Loading=true
    debugger
    this.userService.GetQuestion().subscribe((data)=>{
      this.questions=data
      console.log("Questions", this.questions)

    })
    setTimeout(() => {
      this.Loading=false
    }, 1500);
  
  }
  submitAnswers() {
    debugger
    const answers = this.questions.map(q => ({
      userId: this.userId,
      questionId: q.questionId,
      optionId: this.userAnswers[q.questionId]
    })).filter(ans => ans.optionId !== undefined);             //only answered questions are included in the answers array.


  
    if (answers.length === 0) {
      alert("Please select answers before submitting.");
      return;
    }
  
    this.userService.SubmitOptionAnswer(answers).subscribe({
      next: (response: any) => {
        console.log("Response", response);
        alert("Answers submitted successfully!")
      },
      error: (error) => {
        console.error("Submit failed:", error)
        alert("Error submitting answers.");
      }
    });
  }
  getUserans() {
    debugger
    this.userService.getUserans(this.userId).subscribe({
      next: (Data: any) => {
        console.log("Data: ", Data)
        Data.forEach((answer: any) => {
          this.userAnswers[answer.questionId] = answer.optionId;
        });
      }
    });
  }
  navigateToWelcomePage(){
    this.router.navigate(['/Welcome'])
    }
    OnLogout() {
      localStorage.clear();
      this.router.navigate(['/Login']);
    }

}
