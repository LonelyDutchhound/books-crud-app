import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BooklistContainerComponent } from './components/booklist-container/booklist-container.component';
import { BookFormDialogComponent } from './components/book-form-dialog/book-form-dialog.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MimicBackendInterceptor} from './interceptors/mimic-backend.interceptor';
import {MockedDB} from './mocks/mockedDB';
import {ReactiveFormsModule} from '@angular/forms';
import {environment} from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import * as fromBookStore from './store';

@NgModule({
  declarations: [
    AppComponent,
    BooklistContainerComponent,
    BookFormDialogComponent,
    BookCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(fromBookStore.reducers, {}),
    EffectsModule.forRoot(fromBookStore.effects),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MimicBackendInterceptor, multi: true },
    { provide: MockedDB, useClass: MockedDB}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
