import { Component, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { CustomError } from '../classes/error';

@Component({
  selector: 'error-handler-dialog',
  templateUrl: './error-handler-dialog.component.html',
  styleUrls: ['./error-handler-dialog.component.scss']
})
export class ErrorHandlerDialogComponent  {

  constructor(@Inject(MAT_DIALOG_DATA) public data: CustomError,
    private dialogRef: MatDialogRef<ErrorHandlerDialogComponent>) {
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
