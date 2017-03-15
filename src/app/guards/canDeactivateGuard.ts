import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { EditPropertyComponent } from '../components/edit-property/edit-property.component';
import { MdDialog } from '@angular/material';
import { CanDeactivateEditDialogComponent } from '../components/can-deactivate-dialog/can-deactivate-edit-dialog.component';
import { Observable } from 'rxjs/Observable';


export interface CanComponentDeactivate {
 canDeactivate:() => boolean;
}

@Injectable()
export class canDeactivateGuard implements CanDeactivate<CanComponentDeactivate>{
    constructor(public dialog:MdDialog){

    }
    canDeactivate(editComponent:CanComponentDeactivate):Observable<boolean> | boolean{
        // check if the form is containg data not saved 
        if(editComponent.canDeactivate()){
            return true;
        }
        else{
            // if yes, open the dialog to alert the user  
             return this.dialog.open(CanDeactivateEditDialogComponent).afterClosed();
        }
    }
}
