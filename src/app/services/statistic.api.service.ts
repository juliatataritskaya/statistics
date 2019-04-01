import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {BaseHttpService} from './base.http.service';

@Injectable()
export class StatisticApiService extends BaseHttpService {
  private static getStatisticsUrl = environment.serverUrl + '/getStatistics';

  constructor(protected http: HttpClient) {
    super(http);
  }

  public getStatistics(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.get(StatisticApiService.getStatisticsUrl, {})
        .subscribe(result => {
          resolve(result);
        }, error => {
          reject(error);
        });
    });
  }

}
