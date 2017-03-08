import * as types from './types';
import RNFetchBlob from 'react-native-fetch-blob';
import * as Utils from '../helpers/utils';
import {AsyncStorage} from 'react-native';
import RNFS from 'react-native-fs';
import Config from '../config'

export function downloadMusic(song, url) {
    return async (dispatch) => {
      song.downloading = false;
      let songs = await Utils.getSongsFromStorage();
      if(Utils.findSongInCollection(song.id, songs)) return {};
      let dirs = RNFetchBlob.fs.dirs;
      const songRes = await RNFetchBlob
                      .config({
                        path: `${dirs.DocumentDir}/${song.id}.mp4`
                      })
                      .fetch('GET',`${Config.VIDEO_SERVER_URL}/${url}`, {
                      })
                      .progress((received, total) => {
                        dispatch(setProgress(received / total, song.id));
                      });
        const headers = songRes.respInfo.headers;

        const imgRes = await RNFetchBlob
                        .config({
                          path: `${dirs.DocumentDir}/${song.id}.jpg`
                        })
                        .fetch('GET', song.thumb, {
                        });
        song.downloading = false;
        let newSong = {...song};
        newSong.path = songRes.path();
        newSong.thumb = imgRes.path();
        songs = JSON.stringify([...songs, newSong]);
        await AsyncStorage.setItem('songs', songs);
        return dispatch(setSongs(JSON.parse(songs)));
    }
}

export function musicDownloaded(path) {
    return {
        type: types.DOWNLOADED,
        path
    }
}

export function getSongs() {
    return async(dispatch) => {
        let songs = await Utils.getSongsFromStorage();
        return dispatch(setSongs(songs));
    }
}

export function deleteSong(index, song) {
    return async(dispatch) => {
        let songs = await Utils.getSongsFromStorage();
        try {
            await RNFS.unlink(song.path);
            await RNFS.unlink(song.thumb);
            songs.splice(index, 1);
            await AsyncStorage.setItem('songs', JSON.stringify(songs));
            return dispatch(setSongs(songs));
        } catch (err) {
            //If song not fount in path
            songs.splice(index, 1);
            await AsyncStorage.setItem('songs', JSON.stringify(songs));
            return dispatch(setSongs(songs));
        }
    }
}

export function setSongs(songs) {
    return {
        type: types.SONGS,
        songs
    }
}

export function setProgress(progress, id) {
    return {
        type: types.PROGRESS,
        progress,
        id
    }
}

export function selectVideo(video) {
    return async(dispatch) => {
        let res = await fetch(`${Config.VIDEO_API_URL}/${video.id}`);
        res = await res.json();
        return dispatch(setSelectedVideo(res));
    };

}

export function setSelectedVideo(res) {
    console.log(res);
    return {
        type: types.SELECTVIDEO,
        video: res
    }
}


