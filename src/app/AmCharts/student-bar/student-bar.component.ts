import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { CreateFormGroupArgs, GridDataResult, GridModule, KENDO_GRID } from '@progress/kendo-angular-grid';
import { Category } from '../../../Kendo-Grid/chart-integration/model';
import { count } from 'rxjs';

@Component({
  selector: 'app-student-bar',
  imports: [KENDO_GRID , GridModule],
  templateUrl: './student-bar.component.html',
  styleUrl: './student-bar.component.css'
})
export class StudentBarComponent implements OnInit {

  constructor(private userservice:UserService, private router:Router){}

  public gridData:any[]=[]
  public allStudents: any[] = [];


  ngOnInit(): void {
    this.userservice.getStudentData().subscribe({
      next:(data:any)=>{
        console.log("Student Data", data)
        this.allStudents=data
        this.gridData=data

        
      }
    })
 
    this.userservice.getStudentBucket().subscribe({
      next:(Bucket:any)=>{
        console.log("StudentBucketData", Bucket)
        this.CreateChart(Bucket)

      }
    })
 

  }

  CreateChart(data:any[]){ 
    debugger
    const root=am5.Root.new("ChartDiv")
   root.setThemes([am5themes_Animated.new(root)])


   const chart=root.container.children.push(
    am5xy.XYChart.new(root,{
      panY:true,
      wheelX:'panX',
      wheelY:'zoomX',
      layout:root.verticalLayout
    })
   )

   chart.set("scrollbarX", am5.Scrollbar.new(root,{
    orientation:"horizontal"
   }))
   const xAxis=chart.xAxes.push(am5xy.CategoryAxis.new(root,
    {
      categoryField:'category',
      renderer:am5xy.AxisRendererX.new(root,{
        minorGridEnabled:true
      }),
      tooltip:am5.Tooltip.new(root,{})
    }
   ))
   xAxis.data.setAll(data)

  const yAxis=chart.yAxes.push(am5xy.ValueAxis.new(root,{
    renderer:am5xy.AxisRendererY.new(root,{
      strokeOpacity:0.1
    }),
    min:0,             //Ensures the Y-axis starts at 0.
    numberFormat:"#",  // Ensures no decimal places (whole numbers only).
    strictMinMax:true,  // Prevents automatic scaling to decimal ranges.
    maxPrecision:0       //revents showing floating-point values.
  }))

  const legend=chart.children.push(am5.Legend.new(root,{
    centerX:am5.p50,
    x:am5.p50
  }))

  const series=chart.series.push(am5xy.ColumnSeries.new(root,{

    name:"students",              //this label is use for legend
    xAxis:xAxis,
    yAxis:yAxis,
    valueYField:"count",
    categoryXField:"category"
  }))
series.data.setAll(data)
legend.data.push(series)

series.columns.template.setAll({
  cursorOverStyle:"pointer",         //This sets the mouse cursor to a pointer ( like a hand)
  interactive:true,               //This tells AmCharts to make the columns able to detect and respond to events, like:
    tooltipText: "{category}: {valueY}"           
}) 

series.columns.template.events.on("click", (ev) => { 
  debugger                                           //template allows us to apply common settings or events to all columns.
  const category = ev.target.dataItem?.dataContext as { category: string };// ev Stands for event object.events.on("click", events.on("click", This attaches an event listener to each column (ba
                                                      // dataContext This contains the original data object (e.g., { category: "35-60", count: 14 })
  if (!category) return;

  const [minStr, maxStr] =category.category.split("-");   //The first category is the variable you just got from dataContext.The second category is the string like "35-60".
                                                             //Splits the string on the dash (-) into two parts:

  const min = Number(minStr);
  const max = Number(maxStr);

  this.gridData = this.allStudents.filter(student => student.marks >= min && student.marks <= max);
});

  
 chart.appear(1000,100)
  }
  resetGrid() {
this.gridData = this.allStudents;
}
public buttonCount = 2;
public sizes = [10, 20, 50];

naviagtetoWelcome(){
  this.router.navigate(['/Welcome'])
}
}
  // createBucket(){
  //   debugger
  //   const buckets=[
  //     {category:"0-35", count:0, range:[0,35]},
  //     {category:"36-60", count:0, range:[36,60]},
  //     {category:"61-80", count:0, range:[61,80]},
  //     {category:"81-100", count:0, range:[81,100]},
  //   ]
  //   for (const student of this.allStudents){
  //     for(const bucket of buckets ){
  //       if(student.marks>=bucket.range[0]&& student.marks<=bucket.range[1]){
  //         bucket.count++
  //         break
  //       }
  //     }
  //   }
  //   return buckets
  // }

