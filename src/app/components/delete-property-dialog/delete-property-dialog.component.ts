import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-delete-property-dialog',
  template: `
    <h2 md-dialog-title	>Are You sure?</h2>
    <md-dialog-content>	
        <p>
            Are you share you want to delete this photo from the database ?
        </p>
    </md-dialog-content>
    <md-dialog-actions>	
        <button md-raised-button (click)="dialogRef.close('Delete')" value="Delete" class="danger">Yes Delete It</button>
        <button md-raised-button value="Cancel" md-dialog-close>Cancel</button>
    </md-dialog-actions>	

  `,
  styleUrls: ['./delete-property-dialog.component.scss']
})
export class DeletePropertyDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<DeletePropertyDialogComponent>) {
    
   }

  ngOnInit() {
  }

}
