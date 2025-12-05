import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withPreloading, PreloadingStrategy, Route } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withXsrfConfiguration } from '@angular/common/http';
import { AppComponent } from './app/components/app.component';
import { routes } from './app/components/app.routes';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';

@Injectable({ providedIn: 'root' })
class SelectivePreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      return load();
    }
    return timer(5000).pipe(() => load());
  }
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withPreloading(SelectivePreloadingStrategy)),
    provideAnimations(),
    provideHttpClient(
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN'
      })
    )
  ]
}).catch(err => console.error(err));
