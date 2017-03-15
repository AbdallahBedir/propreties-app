import { Component, OnInit ,trigger ,state
        ,transition,style,animate,keyframes} from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[
    trigger("home",[
      transition("void => *",[
          animate('.5s 0.2s ease-in',keyframes([
              style({opacity:0,transform:'translateY(-30px)',offset:0}),
              style({opacity:1,transform:'translateY(0)',offset:1}),
          ]))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  
  constructor(private _firebaseDervice:FirebaseService) {

  }

  ngOnInit() {
    
  }

}
