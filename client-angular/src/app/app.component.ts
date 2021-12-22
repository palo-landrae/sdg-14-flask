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
  constructor(public http: HttpClient) {
    this.options = {
      width: 720,
      height: 480,
      chartArea: { left: 10, top: 10, bottom: 0, height: '100%' },
      displayMode: 'regions',
      colorAxis: { colors: ['#e7711c', '#4374e0'] },
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
    this.myData.push(['Entity', 'EN_MAR_BEALITSQ']);
    for (var i in data) {
      this.myData.push([
        data[i]['Entity'],
        parseInt(String(data[i]['EN_MAR_BEALITSQ'])),
      ]);
    }
    let cd = new ChartData('EN_MAR_BEALITSQ', 'GeoChart', this.myData);
    this.chartDataArray.push(cd);
  };

  ngOnInit() {
    this.obsBeachLitter = this.http.get<BeachLitter[]>(
      'http://127.0.0.1:5000/beach_litter'
    );
    this.obsBeachLitter.subscribe(this.prepareBeachLitterData);
  }
}

export class ChartData {
  constructor(public title, public type, public data) {}
}
