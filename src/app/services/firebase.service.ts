import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {
  // Points to the storage
  storageRef = firebase.storage().ref();
  
  constructor(public af: AngularFire) {
       
  }
  checkAuth(){
    return this.af.auth;
  }
  getFileFromStorage(image){
    return this.storageRef.child(`images/${image}`).getDownloadURL();
  }
  uploadFile(image){
    return this.storageRef.child(`images/${image.name}`).put(image);
  }
  deleteFile(imageName){
    return this.storageRef.child(`images/${imageName}`).delete();
  }
  login(){
    this.af.auth.login().then((resolve)=>{})
                        .catch( (error)=>{});
  }
  logout(){
    this.af.auth.logout().then((resolve)=>{})
                         .catch( (error)=>{});
  }
  getList(){
    return this.af.database.list("/listings");
  }
  getObject(id){
    return this.af.database.object(`/listings/`+id);
  }
}
