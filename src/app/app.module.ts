import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";

import { HttpApiService } from "./services/http-api/http-api.service";
import { ProductService } from "./services/product/product.service";
import { MessageService } from "./util/services/message.service";
import { CustomErrorHandlerLogService } from "./util/services/custom-error-handler-log.service";

import { BodyComponent } from './components/body/body.component';
import { SidenavbarComponent } from './components/sidenavbar/sidenavbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { StatisticsComponent } from './components/statistics/statistics.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ProductComponent } from './components/product/product.component';

import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from '@angular/material/snack-bar';

const materialModules: MatIconModule[] = [
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  ReactiveFormsModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavbarComponent,
    DashboardComponent,
    StatisticsComponent,
    SettingsComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    materialModules
  ],
  providers: [
    HttpApiService,
    ProductService,
    MessageService,
    CustomErrorHandlerLogService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
