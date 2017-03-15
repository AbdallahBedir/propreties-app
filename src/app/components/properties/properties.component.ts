import { Component, OnInit, trigger ,state
        ,transition,style,animate,keyframes} from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {FirebaseService} from '../../services/firebase.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss'],
  animations:[
    trigger("properties",[
      transition("void => *",[
          animate('.5s 0.2s ease-in',keyframes([
              style({opacity:0,transform:'translateX(30px)',offset:0}),
              style({opacity:1,transform:'translateX(0)',offset:1}),
          ]))
      ])
    ])
  ]
})
export class PropertiesComponent implements OnInit {
  items:any[];

  constructor(private _firebaseService:FirebaseService,
              public route:ActivatedRoute) { 
      
  }

  ngOnInit() {
    this.route.data.subscribe(
      (data:{props:any[]}) => {
          this.items = data.props;
      }
    );  
  }

}
