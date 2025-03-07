import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { DataService, Tag } from '../../services/data.service';
import { firstValueFrom } from 'rxjs';
import { CommentService, Comment } from '../../services/comment.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss'
})
export class VideoComponent implements OnInit {
  videoId!: string;
  videoUrl!: string;
  thumbnail: string = "";
  searchQuery: string = '';

  loading = false;
  title: string = "";
  videoTags: string[];
  show404 = false;
  commentText = "";
  comments: Comment[];

  constructor(private route: ActivatedRoute, private router: Router, 
    private modalService: ModalService, private dataService: DataService,
    private commentsService: CommentService) {}

  async ngOnInit() {
    this.videoId = this.route.snapshot.paramMap.get('id')!;
    let result = await firstValueFrom(this.dataService.getVideo(Number(this.videoId)));
    if(result.isSuccess){
      this.videoUrl = result.data.link;
      this.title = result.data.title;
      this.videoTags = result.data.tags;
      this.thumbnail = result.data.thumbNail;
    }
    else{
      this.show404 = true;
    }
    let commentsResult = await firstValueFrom(this.commentsService.getComments(Number(this.videoId)));
    if(commentsResult.isSuccess){
      this.comments = commentsResult.data;
    }
  }

  playVideo() {
    window.open(this.videoUrl, '_blank');
  }

  goHome(){
    console.log("go home")
    this.router.navigate(['./home'])
  }


  addVideo(){
    this.modalService.openAddVideoModal();
  }

  async removeVideoFromSelected(tag: string) {
    console.log("remoive")
    let response = await firstValueFrom(this.dataService.deleteTag(this.videoId, tag));
    if(response.isSuccess){
      this.videoTags = this.videoTags.filter((v) => v !== tag);
    }
    else{
      this.modalService.openNotifactionModal(false, "Something went wrong " + response.exceptionMessage);
    }
  }

  addTags(){
    console.log("add tags")
    this.modalService.openAddTagsModal(Number(this.videoId));
  }

  async deleteComment(comment: Comment){
    let response = await firstValueFrom(this.commentsService.deleteComment(Number(this.videoId), comment.commentId));
    if(response.isSuccess){
      this.comments = this.comments.filter(e => e.commentId != comment.commentId);
    }
  }
}
