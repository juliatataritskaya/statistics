import {Component, OnInit} from '@angular/core';
import {StatisticApiService} from './services/statistic.api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  firstDataStatistics = {x: [], y: [{data: []}]};
  secondDataStatistics = {x: [], y: [{data: []}]};

  isFirstLoading = true;
  isSecondLoading = true;

  // barChart First
  firstBarOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          labelString: 'Number of users',
          display: true,
          fontSize: 14
        },
      },
      ],
      xAxes: [{
        scaleLabel: {
          labelString: 'Number of lessons completed',
          display: true,
          fontSize: 14
        },
        barPercentage: 0.4
      },
      ]
    }
  };

  // barChart Second
  secondBarOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        },
        scaleLabel: {
          labelString: 'Number of users who completed this lesson',
          display: true,
          fontSize: 14
        },
      },
      ],
      xAxes: [{
        scaleLabel: {
          labelString: 'Lesson number',
          display: true,
          fontSize: 14
        },
        barPercentage: 0.4
      },
      ]
    }
  };

  barChartType = 'bar';

  barChartColors: Array<any> = [
    {

      backgroundColor: 'rgba(0, 157, 160, 0.8)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },

  ];

  constructor(private statisticService: StatisticApiService) {
  }

  filterSource = [];
  filtersettings = {
    actions: false,
    columns: {
      userId: {
        title: 'ID',
      },
      codeDay: {
        valuePrepareFunction: (value) => {
          let returnedValue = '';
          if (value == '1') {
            returnedValue = 'Today';
          }
          if (value == '2') {
            returnedValue = 'Yesterday';
          }
          if (value == '3') {
            returnedValue = 'Day before yesterday';
          }
          return returnedValue;
        },
        title: 'Day',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              {value: '1', title: 'Today'},
              {value: '2', title: 'Yesterday'},
              {value: '3', title: 'Day before yesterday'},
            ]
          },
        },
      },
    },
    attr: {
      class: 'table table-responsive'
    }
  };

  ngOnInit() {
    this.isFirstLoading = true;
    this.isSecondLoading = true;
    this.getFirstData();
    this.getSecondData();
    this.getTableData();
  }

  getFirstData() {
    this.statisticService.getFirstStatistics().then((res) => {
      res.forEach((el) => {
        this.firstDataStatistics.x.push(el.completedLessons);
        this.firstDataStatistics.y[0].data.push(el.users);
      });
      this.setFirstData();
    });
  }

  getSecondData() {
    this.statisticService.getSecondStatistics().then((res) => {
      res.forEach((el) => {
        this.secondDataStatistics.x.push(el.lessonId);
        this.secondDataStatistics.y[0].data.push(el.completedUsers);
      });
      this.setSecondData();
    });
  }

  getTableData() {
    this.statisticService.getTableData().then((res) => {
      this.filterSource = res;
    });
  }

  setFirstData() {
    this.isFirstLoading = false;
  }

  setSecondData() {
    this.isSecondLoading = false;
  }
}
