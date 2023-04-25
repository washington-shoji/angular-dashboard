import { Injectable } from '@angular/core';
import { MessageService } from "./message.service";
import { Observable, throwError } from "rxjs";

@Injectable()
export class CustomErrorHandlerLogService {

  constructor(private messageService: MessageService) { }

  public handleError<T>(operation = 'operation') {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console?.error('Handle Error Logger', error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error?.message}`);

      // Rethrow the error.
      return throwError(error);
    };
  }

  /** Log a HeroService message with the MessageService */
  public log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
