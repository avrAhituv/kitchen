import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ListResultsComponent } from './components/list-results/list-results.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [ListResultsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatToolbarModule,
    FormsModule,
    LayoutModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    // GoogleApiModule.forRoot({ provide: NG_GAPI_CONFIG,  useValue: gapiClientConfig })
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatToolbarModule,
    FormsModule,
    LayoutModule,
    ServiceWorkerModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    ListResultsComponent,
    FontAwesomeModule
    // GoogleApiModule
  ]
})
export class SharedModule { }
