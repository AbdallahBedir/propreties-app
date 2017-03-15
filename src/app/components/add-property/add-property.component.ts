import { Component, OnInit ,ViewEncapsulation, trigger ,state
        ,transition,style,animate,keyframes} from '@angular/core';
import { FormControl,FormGroup,FormBuilder,Validators} from '@angular/forms';
import { FirebaseService} from '../../services/firebase.service';
import { FirebaseListObservable} from 'angularfire2';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import {LoadingComponent} from '../loading/loading.component';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss'],
  encapsulation:ViewEncapsulation.None,
    animations:[
    trigger("addProperty",[
      transition("void => *",[
          animate('.5s 0.2s ease-in',keyframes([
              style({opacity:0,transform:'translateX(30px)',offset:0}),
              style({opacity:1,transform:'translateX(0)',offset:1}),
          ]))
      ])
    ])
  ]
})
export class AddPropertyComponent implements OnInit {

  items:FirebaseListObservable<any>;
  Types:any[]=[
    {value:"Estate" ,viewValue:"Estate"},
    {value:"Condo" ,viewValue:"Condo"},
    {value:"Apartment" ,viewValue:"Apartment"}
  ];
  validForm:boolean;

  title:FormControl     =new FormControl('',[Validators.required])
  city:FormControl      =new FormControl();
  owner:FormControl     =new FormControl();
  bedrooms:FormControl  =new FormControl();
  price:FormControl     =new FormControl();
  addPropertyForm:FormGroup;
  imageName:string;
  typeValue:string;
  uploadedFile:File;
  fileErrorMessage:string=null;

  constructor(public fb:FormBuilder,
              private _firebaseService:FirebaseService,
              private _router:Router,
              public dialog: MdDialog) {
              
      this.addPropertyForm = fb.group({
        title:this.title,
        city:this.city,
        owner:this.owner,
        bedrooms:this.bedrooms,
        price:this.price  ,
        image:'',
        type:this.typeValue
      })    
  }

  ngOnInit() {
    
  }
  canDeactivate(){
      if((this.title.value || this.city.value || this.owner.value
                || this.bedrooms.value || this.price.value || this.typeValue)
                && !this.validForm){
         return false
      }
      return true;
  }
  openLoading(){
    return this.dialog.open(LoadingComponent);
  }
  fileChange(event){
    let fileName = event.target.value.split('\\').pop();
    if(fileName){
        document.getElementById("file").nextElementSibling.querySelector('span').innerHTML= fileName;
    }
    let filesList = event.target.files;
    if(filesList.length > 0){
        this.uploadedFile = filesList[0];
        // check file extension
        if(!this.uploadedFile.type.includes("image")){
            this.fileErrorMessage= "File sholud be an image";
        }            
        // check file size
        else if(this.uploadedFile.size > 200000){
            this.fileErrorMessage="image size should be less than 200kb";
        }
        else{
          this.fileErrorMessage=null;
        }
    }
    else{
        return false;
    }
  }
  selectChanged(val){
      this.typeValue=val;
  }
  save(form){
      this.items = this._firebaseService.getList();
      if(form.invalid){
          this.validForm=false;
          return false;
      }
      if(this.fileErrorMessage){
        return false;
      }
      if(!this.uploadedFile){
          // property without image
          form.value.type=this.typeValue || null;
          form.value.image = null;
          this.validForm=true;
          this.items.push(form.value)
            .then(()=>{
                this._router.navigate(["/Properties"]);
            }).catch(()=>{
                console.log(`something went wrong while adding a property to firebase`);
            });
      }
      else{
            // Uploading the image
            let uploadTask = this._firebaseService.uploadFile(this.uploadedFile);
            uploadTask.on("state_changed",(snapshot) => {
                if(snapshot.state == 'running'){
                      console.log('Upload is running');
                      this.openLoading();
                      this.dialog.afterAllClosed.subscribe(
                        data => {
                          if(snapshot.state == 'running'){
                              uploadTask.cancel();
                              return false;
                          }
                        },
                        err => {},
                        () => {
                          uploadTask.cancel();
                          return false;
                        }
                      )
                }
            },(error)  =>{
                console.log('Error while uploading the file',error);
            },() =>{
                form.value.type=this.typeValue || null;
                form.value.image = this.uploadedFile.name;
                this.validForm=true;
                this.items.push(form.value).then(()=> {
                    this.dialog.closeAll();
                    this._router.navigate(["/Properties"]);
                }).catch(()=>{
                    console.log(`something went wrong while adding a property to firebase`);
                });
            });
      } // end else
  } //end save
} //end class

