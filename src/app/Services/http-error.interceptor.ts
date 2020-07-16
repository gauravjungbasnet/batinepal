import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export class HttpErrorInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    console.log(error);
                    let errorMessage ;
                    let errorStatusCode;
                    var errorObj: any = <any>{};
                    if (error.error instanceof ErrorEvent) {
                        // client side error
                        errorMessage = `Error ${error.error.message}`;
                    }else{
                        // server side error
                        errorStatusCode = error.status;
                        var errorHere= error.error;
                        errorMessage = error.error.message;
                    }
                    errorObj.errorStatusCode = errorStatusCode;
                    errorObj.errorMessage = errorMessage;
                    errorObj.errorDetail = errorHere;

                    return throwError(errorObj);
                })
            )
    }

}