import { Component, OnInit ,ViewEncapsulation, trigger ,state
        ,transition,style,animate,keyframes } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { FirebaseObjectObservable ,FirebaseListObservable} from 'angularfire2';
import 'rxjs/add/operator/map';
import { FormControl,FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MdDialog } from '@angular/material';
import { LoadingComponent } from '../loading/loading.component';
import { UpdateImageDialogComponent } from '../update-image-dialog/update-image-dialog.component';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.scss'],
  encapsulation:ViewEncapsulation.None,
  animations:[
    trigger("editProperty",[
      transition("void => *",[
          animate('.5s 0.2s ease-in',keyframes([
              style({opacity:0,transform:'translateX(30px)',offset:0}),
              style({opacity:1,transform:'translateX(0)',offset:1}),
          ]))
      ])
    ])
  ]
})
export class EditPropertyComponent implements OnInit {
  Types:any[]=[
    {value:"Estate" ,viewValue:"Estate"},
    {value:"Condo" ,viewValue:"Condo"},
    {value:"Apartment" ,viewValue:"Apartment"}
  ];
  
  items$:FirebaseListObservable<any>;
  id:any;
  item:any={};
  title:FormControl     =new FormControl('',[Validators.required])
  city:FormControl      =new FormControl('',[]);
  owner:FormControl     =new FormControl('',[]);
  bedrooms:FormControl  =new FormControl('',[]);
  type:FormControl      =new FormControl('',[]);
  price:FormControl     =new FormControl('',[]);
  editPropertyForm:FormGroup;
  invalidForm:boolean=false;
  fileWillBeUploaded:File;
  fileErrorMessage:string=null;
  formIsSaved:boolean=false;

  constructor(private _activatedRoute:ActivatedRoute,
              private _firebaseService:FirebaseService,
              private _router:Router,
              public dialog: MdDialog,
              fb:FormBuilder){
                  
        this.id = this._activatedRoute.snapshot.params["id"];  
        this.items$ = this._firebaseService.getList();
        this.editPropertyForm = fb.group({
            title:this.title,
            city:this.city,
            owner:this.owner,
            bedrooms:this.bedrooms,
            price:this.price,
            type:this.type 
        }); 
        this._firebaseService.getObject(this.id).subscribe(
            data => {
                this.item =data;
            }
        );   
  }

  ngOnInit() {

  }
  canDeactivate(){
      let itemFromServer:any;
      this._firebaseService.getObject(this.id)
                           .subscribe(data => itemFromServer=data);
      
      if(itemFromServer.bedrooms != this.bedrooms.value  ||
         itemFromServer.title    != this.title.value     ||
         itemFromServer.city     != this.city.value      ||
         itemFromServer.owner    != this.owner.value     ||
         itemFromServer.type     != this.type.value      ||
         itemFromServer.price    != this.price.value ){
         return false
      }
      return true;
  }
  openLoading(){
    return this.dialog.open(LoadingComponent);
  }
  checkTheChangedFile(event):boolean{
      let filesList = event.target.files;
      if(filesList.length > 0){
          let file:File = filesList[0];
          // check file extension
          if(!file.type.includes("image")){
              this.fileErrorMessage= "File sholud be an image";
              return false;
          }            
          // check file size
          else if(file.size > 200000){
              this.fileErrorMessage="image size should be less than 200kb";
              return false;
          }
          else{
            this.fileWillBeUploaded=file;
            this.fileErrorMessage=null;
            return true;
          }
      }
      else{
          return false;
      }
  }
  fileChange(event){
      let fileName = event.target.value.split('\\').pop();
      if(fileName){
          document.getElementById("file").nextElementSibling.querySelector('span').innerHTML= fileName;
      }
      if(this.item.image){
            //check the file size and type first
            if(!this.checkTheChangedFile(event)){
                return false;
            }
            //property have image already, make sure that user want to delete
            this.dialog.open(UpdateImageDialogComponent).afterClosed().subscribe(
                data => {
                    if(data != 'Delete'){
                        document.getElementById("file").nextElementSibling.querySelector('span').innerHTML= "Choose an image...";
                        this.fileWillBeUploaded = null;
                        return false;
                    }
                    else{
                        this._firebaseService.deleteFile(this.item.image)
                            .then(()=>{})
                            .catch(()=>{console.log(`error while deleting the image`)});
                            this.item.image = null;
                            this.setNullToUndefinedProperties(this.item);
                            this.items$.update(this.id,this.item);
                            this.checkTheChangedFile(event);
                    }
                }
            );
      }
      else{
            this.checkTheChangedFile(event);
      } 
  }
  fileIsUploaded(formValue){
        // Uploading the image
        let status:boolean;
        let uploadTask = this._firebaseService.uploadFile(this.fileWillBeUploaded);
        uploadTask.on("state_changed",(snapshot) => {
            if(snapshot.state == 'running'){
                    this.openLoading();
                    this.dialog.afterAllClosed.subscribe(
                        data => {
                            if(snapshot.state == 'running'){
                                uploadTask.cancel();
                                status=false;
                                return false;
                                
                            }
                        },
                        err => {},
                        () => {
                            uploadTask.cancel();
                            return false;
                        }
                    );
            }
        },(error)  =>{
            console.log('Error while uploading the file',error);
        },() =>{
            formValue.image = this.fileWillBeUploaded.name;
            this.items$.update(this.id,formValue)
            .then((resolve)=>{
                this.dialog.closeAll();
                this.formIsSaved=true;
                this._router.navigate(["/Properties"]);
            }).catch((reject)=>{
            console.log(`updating is rejected`,reject)
            });
        }); 
  }
  setNullToUndefinedProperties(obj){
    Object.keys(obj).map((e)=>{
        if(!obj[e]){
            obj[e]=null;
        }
    });      
  }
  update(form){
    let formValue = form.value;
    this.setNullToUndefinedProperties(formValue);
    if(form.invalid)
    {
        return false;
    }
    if(this.fileErrorMessage){
        return false;
    }
    if(form.valid){
      
      if(this.item.image && !this.fileWillBeUploaded){
        formValue.image = this.item.image;  
      }
      if(this.fileWillBeUploaded){
          this.fileIsUploaded(formValue);
          return false;
      }
      this.items$.update(this.id,formValue).then((resolve)=>{
          console.log(`updating is done`); 
          }).catch((reject)=>{
          console.log(`updating is rejected`)
      });
      this.formIsSaved=true;
      this._router.navigate(["/Properties"]);
    }
  }

}
