import { Component ,OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { AngularFire } from 'angularfire2';
import { Router,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  userName:string;
  userPhotoUrl:string;
  googleuserId:string;
  googlePlus:string= "https://plus.google.com/u/0/";
  isImageBlured:boolean=false;

  constructor(public _firebaseService:FirebaseService,
              public af: AngularFire,
              public _router:Router){
                this._router.events.subscribe(
                  data => {
                    if (data instanceof NavigationEnd){
                        if(data.url != "/"){
                            this.isImageBlured=true;
                        }
                        else{
                              this.isImageBlured=false;
                        }
                    }
                  }
                );
  }
  ngOnInit(){
          this._firebaseService.checkAuth().subscribe(
          data => {
            if (data){
                this.userName     = data.auth.displayName;
                this.userPhotoUrl = data.auth.photoURL;
                this.googleuserId = data.google.uid;
            }
          }
      );
  }
  Login(){
    this._firebaseService.login();
  }
  Logout(){
    this._router.navigate(["/"]);
    this._firebaseService.logout();
  }
}
