/// <reference path="../../declare.ts" />

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Song } from '../../models/song';
import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {
  player = null;
  currentPage = 1;  // 当前页码
  @Input() songs: Song[];
  @Input() pages: number[];

  @Output() changePage = new EventEmitter<number>();
  @Output() changeAlbum = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    this.player = new cplayer({
      element: document.getElementById('player'),
      width: '100%',
      playlist: [
        // {
        //   src: '歌曲资源链接...',
        //   poster: '封面链接...',
        //   name: '歌曲名称...',
        //   artist: '歌手名称...',
        //   lyric: '歌词...',
        //   sublyric: '副歌词，一般为翻译...',
        //   album: '专辑，唱片...'
        // }
      ]
    });
  }
  /**
   * 添加歌曲到播放器
   *
   * @param {Song} song 歌曲信息
   * @memberof SongListComponent
   */
  addToPlay(song: Song) {
    const music = {
      name: song.name,
      artist: song.artists[0].name,
      src: song.file,
      poster: song.album.cover,
      album: song.album.name
    };

    Materialize.toast('添加歌曲成功！', env.TOAST_DELAY);
    this.player.add(music);
  }
  /**
   * 跳转到页码
   *
   * @param {number} pageNum 页码
   * @memberof SongListComponent
   */
  goTo(pageNum: number) {
    this.currentPage = pageNum;
    this.changePage.emit(pageNum);
  }

}
