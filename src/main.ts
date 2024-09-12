import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './components/app/app.component';
import { appConfig } from './components/app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
