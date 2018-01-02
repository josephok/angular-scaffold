import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { MusicData } from '../models/song';


@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  search(keyword: string, page: number = 1): Observable<MusicData> {
    const url = `${environment.MUSIC_URL}/api/search/song/all`;
    let params = new HttpParams();
    params = params.append('key', `${keyword}`);
    params = params.append('limit', '10');
    params = params.append('page', page.toString());

    return this.http.get<MusicData>(url, { params: params });
  }

  getAlbum(album: number): Observable<MusicData> {
    const url = `${environment.MUSIC_URL}/api/get/album/xiami`;
    let params = new HttpParams();
    params = params.append('id', album.toString());
    return this.http.get<MusicData>(url, { params: params });
  }

  // 测试用
  test() {
    const url = `${environment.USER_URL}/api`;
    return this.http.get(url);
  }

}
