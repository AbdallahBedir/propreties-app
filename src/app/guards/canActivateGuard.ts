import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

@Injectable()
export class CanActivateGuard implements CanActivate {

  constructor(public _router: Router) {}

  canActivate() {
            if(firebase.auth().currentUser){
                return true;
            }
            else{
                this._router.navigate(["/"]);
                return false;
            }
  }
}