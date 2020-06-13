import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {MockedDB} from '../mocks/mockedDB';
import {Book} from '../store/books.model';

enum HttpMethod {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE'
}

@Injectable()
export class MimicBackendInterceptor implements HttpInterceptor {
  private configurationURLs = ['/books'];

  constructor(private bookDB: MockedDB) {
  }

  intercept(originalReq: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (location.hostname !== 'localhost') {
      return next.handle(originalReq);
    }

    const url = originalReq.url;
    const method = originalReq.method;
    const params = originalReq.body;

    if (!this.isConfigurationURL(url)) {
      return next.handle(originalReq);
    }

    return this.buildHTTPResponse(url, method, params);
  }

  private isConfigurationURL(urlToTest: string): boolean {
    return this.getConfiguration(urlToTest) != null;
  }

  private getConfiguration(url: string): boolean | null {
    const configuredUrls = this.configurationURLs;
    for (const configuredUrl of configuredUrls) {
      if (new RegExp(configuredUrl).test(url)) {
        return true;
      }
    }
    return null;
  }

  private buildHTTPResponse(url: string, method: string, params: any = {}): Observable<HttpEvent<any>> {

    const responseConfiguration = this.getConfiguration(url);
    const urlID = url.split('/').length > 3 ? url.split('/')[4] : null;

    let response;
    if (urlID) {
      response = {
        ...responseConfiguration[method],
        body: this.createResponseBody(method, {...params, id: urlID})
      };
    } else {
      response = {
        ...responseConfiguration[method],
        body: this.createResponseBody(method, params)
      };
    }
    return of(new HttpResponse({...response, url}));
  }

  private createResponseBody(method: string, params: any) {
    switch (method) {
      case HttpMethod.GET:
        return this.bookDB.findAllBookRecords();
      case HttpMethod.POST:
        return this.bookDB.createBookRecord(params.book);
      case HttpMethod.PUT:
        let updatedBook: Book;
        try {
          updatedBook = this.bookDB.updateBookRecord(params.id, params.book);
          return updatedBook;
        } catch (e) {
          return e.message;
        }
      case HttpMethod.DELETE:
        let deletedBook: Book;
        try {
          deletedBook = this.bookDB.deleteBookRecord(params.id);
          return deletedBook;
        } catch (e) {
          return e.message;
        }
    }
  }
}

