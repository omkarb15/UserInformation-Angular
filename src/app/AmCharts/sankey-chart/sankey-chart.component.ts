import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import * as am5 from "@amcharts/amcharts5";
import * as am5flow from "@amcharts/amcharts5/flow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
@Component({
  selector: 'app-sankey-chart',
  imports: [],
  templateUrl: './sankey-chart.component.html',
  styleUrl: './sankey-chart.component.css'
})
export class SankeyChartComponent implements OnInit {
  constructor(private userservice:UserService,  private router:Router){}
  ngOnInit(): void {
    this.userservice.getSankeychart().subscribe({
      next:(data:any)=>{
        console.log("sankey Data", data)
        this.createChart(data)
      }
    })

    this.userservice.getColumnLine().subscribe({
      next:(Data:any)=>{
        console.log("columnline data",Data)
        this.crateLineChart(Data)
      }
    })
  }

  createChart(data:any[]){
    const root =am5.Root.new("ChartDiv")       //root is the base/root container of your entire chart.
                                                //am5.Root.new("ChartDiv"), which ties it to an HTML element with ID "ChartDiv".
    root.setThemes([am5themes_Animated.new(root)])

    const chart=root.container.children.push(      //This is an array of all child elements (charts, shapes, labels, etc.) added to the container.
      am5flow.Sankey.new(root,{
        sourceIdField:'from',
        targetIdField:'to',
        valueField:'value',
        paddingRight:150,
        minSize:0.03,               //ensures that even the smallest visible flow in the Sankey chart has a minimum thickness (or size) relative to the full diagram.
         minHiddenValue: 1
      })
    )
   
    chart.bullets.push(function(root,series,dataItem){
      return am5.Bullet.new(root,{
        locationX:0.5,
        autoRotate:true,
        sprite:am5.Label.new(root,{
          text:"{sourceId}-{targetId}",
          fill:dataItem.get("source").get("fill"),
          centerX:am5.percent(50), //means center the element horizontally inside its container.
          textAlign:"center",
          populateText:true  //Fill in {} placeholders with data values Dynamic tooltips, labels, node names

        })

      })
    })
  

    chart.nodes.get("colors")?.set("step",2)  //This retrieves the Color Set used by the nodes. amCharts automatically assigns colors from a color set to each node unless you manually set them.
   chart.data.setAll(data)                     // color set to skip 1 color between each node, using every second color from the palette.
   chart.appear(1000,100)  
  }

crateLineChart(data2:any[]){
  const lineRoot=am5.Root.new("columnlineDiv")
  lineRoot.setThemes([am5themes_Animated.new(lineRoot)])

  const columnChart=lineRoot.container.children.push(
    am5xy.XYChart.new(lineRoot,{
      panY:false,
      panX:false,
      wheelX:'panX',
      wheelY:'zoomX',
      paddingLeft:0,
      layout:lineRoot.verticalLayout

    })
  )
 columnChart.set("scrollbarX", am5.Scrollbar.new(lineRoot,{
  orientation:"horizontal"
 }))


let xRenderer = am5xy.AxisRendererX.new(lineRoot, {
  minorGridEnabled: true,
  minGridDistance: 60
});
 const xAxis=columnChart.xAxes.push(am5xy.CategoryAxis.new(lineRoot,{
  categoryField:"year",
  renderer:xRenderer,
  tooltip:am5.Tooltip.new(lineRoot,{})
 }))
xRenderer.grid.template.setAll({
  location:1
})
xAxis.data.setAll(data2)


const yAxis=columnChart.yAxes.push(am5xy.ValueAxis.new(lineRoot,{
  min:0,
  extraMax:0.1,
  renderer:am5xy.AxisRendererY.new(lineRoot,{
    strokeOpacity:0.1
  }),
   tooltip: am5.Tooltip.new(lineRoot, {})
}))

const series1=columnChart.series.push(
  am5xy.ColumnSeries.new(lineRoot,{
    name:"Income",
    xAxis:xAxis,
    yAxis:yAxis,
    valueYField:"income",
    categoryXField:"year",
    tooltip:am5.Tooltip.new(lineRoot,{
      pointerOrientation:"horizontal",
      labelText:"{name} in {categoryX}:{valueY}"
    })
  })
)
  series1.columns.template.setAll({
    tooltipY: am5.percent(10)
  });
series1.data.setAll(data2)


let series2=columnChart.series.push(
  am5xy.LineSeries.new(lineRoot,{
    name:"Expenses",
    xAxis:xAxis,
    yAxis:yAxis,
    valueYField:"expenses",
    categoryXField:"year",
    tooltip:am5.Tooltip.new(lineRoot,{
     pointerOrientation:"horizontal",
     labelText:"{name} in {categoryX}:{valueY}"
    })

  })
)
series2.strokes.template.setAll({
    strokeWidth: 3
  });


series2.bullets.push(function () {
  return am5.Bullet.new(lineRoot, {
    sprite: am5.Circle.new(lineRoot, {
      strokeWidth: 3,
      stroke: series2.get("stroke"),
      radius: 5,
      fill: lineRoot.interfaceColors.get("background")
    })
  });
});
series2.data.setAll(data2)

let legend = columnChart.children.push(
  am5.Legend.new(lineRoot, {
    centerX: am5.p50,
    x: am5.p50
  })
);
columnChart.set("cursor", am5xy.XYCursor.new(lineRoot, {}));

legend.data.setAll(columnChart.series.values)
columnChart.appear(1000, 100);
series1.appear();

}

naviagtetoWelcome(){
  this.router.navigate(['/Welcome'])
}

} 
