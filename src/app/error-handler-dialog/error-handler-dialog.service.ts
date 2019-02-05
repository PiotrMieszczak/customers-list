import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ErrorHandlerDialogComponent } from './error-handler-dialog.component';
import { CustomError } from '../classes/error';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ErrorDialogService {
  public dialogRef;

  constructor(public _dialog: MatDialog, private _router: Router) {}

  /**
   * Opens error dialog
   * 
   * @param  {CustomError} data
   * @returns void
   */
  openDialog(data: CustomError): void {
    this.dialogRef = this._dialog.open(ErrorHandlerDialogComponent, {
      width: '600px',
      disableClose: true,
      data: data
    });

    // navigates to main page
    this.dialogRef.afterClosed().subscribe(() => {
      this._router.navigate(['/']);
    });
  }
}