import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import * as am5 from "@amcharts/amcharts5";
import * as am5flow from "@amcharts/amcharts5/flow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
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
  }

  createChart(data:any[]){
    const root =am5.Root.new("ChartDiv")
    root.setThemes([am5themes_Animated.new(root)])

    const chart=root.container.children.push(
      am5flow.Sankey.new(root,{
        sourceIdField:'from',
        targetIdField:'to',
        valueField:'value',
        paddingRight:150,
        minSize:0.03,
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
          centerX:am5.percent(50),
          textAlign:"center",
          populateText:true
        })

      })
    })
  

    chart.nodes.get("colors")?.set("step",2)  //This retrieves the Color Set used by the nodes. amCharts automatically assigns colors from a color set to each node unless you manually set them.
   chart.data.setAll(data)                     // color set to skip 1 color between each node, using every second color from the palette.
   chart.appear(1000,100)  }


} 
