export interface MusicData {
  xiami: any;
  qq?: any;
  netease?: any;
}

interface Album {
  id: string;
  cover: string;
  coverBig: string;
  coverSmall: string;
  name: string;
}

interface Artist {
  id: string;
  name: string;
}

export interface Song {
  id: string;  // 歌曲ID
  name: string; // 歌曲名
  artists: Artist[]; // 作者
  file: string; // 歌曲url
  album: Album; // 专辑
  needPay?: boolean; // 是否付费
}
