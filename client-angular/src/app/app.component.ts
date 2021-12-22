import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BeachLitter } from './models/beach_litter.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'client-angular';
  obsBeachLitter: Observable<BeachLitter[]>;
  chartDataArray = new Array<ChartData>();
  myData = [];
  chartType: string;
  options: {};
  formatters: {};
  columns = [];
  constructor(public http: HttpClient) {
    this.options = {
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
        ],
        /*values: [
          0,
          6.9077,
          9.2103,
          11.5129,
          13.8155,
          16.1180,
          18.4206,
          20.7232,
        ],*/
      },
      legend: 'none',
      tooltip: {
        isHtml: true,
      },
    };
    this.formatters = {
      number: [
        {
          columnNum: 1,
          pattern: '$ #,##0.00',
        },
      ],
    };
  }

  prepareBeachLitterData = (data: BeachLitter[]) => {
    console.log(data);
    for (var i in data) {
      this.myData.push([
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
    this.columns = [
      'State',
      'EN_MAR_BEALITSQ',
      { role: 'tooltip', type: 'string', p: { html: true } },
    ];
    this.chartDataArray.push(new ChartData('EN_MAR_BEALITSQ', 'GeoChart', this.myData, this.columns));
  };

  ngOnInit() {
    this.obsBeachLitter = this.http.get<BeachLitter[]>(
      'http://127.0.0.1:5000/beach_litter'
    );
    this.obsBeachLitter.subscribe(this.prepareBeachLitterData);
  }
}

export class ChartData {
  constructor(public title, public type, public data, public columns) {}
}
