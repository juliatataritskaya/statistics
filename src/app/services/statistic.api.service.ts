import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {BaseHttpService} from './base.http.service';

@Injectable()
export class StatisticApiService extends BaseHttpService {
  private static getFirstStatisticsUrl = environment.serverUrl + '/number-of-completed-lessons-and-users';
  private static getSecondStatisticsUrl = environment.serverUrl + '/completed-users-at-all-lessons';
  private static getTableDataStatisticsUrl = environment.serverUrl + '/user-ids';

  constructor(protected http: HttpClient) {
    super(http);
  }

  public getFirstStatistics(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.get(StatisticApiService.getFirstStatisticsUrl, {})
        .subscribe(result => {
          resolve(result);
        }, error => {
          reject(error);
        });
    });
  }

  public getSecondStatistics(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.get(StatisticApiService.getSecondStatisticsUrl, {})
        .subscribe(result => {
          resolve(result);
        }, error => {
          reject(error);
        });
    });
  }

  public getTableData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.get(StatisticApiService.getTableDataStatisticsUrl, {})
        .subscribe(result => {
          resolve(result);
        }, error => {
          reject(error);
        });
    });
  }

}
