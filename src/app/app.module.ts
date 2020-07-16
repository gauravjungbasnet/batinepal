import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CKEditorModule } from 'ngx-ckeditor';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { NgxSpinnerModule } from "ngx-spinner";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Public/Include/header/header.component';
import { BannerComponent } from './Public/Include/banner/banner.component';
import { FooterComponent } from './Public/Include/footer/footer.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { HomeComponent } from './Public/home/home.component';
import { AboutUsComponent } from './Public/about-us/about-us.component';
import { OurTeamComponent } from './Public/our-team/our-team.component';
import { ProductsComponent } from './Public/products/products.component';
import { OurServiceComponent } from './Public/our-service/our-service.component';
import { TestimonialsComponent } from './Public/testimonials/testimonials.component';
import { ContactUsComponent } from './Public/contact-us/contact-us.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { HttpErrorInterceptor } from './Services/http-error.interceptor';
import { AdminHeaderComponent } from './admin/home/admin-header/admin-header.component';
import { AdminBannerComponent } from './admin/home/admin-banner/admin-banner.component';
import { AdminFooterComponent } from './admin/home/admin-footer/admin-footer.component';
import { AdminAboutUsComponent } from './admin/admin-about-us/admin-about-us.component';
import { AdminOurServiceComponent } from './admin/admin-our-service/admin-our-service.component';
import { AdminOurTeamComponent } from './admin/admin-our-team/admin-our-team.component';
import { AdminTestimonialsComponent } from './admin/admin-testimonials/admin-testimonials.component';
import {AdminContactUsComponent} from './admin/admin-contact-us/admin-contact-us.component';
import { AdminAddCategoryComponent } from './admin/admin-add-category/admin-add-category.component';
import { AdminAddProductComponent } from './admin/admin-add-product/admin-add-product.component';
import { ProductListComponent } from './Public/products/product-list/product-list.component';
import { ChangePasswordComponent } from './admin/change-password/change-password.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 3 
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    FooterComponent,
    HomeComponent,
    AboutUsComponent,
    OurTeamComponent,
    ProductsComponent,
    OurServiceComponent,
    TestimonialsComponent,
    ContactUsComponent,
    DashboardComponent,
    AdminComponent,
    LoginComponent,
    AdminHeaderComponent,
    AdminBannerComponent,
    AdminFooterComponent,
    AdminAboutUsComponent,
    AdminOurServiceComponent,
    AdminOurTeamComponent,
    AdminTestimonialsComponent,
    AdminContactUsComponent,
    AdminAddCategoryComponent,
    AdminAddProductComponent,
    ProductListComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    CarouselModule.forRoot(),
    SwiperModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    CKEditorModule,
    NgxSmartModalModule.forRoot(),NgxSpinnerModule],
  providers: [ {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
    provide: SWIPER_CONFIG,
    useValue: DEFAULT_SWIPER_CONFIG
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
