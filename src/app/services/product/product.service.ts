import { Injectable } from '@angular/core';
import { HttpApiService } from "../http-api/http-api.service";
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from "rxjs";
import { ProductDto } from "../../api/dto/apiDto";
import { ApiEndpoint } from "../../api/endpoints/apiEndPoints";
import { CustomErrorHandlerLogService } from "../../util/services/custom-error-handler-log.service";
import { HttpParams } from "@angular/common/http";

@Injectable()
export class ProductService {
  private url = ApiEndpoint.apiProduct;
  private _products: BehaviorSubject<ProductDto[] | null> = new BehaviorSubject<ProductDto[] | null>([]);
  public products: Observable<ProductDto[] | null> = this._products.asObservable();

  private _product: BehaviorSubject<ProductDto | null> = new BehaviorSubject<ProductDto | null>(null);
  public product: Observable<ProductDto | null> = this._product.asObservable();

  constructor(
    private httpApiService: HttpApiService,
    private customErrorHandlerLogService: CustomErrorHandlerLogService) { }

  public getProducts(): Observable<ProductDto[]> {
    return this.httpApiService.get<ProductDto[]>(this.url.product).pipe(
      tap((data) => {
        this._products.next(data);
        this.customErrorHandlerLogService.log('Fetch products from api')}),
      catchError(this.customErrorHandlerLogService.handleError<ProductDto[]>('getProducts')
     ));
  }

  public createProduct(product: ProductDto): Observable<ProductDto> {
    return this.httpApiService.post<ProductDto>(this.url.create, product).pipe(
      tap((data) => {
        this._product.next(data);
        this.customErrorHandlerLogService.log('Create product in api')
      }),
      catchError(this.customErrorHandlerLogService.handleError<ProductDto>('createProduct')
    ));
  }

  public updateProduct(id: number, product: ProductDto): Observable<ProductDto> {
    const queryParams = new HttpParams().append('id', id);
    const options = {params: queryParams};
    return this.httpApiService.put<ProductDto>(this.url.update, product, options).pipe(
      tap((data) => {
        this.customErrorHandlerLogService.log('Update product in api')
      }),
      catchError(this.customErrorHandlerLogService.handleError<ProductDto>('updateProduct')
      ));
  }

  public deleteProduct(id: number): Observable<ProductDto> {
    const queryParams = new HttpParams().append('id', id);
    const options = {params: queryParams};
    return this.httpApiService.delete<ProductDto>(this.url.delete, options).pipe(
      tap((_) => {
        this.customErrorHandlerLogService.log('Delete product in api')
      }),
      catchError(this.customErrorHandlerLogService.handleError<ProductDto>('deleteProduct')
      ));
  }
}
