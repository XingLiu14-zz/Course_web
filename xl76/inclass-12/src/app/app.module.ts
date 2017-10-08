import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DonateComponent } from './donate/donate.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';

import { RouterModule, Routes } from '@angular/router';

import { MatCardModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';

import { DonorService } from './donor/donor.service';

export const routes: Routes = [
  {path: 'donate', component: DonateComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: '', component: HomeComponent},
  {path: 'list', component: ListComponent},
  {path: 'home', component: HomeComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    DonateComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MatCardModule,
    MatButtonModule
  ],
  exports: [
  RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
