import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    NopagefoundComponent,
    ProgressComponent,
    Grafica1Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
})
export class AppModule { }
