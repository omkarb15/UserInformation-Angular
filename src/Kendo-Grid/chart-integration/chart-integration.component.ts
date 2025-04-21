import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { sampleData } from './sample-data';
import { Items } from './model';
import {
  ChartWizardDataRow,
  getWizardDataFromGridSelection,
  KENDO_CHARTWIZARD,
} from "@progress/kendo-angular-chart-wizard";
import { chartColumnClusteredIcon } from '@progress/kendo-svg-icons';
import { SortDescriptor } from '@progress/kendo-data-query';
import { SelectableSettings } from '@progress/kendo-angular-grid';  // Correct import for Grid

import { GridComponent, KENDO_GRID } from '@progress/kendo-angular-grid';
@Component({
  selector: 'app-chart-integration',
  imports: [KENDO_CHARTWIZARD, KENDO_GRID, ],
  templateUrl: './chart-integration.component.html',
  styleUrl: './chart-integration.component.css'
})
export class ChartIntegrationComponent {
public data: Items[]=sampleData
public wizardData!: ChartWizardDataRow[];
public wizardVisible=false
public chartColumnClusteredIcon=chartColumnClusteredIcon
public sort: SortDescriptor[]=[{field:'price', dir:"desc"}]

constructor(private cdr:ChangeDetectorRef){}
public mySelection: { itemKey: any; columnKey: number }[] = [
  { itemKey: "2", columnKey: 0 },
  { itemKey: "2", columnKey: 1 },
  { itemKey: "2", columnKey: 2 },
  { itemKey: "2", columnKey: 3 },
  { itemKey: "6", columnKey: 0 },
  { itemKey: "6", columnKey: 1 },
  { itemKey: "6", columnKey: 2 },
  { itemKey: "6", columnKey: 3 },
  { itemKey: "4", columnKey: 0 },
  { itemKey: "4", columnKey: 1 },
  { itemKey: "4", columnKey: 2 },
  { itemKey: "4", columnKey: 3 },
  { itemKey: "5", columnKey: 0 },
  { itemKey: "5", columnKey: 1 },
  { itemKey: "5", columnKey: 2 },
  { itemKey: "5", columnKey: 3 },
];
public selectionKey = "ID";
public selectionSettings: SelectableSettings = {
  cell: true,
  drag: true,
  mode: "multiple",
};

get hasSelection(): boolean {
  return this.mySelection.length > 0;
}

@ViewChild(GridComponent) public grid!: GridComponent;

ngAfterViewInit() {
  this.wizardData = getWizardDataFromGridSelection({
    grid: this.grid,
    data: this.data,
    selectedKeys: this.mySelection,
    selectionKey: this.selectionKey,
  });

  this.cdr.detectChanges();
}

}
