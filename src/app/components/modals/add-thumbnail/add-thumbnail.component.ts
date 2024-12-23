import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-thumbnail',
  templateUrl: './add-thumbnail.component.html',
  styleUrl: './add-thumbnail.component.scss'
})
export class AddThumbnailComponent {
  link: string = '';
  
  constructor(private dialogRef: MatDialogRef<AddThumbnailComponent>) {}
  
  saveLink(): void {
    console.log('Link saved:', this.link);
    this.dialogRef.close(this.link);
  }
}
