import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export abstract class BaseHttpService {

  constructor(protected http: HttpClient) {
  }

  public get(url: string, params: any = {}, options: any = {}): Observable<any> {
    return this.sendRequest(url, 'GET', this.createOptions(params, options), options);
  }

  public post(url: string, params: any = {}, body: any = {}, options: any = {}): Observable<any> {
    return this.sendRequest(url, 'POST', this.createOptions(params, options), body);
  }

  public put(url: string, params: any = {}, body: any = {}, options: any = {}): Observable<any> {
    return this.sendRequest(url, 'PUT', this.createOptions(params, options), body);
  }

  public patch(url: string, params: any = {}, body: any = {}, options: any = {}): Observable<any> {
    return this.sendRequest(url, 'PATCH', this.createOptions(params, options), body);
  }

  public delete(url: string, params: any = {}, body: any = {}, options: any = {}): Observable<any> {
    return this.sendRequest(url, 'DELETE', this.createOptions(params, options), body);
  }

  private createOptions(params: any, options: any): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(params).map(key => {
      httpParams = httpParams.set(key, params[key]);
    });
    options.params = httpParams;
    return options;
  }

  private sendRequest(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', options: any,
                      body?: any): Observable<any> {
    let req: any;
    switch (method) {
      case 'GET':
        req = this.http.get(url, options);
        break;
      case 'POST':
        req = this.http.post(url, body, options);
        break;
      case 'PUT':
        req = this.http.put(url, body, options);
        break;
      case 'PATCH':
        req = this.http.patch(url, body, options);
        break;
      case 'DELETE':
        req = this.http.delete(url, options);
        break;
      default:
        throw new Error('Invalid request method.');
    }

    return req;
  }
}
