import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule , AuthProviders, AuthMethods } from 'angularfire2';
import { MaterialModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import 'hammerjs';

import { FirebaseService } from './services/firebase.service';
import { canDeactivateGuard } from './guards/canDeactivateGuard';
import { CanActivateGuard } from './guards/canActivateGuard';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PropertyComponent } from './components/property/property.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { AddPropertyComponent } from './components/add-property/add-property.component';
import { EditPropertyComponent } from './components/edit-property/edit-property.component';
import { DeletePropertyDialogComponent } from './components/delete-property-dialog/delete-property-dialog.component';
import { LoadingComponent } from './components/loading/loading.component';
import { UpdateImageDialogComponent } from './components/update-image-dialog/update-image-dialog.component';
import { CanDeactivateEditDialogComponent } from './components/can-deactivate-dialog/can-deactivate-edit-dialog.component';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyBxUGEOD_QpRUKmQ7fl0kJNRw20h7Ng2w0',
  authDomain: 'properties-app.firebaseapp.com',
  databaseURL: 'https://properties-app.firebaseio.com',
  storageBucket: 'properties-app.appspot.com',
  messagingSenderId: '78701964529'
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method:   AuthMethods.Redirect
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PropertyComponent,
    PropertiesComponent,
    AddPropertyComponent,
    EditPropertyComponent,
    DeletePropertyDialogComponent,
    LoadingComponent,
    UpdateImageDialogComponent,
    CanDeactivateEditDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule,
    AngularFireModule.initializeApp(firebaseConfig,myFirebaseAuthConfig)
  ],
  entryComponents:[ DeletePropertyDialogComponent,
                    LoadingComponent,
                    UpdateImageDialogComponent,
                    CanDeactivateEditDialogComponent
                  ],
  providers: [ FirebaseService,
               canDeactivateGuard,
               CanActivateGuard
             ],
  bootstrap: [ AppComponent ]
})
export class AppModule { 
  
}
