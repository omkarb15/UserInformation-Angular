import { Component, OnInit } from '@angular/core';

import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";


import { UserService } from '../../user.service';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { Category } from '../../../Kendo-Grid/chart-integration/model';
@Component({
  selector: 'app-pie-charts',
  imports: [],
  templateUrl: './pie-charts.component.html',
  styleUrl: './pie-charts.component.css'
})
export class PieChartsComponent implements OnInit {
  constructor(private userservice:UserService, private authservice:AuthService, private router:Router){}
  ngOnInit(): void {
    this.userservice.getPieChart().subscribe({
      next:(data:any)=>{
        console.log("Pichart Data", data)
        this.createChart(data)
        this.createDonutChart(data)
      }
    })
  }

  createChart(data:any[]){
    const root=am5.Root.new("chartDiv")
    root.setThemes([am5themes_Animated.new(root)])
  

  const Chart=root.container.children.push(
    am5percent.PieChart.new(root,{
      endAngle:270,
      layout:root.verticalLayout
    })
  )


 const series=Chart.series.push(am5percent.PieSeries.new(root,{
 
  valueField:"totalSales",
  categoryField:"category",
  endAngle:270
 }))

 series.states.create('hidden',{
  endAngle:-90
 })
 series.data.setAll(data)

  const legend=Chart.children.push(am5.Legend.new(root,{
 centerX:am5.percent(50),
    x:am5.percent(50),
//     marginTop:15,
//     marginBottom:15,
  }))
legend.data.setAll(series.dataItems)
 series.appear(1000,100)

  }


  //Donut chart

  createDonutChart(data:any[]){
    const donutRoot=am5.Root.new("DonutDiv")
    donutRoot.setThemes([am5themes_Animated.new(donutRoot)])

  const donutChart=donutRoot.container.children.push(
    am5percent.PieChart.new(donutRoot,{  
      layout:donutRoot.verticalLayout,       //stacks children top to bottom.
      innerRadius:am5.percent(50)        //This turns a normal pie chart into a donut chart.

    })
  )
  const donutSeries=donutChart.series.push(am5percent.PieSeries.new(donutRoot,{
    valueField:'totalSales',
    categoryField:'category',
    alignLabels:false           //align round the donut     
  }))

  donutSeries.labels.template.setAll({ 
    textType:'circular',                       //This tells amCharts to make text follow a circular path along the arc of each slice.
    centerX:0,
    centerY:0
  })
  donutSeries.data.setAll(data)

  const donutLegend=donutChart.children.push(am5.Legend.new(donutRoot,{
    centerX:am5.percent(50),
    x:am5.percent(50),
    marginTop:15,
    marginBottom:15,
  }))

  donutLegend.data.setAll(donutSeries.dataItems)
  donutSeries.appear(1000,100)
  }
  naviagtetoWelcome(){
  this.router.navigate(['/Welcome'])
}
}
