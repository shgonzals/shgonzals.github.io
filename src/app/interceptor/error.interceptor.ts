import { Inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private document: Document;

    constructor(@Inject(DOCUMENT) document: Document, private snackBar: MatSnackBar) {
        this.document = document;
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            const error = err.error?.message || err.statusText;
            console.error(err);

            if ([401, 403].includes(err.status)) {
                this.removeSpinner();
                this.snackBar.open("You don't have access to this resource.", 'OK');
            }

            return throwError(() => error);
        }))
    }

    removeSpinner() {
          this.document.getElementById("overlay")!.style.display = "none";
      }
}