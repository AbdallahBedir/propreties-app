import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-update-image-dialog',
  templateUrl: './update-image-dialog.component.html',
  styleUrls: ['./update-image-dialog.component.scss']
})
export class UpdateImageDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<UpdateImageDialogComponent>) { }

  ngOnInit() {
  }

}
