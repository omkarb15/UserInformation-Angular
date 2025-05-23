import { Component, NgZone, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { ChartModule } from '@progress/kendo-angular-charts';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
@Component({
  selector: 'app-xychart',
  imports: [ChartModule],
  templateUrl: './xychart.component.html',
  styleUrl: './xychart.component.css'
})
export class XYChartComponent implements OnInit {

  constructor(private userService:UserService, private router:Router, private authservice:AuthService, private zone:NgZone){}
  private barRoot!: am5.Root
  
  ngOnInit(): void {
    debugger
    this.getData()
  }
    getData(){
      debugger
    this.userService.getSalesData().subscribe({
      next:(data:any)=>{
     console.log("SalesData", data)
     this.zone.runOutsideAngular(()=>{
      this.createChart(data)
     })
      }
    })
    }

    createChart(data:any[]){
    this.barRoot=am5.Root.new("barChartDiv")

    const barChart=this.barRoot.container.children.push(
      am5xy.XYChart.new(this.barRoot,{
        panX:true,
        panY:true,
        wheelX:"panX",
        wheelY:"zoomX",
          maxTooltipDistance: 0
      })

    )
let xAxis = barChart.xAxes.push(am5xy.CategoryAxis.new(this.barRoot, {
  categoryField: "month",
  renderer: am5xy.AxisRendererX.new(this.barRoot, {}),
  bullet: function (root, axis, dataItem) {
    return am5xy.AxisBullet.new(root, {
      location: 0.5,
      sprite: am5.Circle.new(root, {
        radius: 5,
        fill: am5.color(0xff0000)
      })
    });
  }
}));
  const yAxis=barChart.yAxes.push(
    am5xy.ValueAxis.new(this.barRoot,{
      renderer:am5xy.AxisRendererY.new(this.barRoot,{})
    })
  )
  const barSeries=barChart.series.push(
    am5xy.ColumnSeries.new(this.barRoot,{
      name:'Bar Series',
      xAxis:xAxis,
      yAxis:yAxis,
      valueYField:'revenue',
      categoryXField:"month",
   stacked: true,
    stroke: am5.color(0x095256),
    tooltip:am5.Tooltip.new(this.barRoot,{
      labelText:"[bold]{name}[/]\n{categoryX}:{valueY}"
    })
    })
  )
  xAxis.set("tooltip", am5.Tooltip.new(this.barRoot, {}));   //axis tooltips
  yAxis.set("tooltip", am5.Tooltip.new(this.barRoot, {}));

    let yRenderer = yAxis.get("renderer");   //The renderer handles how the axis is visually drawn (lines, ticks, grid, labels, etc).
     yRenderer.grid.template.setAll({      //is the template used to style all grid lines on the Y-axis.
     stroke: am5.color(0xFF0000),
      strokeWidth: 2
    });
  
    let yRenderer2 = yAxis.get("renderer");
    yRenderer2.labels.template.setAll({
    fill: am5.color(0xFF0000),
     fontSize: "1.5em"
    });
     

     barChart.children.push(am5.Label.new(this.barRoot, {
    text: "Revenue By Month",                                 //custom label to chart
     fontSize: 25,
     centerX: am5.p50,
     x: am5.p50,
     y: 0
    }));

    yAxis.axisHeader.children.push(am5.Label.new(this.barRoot, {
    text: "Value",
    fontWeight: "600"
    }));

     barChart.set("cursor", am5xy.XYCursor.new(this.barRoot, {
       behavior: "zoomX"
     }));   //set the cursor on chart
     let legend = barChart.children.push(am5.Legend.new(this.barRoot, {}));
    legend.data.setAll(barChart.series.values);

var heatLegend = barChart.children.push(
  am5.HeatLegend.new(this.barRoot, {
    orientation: "vertical",
    startColor: am5.color(0xff621f),
    endColor: am5.color(0x661f00),
    startText: "Lowest",
    endText: "Highest",
    stepCount: 10,
    y: am5.p50,
    centerY: am5.p50,
    x: am5.percent(100),
    centerX: am5.percent(100),
    marginRight: 30
  })
);

let scrollbarX = am5xy.XYChartScrollbar.new(this.barRoot, {
  orientation: "horizontal",
  height: 50
});

barChart.set("scrollbarX", scrollbarX);

  xAxis.data.setAll(data)     //	Tells the chart which labels to show on the X-axis (categories like months).
  barSeries.data.setAll(data);   //tells the chart what data to draw as bars (revenue per month).
 
  }
naviagtetoWelcome(){
  this.router.navigate(['/Welcome'])
}

}
