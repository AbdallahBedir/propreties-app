import { Injectable }  from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FirebaseService } from './firebase.service';
import { FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/first' ;

@Injectable()
export class PropertiesResolver implements Resolve<any>{
    constructor(private _firebaseService:FirebaseService){
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<any>{
        if(state.url == '/Properties'){
            //using first() operator to ensure that observable gets closed after the first value is emitted
            return this._firebaseService.getList().first();
        }
    }
}