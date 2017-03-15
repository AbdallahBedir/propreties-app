import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-can-deactivate-edit-dialog',
  template: `
        <h2 md-dialog-title	>You are leaving?</h2>
        <md-dialog-content>	
            <p>
                  You're updated some data without saving it <br> Are you sure you want
                  to leave without saving ?
            </p>
        </md-dialog-content>
        <md-dialog-actions>	
            <button md-raised-button (click)="dialogRef.close(true)" value="Yes" class="danger">Yes</button>
            <button md-raised-button value="No" md-dialog-close>No</button>
        </md-dialog-actions>
  `,
  styleUrls: ['./can-deactivate-edit-dialog.component.scss']
})
export class CanDeactivateEditDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<CanDeactivateEditDialogComponent>) { }

  ngOnInit() {
  }

}
