import { Component, AfterViewInit, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { Subscription } from "rxjs";

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from "@angular/material/snack-bar";

import { ProductService } from "../../services/product/product.service";
import { ProductDto } from "../../api/dto/apiDto";
import { CustomErrorHandlerLogService } from "../../util/services/custom-error-handler-log.service";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private _subscription: Subscription;

  public productFormGroup!: FormGroup;
  public createMode = false;
  public updateMode = false;
  public isLoading?: boolean;
  public products: ProductDto[] = [];

  public displayedColumns: string[] = [
    'id',
    'product name',
    'product description',
    'product price',
    'edit',
    'delete'
  ];
  public dataSource: MatTableDataSource<ProductDto>;


  constructor(
    private productService: ProductService,
    private customErrorHandlerLogService: CustomErrorHandlerLogService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this._subscription = new Subscription();
    this.dataSource = new MatTableDataSource(this.products);
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }

  private fetchProducts(): void {
    this._subscription.add(this.productService.getProducts().subscribe(
        {
          next: (data) => {
            this.products = data;
            this.dataSource = new MatTableDataSource(this.products);
          },
          error: (error) => {console.error('ERROR', error)}
        }
      )
    );
  }

  public onCreate(): void {
    this.createMode = true;
    this.productFormGroup = this.newProductForm();
  }

  public onEdit(id: number, product: ProductDto) {
    this.updateMode = true;
    this.productFormGroup = this.updateProductForm(product);
  }

  public onDelete(id: number) {
    this.isLoading = true;
    this._subscription.add(
      this.productService.deleteProduct(id).subscribe({
        next: (_) => {
          this.fetchProducts();
          this.openSnackBar('Product deleted', 'Dismiss');
        },
        error: (error) => {
          this.openSnackBar(
            `Could not delete. Error: ${error.name}`,
            'Dismiss');
        },
        complete: () => {
          this.isLoading = false;
        }
      }));
  }

  public onSubmit() {
    this.isLoading = true;
    const product: ProductDto = this.productFormGroup.value;
    if (this.createMode) {
      this.createProduct(product);
    } else {
      this.updateProduct(product);
    }


    this.createMode = false;
    this.updateMode = false;
  }

  public onCancel() {
    this.createMode = false;
    this.updateMode = false;
  }

  public newProductForm(): FormGroup {
    this.productFormGroup = this.formBuilder.group({
      productName: [null, Validators.required],
      productDescription: [null, Validators.required],
      productPrice: [null, Validators.required],
      productImage: [null, Validators.required]
    });
    return this.productFormGroup;
  }

  public updateProductForm(product: ProductDto): FormGroup {
    this.productFormGroup = this.formBuilder.group({
      id: [product.id],
      productName: [product.productName, Validators.required],
      productDescription: [product.productDescription, Validators.required],
      productPrice: [product.productPrice, Validators.required],
      productImage: [product.productImage, Validators.required]
    });
    return this.productFormGroup;
  }

  private createProduct(product: ProductDto): void {
    this._subscription.add(
      this.productService.createProduct(product)
        .subscribe({
          next: (_) => {
            this.fetchProducts();
            this.openSnackBar('Product created', 'Dismiss');
          },
          error: (error) => {
            this.openSnackBar(
              `Could not delete. Error: ${error.name}`,
              'Dismiss');
          },
          complete: () => {this.isLoading = false}
        })
    );
  }

  private updateProduct(product: ProductDto): void {
    const id = product?.id as number;
    if(id) {
      this._subscription.add(
        this.productService.updateProduct(id, product)
          .subscribe({
            next: (_) => {
              this.fetchProducts();
              this.openSnackBar('Product updated', 'Dismiss');
            },
            error: (error) => {
              this.openSnackBar(
                `Could not update. Error: ${error.name}`,
                'Dismiss');
            },
            complete: () => {this.isLoading = false}
          })
      );
    }
  }


  get productName(): FormControl {
    return this.productFormGroup.get('productName') as FormControl;
  }

  get productDescription(): FormControl {
    return this.productFormGroup.get('productDescription') as FormControl;
  }

  get productPrice(): FormControl {
    return this.productFormGroup.get('productPrice') as FormControl;
  }

  get productImage(): FormControl {
    return this.productFormGroup.get('productImage') as FormControl;
  }


}
