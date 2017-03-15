import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  host:{
    class:"loading"
  }
})
export class LoadingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
