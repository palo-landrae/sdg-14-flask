import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BeachLitter } from '../models/beach_litter.model';
import { ChartData } from '../models/geochart.model';

@Component({
  selector: 'app-beach-litter-chart',
  templateUrl: './beach-litter-chart.component.html',
  styleUrls: ['./beach-litter-chart.component.css']
})
export class BeachLitterChartComponent implements OnInit {
  obsBeachLitter: Observable<BeachLitter[]>;
  chartDataArray = new Array<ChartData>();
  chartTitle: string;
  chartType: string;
  chartData = [];
  chartColumns = [];
  chartOptions: object;

  constructor(public http: HttpClient) { 
    this.chartOptions = {
      width: 720,
      height: 480,
      chartArea: { left: 10, top: 10, bottom: 0, height: '100%' },
      displayMode: 'regions',
      colorAxis: {
        colors: [
          '#F7FCFD',
          '#E0ECF4',
          '#BED3E7',
          '#9FBCDB',
          '#8D96C7',
          '#8D6BB0',
          '#88419D',
          '#6F016A',
        ]
      },
      legend: 'none',
      tooltip: {
        isHtml: true,
      },
    };
    this.chartColumns = [
      'State',
      'EN_MAR_BEALITSQ',
      { role: 'tooltip', type: 'string', p: { html: true } },
    ];
    this.chartType = 'GeoChart';
    this.chartTitle = 'EN_MAR_BEALITSQ';
  }

  prepareBeachLitterData = (data: BeachLitter[]) => {
    console.log(data);
    for (var i in data) {
      this.chartData.push([
        data[i]['Entity'],
        Math.log(parseInt(String(data[i]['EN_MAR_BEALITSQ']))),
        `
        <div>
        <h4 style="color: #6F016A;">${parseInt(
          String(data[i]['EN_MAR_BEALITSQ'])
        ).toLocaleString('de-DE')} plastic items per square km </h4>
        <p style="margin-top: -12px">${String(data[i]['Year'])}</p>
        </div>
        `,
      ]);
    }
    this.chartDataArray.push(new ChartData('EN_MAR_BEALITSQ', 'GeoChart', this.chartData, this.chartColumns, this.chartOptions));
    console.log(this.chartDataArray)
  };
  ngOnInit(): void {
    this.obsBeachLitter = this.http.get<BeachLitter[]>(
      'http://127.0.0.1:5000/beach_litter'
    );
    this.obsBeachLitter.subscribe(this.prepareBeachLitterData);
  }

}
