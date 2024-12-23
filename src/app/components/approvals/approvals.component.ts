import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { DataService, ReviewSuggestion, VideoAndTags } from '../../services/data.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrl: './approvals.component.scss'
})
export class ApprovalsComponent implements OnInit {
  videos: VideoAndTags[];
  videoIdToDelete: string;

  constructor(private modalService: ModalService, private dataService: DataService) {

  }
  async ngOnInit() {
    let response = await firstValueFrom(this.dataService.getVideos());
    if (response.isSuccess) {
      this.videos = response.data;
    }
  }
  // Approve the video
  approve(video: any) {
    console.log('Video Approved:', video);
    let modalRef = this.modalService.openAddVideoModal();
    modalRef.afterClosed().subscribe(async thumbnail => {
      let req = new ReviewSuggestion();
      req.pass = true;
      req.videoId = video.videoId;
      req.thumbnail = thumbnail;
      let result = await firstValueFrom(this.dataService.reviewSuggestion(req));
      if (result.isSuccess) {
        this.videos = this.videos.filter(e => e.videoId != video.videoId);
      }
    })

  }

  // Deny the video
  async deny(video: VideoAndTags) {
    console.log('Video Denied:', video);
    let req = new ReviewSuggestion();
    req.pass = false;
    req.videoId = video.videoId;
    let result = await firstValueFrom(this.dataService.reviewSuggestion(req));
    if (result.isSuccess) {
      this.videos = this.videos.filter(e => e.videoId != video.videoId);
    }
  }

  async deleteVideo(){
    let result = await firstValueFrom(this.dataService.deleteVideo(this.videoIdToDelete));
    if (result.isSuccess) {
      this.modalService.openNotifactionModal(true, "Video deleted");
    }
    else{
      this.modalService.openNotifactionModal(false, "Error " + result.exceptionMessage);
    }
  }
}
