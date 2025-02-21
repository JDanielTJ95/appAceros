import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivationStart, Router, RouterModule, Scroll } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { catchError, filter, map, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [
		BreadcrumbModule,
        CommonModule,
        FormsModule,
        RouterModule,
  ],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss'
})
export class BreadcrumbsComponent implements OnInit,OnDestroy{

   public items: MenuItem[] = [];
   public home: MenuItem | undefined;
   public titleSubs$: Subscription;
   public isLoaded: boolean = false;

    constructor( private router: Router ) {}

    ngOnInit(): void {
        this.home = { icon: 'pi pi-home', routerLink: '/'};
        this.titleSubs$ = this.router.events.pipe(
            map( (event: Scroll) => event.routerEvent.url ),
            catchError( (error, caught) => caught ),
            map( value => value.split('/').filter( v => v !== '') ),
        ).subscribe(value => {
            value.forEach(val => this.items.push({ label: val }));
            this.isLoaded = true;
        });
    }

    ngOnDestroy(): void {
        this.titleSubs$.unsubscribe();
    }
}
