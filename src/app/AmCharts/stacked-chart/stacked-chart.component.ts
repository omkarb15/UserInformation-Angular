import { Component, NgZone, OnInit } from '@angular/core';
import { ChartModule } from '@progress/kendo-angular-charts';
import { UserService } from '../../user.service';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

@Component({
  selector: 'app-stacked-chart',
  imports: [ChartModule],
  templateUrl: './stacked-chart.component.html',
  styleUrl: './stacked-chart.component.css'
})
export class StackedChartComponent implements OnInit {


  constructor(private userservice:UserService ,private router:Router , private authservice:AuthService, private zone:NgZone){}
  ngOnInit(): void {
    this.userservice.getStackedChart().subscribe({
      next:(data:any)=>{
        console.log("Stacked Chart Data", data)
      }
    })
    this.getStackedChartDto()
  }
 getStackedChartDto(){
  this.userservice.getStackchartDto().subscribe({
    next:(Data:any)=>{
      console.log("StackedChartDtos Data", Data)
      this.createChart(Data)
      this.createBarChart(Data)
    }
  })
 }

 createChart(data:any[]){ 
  debugger
 const root=am5.Root.new("chartDiv")
 root.setThemes([am5themes_Animated.new(root)]) //A theme can control chart colors, fonts, animations, padding, etc.

const chart= root.container.children.push(   //creates a new XY chart (i.e., a chart with X and Y axes like a column, bar, or line chart) and adds it to the root container so it appears inside the chartDiv.
  am5xy.XYChart.new(root,{                     // .children is a list of all components inside the container.
    panY:true,
    wheelX:'panX',
    wheelY:'zoomX',
    layout:root.verticalLayout
  })
)
chart.set("scrollbarX", am5.Scrollbar.new(root,{
  orientation:"horizontal"
}))
 
const xAxis=chart.xAxes.push(am5xy.CategoryAxis.new(root,{  //This is a class provided by amCharts 5 for creating a Category Axis on a chart.
  categoryField:"region",
  renderer:am5xy.AxisRendererX.new(root,{  //This defines how the axis will be rendered visually.
    minorGridEnabled:true             //This defines how the axis will be rendered visually.
  }), 
  tooltip:am5.Tooltip.new(root,{})     //Adds a tooltip that appears when hovering over X-axis categories
}))
xAxis.data.setAll(data);   //This binds the data array to the X-axis.The X-axis uses the "region" field from this data to display categories.


  const yAxis=chart.yAxes.push(am5xy.ValueAxis.new(root,{
   min:0,
    max:100,
    numberFormat:"#'%'",     //ormats the Y-axis labels to display as percentages.For example, 50 will be shown as 50%.
    strictMinMax:true,       //Ensures that min and max values are strictly followed.
    calculateTotals:true,     //Enables the chart to calculate total values per category.
    renderer:am5xy.AxisRendererY.new(root,{
        strokeOpacity:0.1       //Makes the axis line very light and subtle, almost invisible (10% opacity).
    })
  
  }))

  const legend=chart.children.push(am5.Legend.new(root,{
    centerX:am5.p50,
    x:am5.p50
  }))

  
  function makeSeries(name:string, field:string){
    const series=chart.series.push(am5xy.ColumnSeries.new(root,{
      name:name,         //The name shown in the legend and tooltips.
      stacked:true,      //Enables stacking of this series on top of others in the same category
      xAxis:xAxis,       //inks the series to the previously defined category (X) and value (Y) axes.
      yAxis:yAxis, 
      valueYField:field,     //This tells the chart which key in the data object contains the Y-axis value for this series.
      valueYShow:"valueYTotalPercent",
      categoryXField:"region"


    }))
    series.columns.template.setAll({   //series.columns is a container holding the visual elements (the columns or bars) of the series.
      tooltipText:"{name},{categoryX}:{valueYTotalPercent.formatNumber('#.#')}%", 
      tooltipY:am5.percent(10)  //he template is a reusable prototype for all columns in this series.

    })
    series.bullets.push(()=>
      am5.Bullet.new(root,{
        sprite:am5.Label.new(root,{
      text: "{valueYTotalPercent.formatNumber('#.#')}%",
          fill:root.interfaceColors.get("alternativeText"),
          centerX:am5.p50,
          centerY:am5.p50,
          populateText: true   //Without this, the label would literally display {valueYTotalPercent} as plain text, not the actual value.



        })
      })
    ) 
    series.data.setAll(data)  //This line binds your data to the current series.data is the array of objects you passed to the chart 
   series.appear(1000)        //Instead of suddenly showing bars, this adds a fade/slide animation.
    legend.data.push(series)   //Adds the current series to the chart legend.

  }
  const productKeys = Object.keys(data[0]).filter(key => key !== 'region');
    productKeys.forEach(product => {
      makeSeries(product, product);
    });
console.log("Product Keys:", productKeys);

    chart.appear(1000, 100);

 }





////BarChart


