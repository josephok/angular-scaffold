import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  songs = { xiami: null };
  keyword = '';
  pages = [1];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }
  /**
   * 搜寻歌曲
   * @param {string} keyword 关键字
   * @memberof IndexComponent
   */
  searchSong(keyword: string, page: number = 1) {
    if (keyword) {
      this.keyword = keyword;
      this.apiService.search(keyword, page).subscribe(
        data => {
          // Read the result field from the JSON response.
          this.songs = data;
          const arr = Array.from(Array(Math.floor(this.songs.xiami.total / 10) + 1).keys());
          this.pages = arr.map((n) => n + 1);
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }

  changePage(pageNum: number) {
    this.searchSong(this.keyword, pageNum);
  }

}
