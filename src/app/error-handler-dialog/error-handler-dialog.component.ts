import { Component, Inject, Optional  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { CustomError } from '../classes/error';

@Component({
  selector: 'error-handler-dialog',
  templateUrl: './error-handler-dialog.component.html',
  styleUrls: ['./error-handler-dialog.component.scss']
})
export class ErrorHandlerDialogComponent  {

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: CustomError,
    @Optional() public dialogRef: MatDialogRef<ErrorHandlerDialogComponent>) {
  }

  /**
   * Closes dialog
   * 
   * @returns void
   */
  reloadPage(): void {
    this.dialogRef.close();
  }

}
