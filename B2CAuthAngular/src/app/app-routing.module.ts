import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { HomeComponent } from './home/home.component';
import { SecureComponent } from './secure/secure.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'app',
    component: SecureComponent,
    canActivate: [MsalGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      //initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
