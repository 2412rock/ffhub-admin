import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddThumbnailComponent } from '../components/modals/add-thumbnail/add-thumbnail.component';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }

  openAddVideoModal(): MatDialogRef<AddThumbnailComponent> {
    return this.dialog.open(AddThumbnailComponent, {
      data: {
        title: ""
      },
      panelClass: 'custom-dialog-surface'
    });
  }

  // openNotifactionModal(success: boolean, message: string): MatDialogRef<NotificationModalComponent> {
  //   return this.dialog.open(NotificationModalComponent, {
  //     data: {
  //       success,  // Pass success status
  //       message,    // Pass the message to display in the modal
  //     },
  //     panelClass: 'custom-dialog-surface'
  //   });
  // }
}
