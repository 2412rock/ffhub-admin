import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { Observable } from 'rxjs';
import { Maybe } from '../models/response/maybe';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private urlService: UrlService) {   }
  
  getComments(videoId: number): Observable<Maybe<Comment[]>>{
    return this.http.get<Maybe<Comment[]>>(`${this.urlService.getHttpBaseUrl()}/api/comments?videoId=${videoId}`);
  }

  postComment(req: PostCommentReq){
    return this.http.post<Maybe<string>>(`${this.urlService.getHttpBaseUrl()}/api/postcomment`, req);
  }

  deleteComment(videoId: number, commentId: number): Observable<Maybe<Comment[]>>{
    return this.http.delete<Maybe<Comment[]>>(`${this.urlService.getHttpBaseUrl()}/api/deletecomment?videoId=${videoId}&commentId=${commentId}`);
  }
}

export class Comment{
  public commentId: number;
  public commentText: string;
  public videoId: number;
}

export class PostCommentReq{
  public videoId: number;
  public commentText: string;
}