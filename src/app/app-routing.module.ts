import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Public/home/home.component';
import { AboutUsComponent } from './Public/about-us/about-us.component';
import { OurTeamComponent } from './Public/our-team/our-team.component';
import { ProductsComponent } from './Public/products/products.component';
import { OurServiceComponent } from './Public/our-service/our-service.component';
import { TestimonialsComponent } from './Public/testimonials/testimonials.component';
import { ContactUsComponent } from './Public/contact-us/contact-us.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
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

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'about-us',component:AboutUsComponent},
  {path:'our-team',component:OurTeamComponent},
  {path:'category',component:ProductsComponent},
  {path:'product/:id',component:ProductListComponent},
  {path:'our-service',component:OurServiceComponent},
  {path:'testimonials',component:TestimonialsComponent},
  {path:'contact-us',component:ContactUsComponent},
  {path:'bati-login',component:LoginComponent},
  {path:'admin',component:AdminComponent,children:[
    {path:'dashboard',component:DashboardComponent},
    {path:'',redirectTo:'dashboard', pathMatch:'full'},
    {path:'header',component:AdminHeaderComponent},
    {path:'banner',component:AdminBannerComponent},
    {path:'footer',component:AdminFooterComponent},
    {path:'admin-about-us',component:AdminAboutUsComponent},
    {path:'admin-our-service',component:AdminOurServiceComponent},
    {path:'admin-our-team',component:AdminOurTeamComponent},
    {path:'admin-testimonials',component:AdminTestimonialsComponent},
    {path:'admin-contact',component:AdminContactUsComponent},
    {path:'add-category',component:AdminAddCategoryComponent},
    {path:'add-product',component:AdminAddProductComponent},
    {path:'change-password',component:ChangePasswordComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
