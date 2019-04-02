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
  firstDataStatistics = {x: [], y: []};
  secondDataStatistics = {x: [], y: []};

  isFirstLoading = true;
  isSecondLoading = true;

  constructor(private statisticService: StatisticApiService) {
  }

  type: ChartType = 'Bar';
  firstDiagramData: IChartistData;

  secondDiagramData: IChartistData;

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
    this.isFirstLoading = true;
    this.isSecondLoading = true;
    this.statisticService.getFirstStatistics().then((res) => {
      console.log(res);
      res.forEach((el) => {
        this.firstDataStatistics.x.push(el.completedLessons);
        this.firstDataStatistics.y.push(el.users);
      });
      this.setFirstData();
    });
    this.statisticService.getSecondStatistics().then((res) => {
      res.forEach((el) => {
        this.secondDataStatistics.x.push(el.lessonId);
        this.secondDataStatistics.y.push(el.completedUsers);
      });

      this.setSecondData();
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

  setFirstData() {
    this.isFirstLoading = false;
    this.firstDiagramData = {
      labels: this.firstDataStatistics.x,
      series: [
        this.firstDataStatistics.y
      ]
    };
  }

  setSecondData() {
    this.isSecondLoading = false;
    this.secondDiagramData = {
      labels: this.secondDataStatistics.x,
      series: [
        this.secondDataStatistics.y
      ]
    };
  }

}
