import {Component, OnInit} from '@angular/core';
import {StatisticApiService} from './services/statistic.api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  firstDataStatistics = {x: [], y: [{ data: []}]};
  secondDataStatistics = {x: [], y: [{ data: []}]};

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

  constructor(private statisticService: StatisticApiService) { }

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
      res.forEach((el) => {
        this.firstDataStatistics.x.push(el.completedLessons);
        this.firstDataStatistics.y[0].data.push(el.users);
      });
      this.setFirstData();
    });

    this.statisticService.getSecondStatistics().then((res) => {
      res.forEach((el) => {
        this.secondDataStatistics.x.push(el.lessonId);
        this.secondDataStatistics.y[0].data.push(el.completedUsers);
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
  }

  setSecondData() {
    this.isSecondLoading = false;
  }
}
