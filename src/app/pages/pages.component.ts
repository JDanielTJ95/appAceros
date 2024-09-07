import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from '../shared/breadcrumbs/breadcrumbs.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    RouterOutlet,
  ],
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("entro  a pages");
  }

}
