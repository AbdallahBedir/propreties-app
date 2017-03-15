import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PropertyComponent } from './components/property/property.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { AddPropertyComponent } from './components/add-property/add-property.component';
import { EditPropertyComponent } from './components/edit-property/edit-property.component';

import { canDeactivateGuard } from './guards/canDeactivateGuard';
import { CanActivateGuard } from './guards/canActivateGuard';
import { PropertiesResolver } from './services/properties-resolver.servcie';

const routes: Routes = [
  {   path:'',
      component:HomeComponent
  },
  {   path:'Add-Property',
      component:AddPropertyComponent,
      canDeactivate:[canDeactivateGuard],
      canActivate:[CanActivateGuard]
  },
  {   path:'Properties',
      component:PropertiesComponent,
      canActivate:[CanActivateGuard],
      resolve:{props:PropertiesResolver}
  },
  {   path:'Property/:id',
      component:PropertyComponent,
      canActivate:[CanActivateGuard]
  },
  {   path:'Edit-property/:id',
      component:EditPropertyComponent,
      canDeactivate:[canDeactivateGuard],
      canActivate:[CanActivateGuard]
  },
  {   path:'**',
      redirectTo:"/",
      pathMatch:"full"
  }
];

@NgModule({
  imports:   [ RouterModule.forRoot(routes) ],
  exports:   [ RouterModule ],
  providers: [ PropertiesResolver ]
})
export class AppRoutingModule { }
