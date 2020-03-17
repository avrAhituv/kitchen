import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { SearchResult } from '../../classes/search-result';
import { DomSanitizer } from '@angular/platform-browser';
import { combineLatest } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { map } from 'rxjs/operators';
import { CustomGoogleSearchService } from '../../services/custom-google-search.service';

@Component({
  selector: 'app-list-results',
  templateUrl: './list-results.component.html',
  styleUrls: ['./list-results.component.scss']
})
export class ListResultsComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() results: Array<SearchResult> = [];
  @Output() itemSelected: EventEmitter<SearchResult> = new EventEmitter<SearchResult>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  totalItems: number;
  sub: any;
  constructor(private sanitizer: DomSanitizer, public googleSearch: CustomGoogleSearchService) {
    // this.sub = this.googleSearch.totalItemsCountChanged.subscribe(total => this.totalItems = total);
    this.sub = combineLatest(
      this.googleSearch.resultItemsChanged,
       this.googleSearch.totalItemsCountChanged
       )
    .pipe(
      map(([items, count])=>{
        this.totalItems = count
      return items
    }));

    this.sub.subscribe(result=>{ 
      console.log(this.paginator)
    })
  }

  ngOnInit() {

  }
  ngAfterViewInit(): void {
    console.log(this.paginator)
    this.paginator.page.subscribe(() => {
      console.log(this.paginator)
      this.googleSearch.currentPage = this.paginator.pageIndex + 1;
      this.googleSearch.take = this.paginator.pageSize;
      this.googleSearch.search().subscribe(() => {
        
      });
    });
  }
  ngOnDestroy(): void {
    // if (this.sub) {
    //   this.sub.unsubscribe();
    // }
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
  getHtml(htmlString: string) {
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  }
  openLink(item: SearchResult) {
    this.itemSelected.emit(item);
  }
}
