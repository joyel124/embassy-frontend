import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LandingpageComponent} from "./common/pages/landingpage/landingpage.component";
import {PageNotFoundComponent} from "./common/pages/page-not-found/page-not-found.component";
import {HomeComponent} from "./appointment/pages/home/home.component";

const routes: Routes = [
  //Rutas sin protección
  {path: '', redirectTo: "landing", pathMatch: "full"},
  {path: 'landing', component: LandingpageComponent},
  //Rutas sin protección de redirección a home si el usuario está autenticado
  {path: 'home', component: HomeComponent},
  //Rutas con protección
  {path: 'page-not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: "page-not-found", pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
