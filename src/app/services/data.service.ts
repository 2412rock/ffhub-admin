import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { Maybe } from '../models/response/maybe';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private urlService: UrlService) {   }
  
  getVideos(): Observable<Maybe<VideoAndTags[]>>{
    return this.http.get<Maybe<VideoAndTags[]>>(`${this.urlService.getHttpBaseUrl()}/api/videosuggestions`);
  }

  deleteVideo(id: string): Observable<Maybe<string>>{
    return this.http.delete<Maybe<string>>(`${this.urlService.getHttpBaseUrl()}/api/delete?id=${id}&adminPass=${localStorage.getItem('admin_pass')}`);
  }

  deleteTag(videoId: string, tag: string): Observable<Maybe<string>>{
    return this.http.delete<Maybe<string>>(`${this.urlService.getHttpBaseUrl()}/api/deletetag?videoId=${videoId}&tag=${tag}&adminPass=${localStorage.getItem('admin_pass')}`);
  }

  reviewSuggestion(req: ReviewSuggestion){
    req.adminPass = localStorage.getItem('admin_pass') as string;
    return this.http.post<Maybe<string>>(`${this.urlService.getHttpBaseUrl()}/api/reviewSuggestion`, req);
  }

  addTagsToVideo(req: AddTagsToVideoReq){
    req.adminPass = localStorage.getItem('admin_pass') as string;
    return this.http.post<Maybe<string>>(`${this.urlService.getHttpBaseUrl()}/api/addTags`, req);
  }

  getVideo(id: number): Observable<Maybe<VideoAndTags>>{
    return this.http.get<Maybe<VideoAndTags>>(`${this.urlService.getHttpBaseUrl()}/api/video?id=${id}`);
  }

  getTags(startsWith: string){
    return this.http.get<Maybe<Tag[]>>(`${this.urlService.getHttpBaseUrl()}/api/tags?query=${startsWith}`);
  }

}

export class ReviewSuggestion{
  public pass: boolean;
  public videoId: number;
  public thumbnail: string;
  public adminPass: string;
}

export class VideoAndTags {
  public videoId: number;
  public title: string;
  public link: string;
  public thumbNail: string;
  public tags: string[];
}

export class Tag{
  public tagName: string;
  public tagId: number;
}

export class AddTagsToVideoReq{
  public videoId: number;
  public tags: string[];
  public adminPass: string;
}