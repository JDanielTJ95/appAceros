import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './appAceros/components/notfound/notfound.component';
import { ProductService } from './appAceros/service/product.service';
import { CountryService } from './appAceros/service/country.service';
import { CustomerService } from './appAceros/service/customer.service';
import { EventService } from './appAceros/service/event.service';
import { IconService } from './appAceros/service/icon.service';
import { NodeService } from './appAceros/service/node.service';
import { PhotoService } from './appAceros/service/photo.service';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule],
    providers: [
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        },
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
