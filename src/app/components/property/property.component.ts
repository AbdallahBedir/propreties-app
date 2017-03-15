import { Component, OnInit, trigger ,state
        ,transition,style,animate,keyframes } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { FirebaseObjectObservable ,FirebaseListObservable} from 'angularfire2';
import 'rxjs/add/operator/map';
import { MdDialog } from '@angular/material';
import { DeletePropertyDialogComponent } from '../delete-property-dialog/delete-property-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss'],
  animations:[
    trigger("property",[
      transition("void => *",[
          animate('.5s 0.2s ease-in',keyframes([
              style({opacity:0,transform:'translateX(30px)',offset:0}),
              style({opacity:1,transform:'translateX(0)',offset:1}),
          ]))
      ])
    ])
  ]
})
export class PropertyComponent implements OnInit {
  id:any;
  property;
  item:any={};
  items$:FirebaseListObservable<any>;
  imgSrc:string=null;
  IsImageExist=true;

  constructor(private _activatedRoute:ActivatedRoute,
              private _firebaseService:FirebaseService,
              public  dialog: MdDialog,
              public  _router:Router){

        this.id = this._activatedRoute.snapshot.params["id"];
        this._firebaseService.getObject(this.id).subscribe(
            data => {
                this.item = data;
                if(data.image){
                    this._firebaseService.getFileFromStorage(data.image).then((url)=>{
                        this.IsImageExist=true;
                        this.imgSrc = url;
                    }).catch(()=>{
                        this.IsImageExist=false;
                    })
                }
                else{
                    this.IsImageExist=false;
                }
            },
            error => {console.log(`error while getting the property details`)},
            () =>  {}
        );

  }
  ngOnInit() {
        this.items$ = this._firebaseService.getList();
  }
  openDialog() {
      let dialogRef = this.dialog.open(DeletePropertyDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if(result == 'Delete'){
            if(this.IsImageExist){
                this._firebaseService.deleteFile(this.item.image);
            }
            this.items$.remove(this.id);  
            this._router.navigate(["/Properties"]);
        }
        else{
            return false;
        }
      });
  }

}
