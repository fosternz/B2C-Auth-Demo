import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  MsalBroadcastService,
  MsalGuard,
  MsalGuardConfiguration,
  MsalInterceptor,
  MsalModule,
  MsalRedirectComponent,
  MsalService,
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
} from '@azure/msal-angular';
import {
  InteractionType,
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { msalConfig, protectedResources } from './auth-config';
import { HomeComponent } from './home/home.component';
import { SecureComponent } from './secure/secure.component';

// /**
//  * Here we pass the configuration parameters to create an MSAL instance.
//  * For more info, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/configuration.md
//  */
// export function MSALInstanceFactory(): IPublicClientApplication {
//   return new PublicClientApplication(msalConfig);
// }

// /**
//  * Set your default interaction type for MSALGuard here. If you have any
//  * additional scopes you want the user to consent upon login, add them here as well.
//  */
// export function MSALGuardConfigFactory(): MsalGuardConfiguration {
//   return {
//     interactionType: InteractionType.Redirect,
//   };
// }

@NgModule({
  declarations: [AppComponent, HomeComponent, SecureComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule,
    HttpClientModule,
    MsalModule.forRoot(
      new PublicClientApplication(msalConfig),
      {
        // The routing guard configuration.
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: protectedResources.todoListApi.scopes,
        },
      },
      {
        // MSAL interceptor configuration.
        // The protected resource mapping maps your web API with the corresponding app scopes. If your code needs to call another web API, add the URI mapping here.
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([
          [
            protectedResources.todoListApi.endpoint,
            protectedResources.todoListApi.scopes,
          ],
        ]),
      }
    ),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: MsalInterceptor,
      multi: true,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {}
