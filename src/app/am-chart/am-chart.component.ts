import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5flow from "@amcharts/amcharts5/flow";

@Component({
  selector: 'app-am-chart',
  standalone: true,
  templateUrl: './am-chart.component.html',
  styleUrls: ['./am-chart.component.css']
})
export class AmChartComponent implements AfterViewInit, OnDestroy {
  private pieRoot!: am5.Root;
  private barRoot!: am5.Root;    //! “I promise that these variables will definitely be assigned a value before they are used — even though it doesn't look like it right now.”
  private sankeyRoot!: am5.Root;

  ngAfterViewInit(): void {       //We use **ngAfterViewInit()** for charts like amCharts because the charting library needs access to the DOM elements (e.g., <div> containers) where the charts will be rendered.


    setTimeout(() => {              
      const data = [
        { category: "A", value: 50 },
        { category: "B", value: 70 },
        { category: "C", value: 40 }
      ];

      // === PIE CHART ===
      this.pieRoot = am5.Root.new("piechartdiv");
    const piechart = this.pieRoot.container.children.push(
  am5percent.PieChart.new(this.pieRoot, {
    layout: this.pieRoot.verticalLayout
  })
);

      const pieSeries = piechart.series.push(
        am5percent.PieSeries.new(this.pieRoot, {
          name: 'series',
          valueField: 'value',
          categoryField: 'category'
        })
      );
      pieSeries.data.setAll(data);

      const pieLegend = piechart.children.push(
        am5.Legend.new(this.pieRoot, {
          centerX: am5.percent(50),
          x: am5.percent(50),
          layout: this.pieRoot.verticalLayout
        })
      );
      pieLegend.data.setAll(pieSeries.dataItems);
      pieLegend.labels.template.set("text", "{category}");




      // BAR CHART       
      this.barRoot = am5.Root.new("barChartDiv");

      const barChart = this.barRoot.container.children.push(  //this.barRoot.container is the main container where all chart elements live.
                                                                // is a list of display elements (components/widgets).
      am5xy.XYChart.new(this.barRoot, {       //This is a constructor for a new XY chart.
          panX: true,                        //	Enables horizontal panning (drag left/right)
          panY: true,                         //	Enables vertical panning (drag up/down)
          wheelX: "panX",
          wheelY: "zoomX"
        })
      );

      const xAxis = barChart.xAxes.push(
        am5xy.CategoryAxis.new(this.barRoot, {
          maxDeviation: 0.3,
          categoryField: "category",
          renderer: am5xy.AxisRendererX.new(this.barRoot, {})
        })
      );
      const yAxis = barChart.yAxes.push(
        am5xy.ValueAxis.new(this.barRoot, {
          renderer: am5xy.AxisRendererY.new(this.barRoot, {})
        })
      );
      const barSeries = barChart.series.push(
        am5xy.ColumnSeries.new(this.barRoot, {
          name: "Bar Series",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          categoryXField: "category"
        })
      );
      xAxis.data.setAll(data);
      barSeries.data.setAll(data);
      const barLegend = barChart.children.push(
        am5.Legend.new(this.barRoot, {
          centerX: am5.percent(50),
          x: am5.percent(50),
          layout: this.barRoot.horizontalLayout
        })
      );
      barLegend.data.setAll(barChart.series.values);

      // === SANKEY CHART ===
      this.sankeyRoot = am5.Root.new("sankeyDiv");

      const sankeyChart = this.sankeyRoot.container.children.push(
        am5flow.Sankey.new(this.sankeyRoot, {
          sourceIdField: "from",
          targetIdField: "to",
          valueField: "value",
          orientation: "horizontal" // ✅ For a traditional flow
        })
      );

      const sankeyData = [
  { from: "A", to: "B", value: 10 },
  { from: "B", to: "C", value: 10 },
  { from: "E", to: "D", value: 10 },
  { from: "D", to: "F", value: 10 },
  { from: "F", to: "B", value: 10 },
  { from: "F", to: "G", value: 10 },
  { from: "G", to: "H", value: 10 },
  { from: "I", to: "F", value: 10 },
  { from: "J", to: "H", value: 10 },
  { from: "H", to: "O", value: 10 },
      ];

      sankeyChart.data.setAll(sankeyData);
    }, 0);
  }

  ngOnDestroy(): void {
    this.pieRoot?.dispose();
    this.barRoot?.dispose();
    this.sankeyRoot?.dispose();
  }
}
