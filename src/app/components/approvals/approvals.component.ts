import { Component } from '@angular/core';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrl: './approvals.component.scss'
})
export class ApprovalsComponent {
  videos = [
    {
      title: 'Video 1',
      link: 'https://www.example.com/video1',
      tags: ['tag1', 'tag2', 'tag3']
    },
    {
      title: 'Video 2',
      link: 'https://www.example.com/video2',
      tags: ['tag2', 'tag3', 'tag4']
    },
    {
      title: 'Video 3',
      link: 'https://www.example.com/video3',
      tags: ['tag1', 'tag4', 'tag5']
    }
  ];

  // Approve the video
  approve(video: any) {
    console.log('Video Approved:', video);
  }

  // Deny the video
  deny(video: any) {
    console.log('Video Denied:', video);
  }
}
