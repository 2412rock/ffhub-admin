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
    return this.http.delete<Maybe<string>>(`${this.urlService.getHttpBaseUrl()}/api/delete?id=${id}`);
  }

  reviewSuggestion(req: ReviewSuggestion){
    return this.http.post<Maybe<string>>(`${this.urlService.getHttpBaseUrl()}/api/reviewSuggestion`, req);
  }
}

export class ReviewSuggestion{
  public pass: boolean;
  public videoId: number;
  public thumbnail: string;
}

export class VideoAndTags {
  public videoId: number;
  public title: string;
  public link: string;
  public thumbNail: string;
  public tags: string[];
}