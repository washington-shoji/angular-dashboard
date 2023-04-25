import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class HttpApiService {

  constructor(private http: HttpClient) {}

  public get<T>(url: string, options: {
    headers?: HttpHeaders,
    observer?: 'body',
    params?: HttpParams,
    reportProgress?: boolean,
    responseType?: 'json',
    withCredential?: boolean
  } = {}): Observable<T> {
    const mergedOptions = {...options, ...{headers: this.headers(options?.headers || null)}};
    return this.http.get<T>(url, mergedOptions);
  }

  public post<T>(
    url: string,
    data: any | null,
    options?: {
      headers?: HttpHeaders,
      observer?: 'body',
      params?: HttpParams,
      reportProgress?: boolean,
      responseType?: 'json',
      withCredential?: boolean
    }
  ): Observable<T> {
    options = options || {};
    return this.http.post<T>(url, data, {
      headers: this.headers(options.headers),
      observe: options.observer,
      params: options.params,
      reportProgress: options.reportProgress,
      responseType: options.responseType,
      withCredentials: options.withCredential
    });
  }

  public put<T>(
    url: string,
    data: any | null,
    options?: {
      headers?: HttpHeaders,
      observer?: 'body',
      params?: HttpParams,
      reportProgress?: boolean,
      responseType?: 'json',
      withCredential?: boolean
    }
  ): Observable<T> {
    options = options || {};
    return this.http.put<T>(url, data, {
      headers: this.headers(options.headers),
      observe: options.observer,
      params: options.params,
      reportProgress: options.reportProgress,
      responseType: options.responseType,
      withCredentials: options.withCredential
    });
  }

  public delete<T>(
    url: string,
    options?: {
      headers?: HttpHeaders,
      observer?: 'body',
      params?: HttpParams,
      reportProgress?: boolean,
      responseType?: 'json',
      withCredential?: boolean
    }
  ): Observable<T> {
    const mergedOptions = {...options, ...{headers: this.headers(options?.headers || null)}};
    return this.http.delete<T>(url, mergedOptions);
  }

  private headers(headers?: HttpHeaders | null): HttpHeaders {
    return headers || new HttpHeaders();
  }
}
