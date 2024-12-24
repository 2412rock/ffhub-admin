import { Component, Inject } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddTagsToVideoReq, DataService, Tag } from '../../../services/data.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrl: './add-tag.component.scss'
})
export class AddTagComponent {
  title: string = '';
  link: string = '';
  searchTag: string = '';
  selectedTags: Tag[] = [];
  filteredTags: Tag[] = [];
  loading = false;

  constructor(
    private modalService: ModalService,
    private dialogRef: MatDialogRef<AddTagComponent>,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  async filterTags() {
    let result = await firstValueFrom(this.dataService.getTags(this.searchTag));
    if (result.isSuccess && result.data.length > 0) {
      this.filteredTags = result.data;
    }
    else if(result.data.length === 0){
      let newTag = new Tag();
      newTag.tagName = this.searchTag;
      this.filteredTags = [];
      this.filteredTags.push(newTag);
    }
  }

  addTag(tag: Tag) {
    if (!this.selectedTags.includes(tag)) {
      this.selectedTags.push(tag);
    }
    this.searchTag = '';
    this.filterTags();
  }

  async submit() {
    this.loading = true;
    let req = new AddTagsToVideoReq();
    req.tags = [];
    this.selectedTags.forEach(e => {
      req.tags.push(e.tagName);
    })
    req.videoId = this.data.videoId;

    let response = await firstValueFrom(this.dataService.addTagsToVideo(req));
    this.loading = false;
    this.close();

    if(response.isSuccess){
      this.modalService.openNotifactionModal(true, "Tags added");
    }
    else{
      this.modalService.openNotifactionModal(false, "Something went wrong " + response.exceptionMessage);
    }


    
  }

  removeVideoFromSelected(tag: any): void {

    this.selectedTags = this.selectedTags.filter((v) => v !== tag);
  }

  close(){
    this.dialogRef.close();
  }
}
