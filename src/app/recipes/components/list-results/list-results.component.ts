import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchResult } from '../../classes/search-result';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-list-results',
  templateUrl: './list-results.component.html',
  styleUrls: ['./list-results.component.scss']
})
export class ListResultsComponent implements OnInit {
  @Input() results: Array<SearchResult> = [];
  @Output() itemSelected: EventEmitter<SearchResult> = new EventEmitter<SearchResult>();
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }
  getImage(result: SearchResult) {
    let srcImg = ''
    if (result.pagemap) {
      if (result.pagemap.cse_image && result.pagemap.cse_image.length) {
        srcImg = result.pagemap.cse_image[0].src;
      } else if (result.pagemap.cse_thumbnail && result.pagemap.cse_thumbnail.length) {
        srcImg = result.pagemap.cse_thumbnail[0].src;
      }
    } else {
      srcImg = ''
    }
    return this.sanitizer.bypassSecurityTrustUrl(srcImg);
  }
  getHtml(htmlString: string){
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  }
  openLink(item: SearchResult) {
    this.itemSelected.emit(item);
  }
}
