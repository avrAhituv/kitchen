import { Injectable } from '@angular/core';
import { Capacitor, Plugins, FilesystemDirectory } from '@capacitor/core';
const { Filesystem } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  constructor() { }

  async readdir() {
    try {
      let ret = await Filesystem.readdir({
        path: 'secrets',
        directory: FilesystemDirectory.Documents
      });
      console.log(ret.files)
      return ret.files;
    } catch(e) {
      console.error('Unable to read dir', e);
    }
  }

}