 createBarChart(data:any[]){
  const barRoot=am5.Root.new("barDiv")

  const mytheme=am5.Theme.new(barRoot)
 mytheme.rule('Grid',["base"]).setAll({
  strokeOpacity:0.1
 })


  barRoot.setThemes([am5themes_Animated.new(barRoot),mytheme])


  const barChart=barRoot.container.children.push(
    am5xy.XYChart.new(barRoot,{
     panX:false,
     panY:false,
     wheelX:"panY",
     wheelY:'zoomY',
     paddingLeft:0,
     layout:barRoot.verticalLayout,

    })
  )

  barChart.set("scrollbarY",am5.Scrollbar.new(barRoot,{
    orientation:'vertical'
  }))
const yRenderer=am5xy.AxisRendererY.new(barRoot,{})
  const yAxis=barChart.yAxes.push(am5xy.CategoryAxis.new(barRoot,{
    categoryField:'region',
    renderer:yRenderer,
    tooltip:am5.Tooltip.new(barRoot,{})
  }))
  yRenderer.grid.template.setAll({
    location:1
  })
  yAxis.data.setAll(data)


 const xAxis=barChart.xAxes.push(am5xy.ValueAxis.new(barRoot,{
  min:0,
  maxPrecision:0,
  renderer:am5xy.AxisRendererX.new(barRoot,{
    minGridDistance:40,
    strokeOpacity:0.1
  })
 }))
 let barlegend=barChart.children.push(am5.Legend.new(barRoot,{
  centerX:am5.p50,
   x: am5.p50
 }))

function makeBarSeries(name:string,fieldName:string){
  const barSeries=barChart.series.push(am5xy.ColumnSeries.new(barRoot,{
    name:name,
    stacked:true,
    xAxis:xAxis,
    yAxis:yAxis,
    baseAxis:yAxis,
    valueXField:fieldName,
    categoryYField:"region"

  }))
  barSeries.columns.template.setAll({    //{name} → Series name (e.g., "Electronics", passed when creating the series).
    tooltipText:"{name},{categoryY}:{valueX}",  // Category on Y-axis (e.g., "North", "South", etc.).
    tooltipY:am5.percent(90) //am5.percent(90) means place the tooltip 90% down the height of the bar.
  })
barSeries.data.setAll(data)

barSeries.appear()

barSeries.bullets.push(()=>
am5.Bullet.new(barRoot,{
  sprite:am5.Label.new(barRoot,{  //sprite is the actual visual content that the bullet will render on the chart
    text:'{valueX}',                 //display name on bar
    fill:barRoot.interfaceColors.get("alternativeText"),
     centerX:am5.p50,
          centerY:am5.p50,
          populateText: true 
  })
})
)
barlegend.data.push(barSeries)
}

const productkeysbar=Object.keys(data[0]).filter(key=> key !=='region')
productkeysbar.forEach(product=>{
  makeBarSeries(product,product)
})

barChart.appear(1000,100)

 }



}
