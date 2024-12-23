import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notificationmodal.component.html',
  styleUrl: './notificationmodal.component.scss'
})
export class NotificationModalComponent {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
