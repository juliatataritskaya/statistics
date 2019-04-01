import {Component, OnInit} from '@angular/core';
import {
  IBarChartOptions,
  IChartistAnimationOptions,
  IChartistData
} from 'chartist';
import {ChartEvent, ChartType} from 'ng-chartist';
import {StatisticApiService} from './services/statistic.api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(private statisticService: StatisticApiService) {
  }

  type: ChartType = 'Bar';
  firstDiagramData: IChartistData = {
    labels: [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
    ],
    series: [
      [1, 5, 10, 15, 20, 25, 30, 35, 40, 45]
    ]
  };

  secondDiagramData: IChartistData = {
    labels: [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
    ],
    series: [
      [10, 5, 3, 2, 2, 1, 1, 1, 1, 0, 0]
    ]
  };

  options: IBarChartOptions = {
    seriesBarDistance: 21,
    axisX: {
      showGrid: false
    },
    axisY: {
      scaleMinSpace: 30,

    },
    height: 300
  };

  events: ChartEvent = {
    draw: (data) => {
      if (data.type === 'bar') {
        data.element.animate({
          y2: <IChartistAnimationOptions> {
            dur: '0.5s',
            from: data.y1,
            to: data.y2,
            easing: 'easeOutQuad'
          }
        });
      }
    }
  };

  filterSource = [];
  filtersettings = {
    actions: false,
    columns: {
      id: {
        title: 'ID',
      },
      name: {
        title: 'Full Name',
      },
      date: {
        title: 'Date',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              { value: 'Today', title: 'Today' },
              { value: 'Yesterday', title: 'Yesterday' },
              { value: 'Day before yesterday', title: 'Day before yesterday' },
            ],
          },
        },
      },
    },
    attr: {
      class: "table table-responsive"
    }
  }

  ngOnInit() {
    this.statisticService.getStatistics().then((res) => {
      console.log(res);
    });
    this.filterSource = [ {
      id: 1, name: 'Test1', date: 'Today'
    },
      {
        id: 2, name: 'Test2', date: 'Yesterday'
      },
      {
        id: 3, name: 'Test3', date: 'Day before yesterday'
      },
      {
        id: 4, name: 'Test4', date: 'Day before yesterday'
      },
      {
        id: 5, name: 'Test5', date: 'Today'
      },
      {
        id: 6, name: 'Test6', date: 'Today'
      }];
  }

}
