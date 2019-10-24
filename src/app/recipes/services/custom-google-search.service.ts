import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { SearchResult } from '../classes/search-result';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomGoogleSearchService {

  url = 'https://www.googleapis.com/customsearch/v1?';
  googleKey = 'AIzaSyBWb-bZ_6lHtbAPM3JVXSzciqzfR_4enuo';
  customSearchId = '012518412110002425811:7daj9rn7grt';

  resultItemsChanged: Observable<Array<SearchResult>>;
  totalItemsCountChanged: Observable<number>;
  private resultItemsBehavior: BehaviorSubject<Array<SearchResult>>;
  private totalItemsCountChangedBehavior: BehaviorSubject<number>;
  currentPage = 1;
  take = 10;
  start: number;
  query: string;

  constructor(private http: HttpClient) { 
    this.resultItemsBehavior = new BehaviorSubject<Array<SearchResult>>([])
    this.resultItemsChanged = this.resultItemsBehavior.asObservable()

    this.totalItemsCountChangedBehavior = new BehaviorSubject<number>(0);
    this.totalItemsCountChanged = this.totalItemsCountChangedBehavior.asObservable();
  }

  search(): Observable<{ items: SearchResult[], count: number }> {
    // tslint:disable-next-line: curly
    if (this.query === null || this.query === undefined) return;
    this.start = (this.currentPage - 1) * this.take + 1;
    return this.http.get<{ items: Array<SearchResult>, searchInformation: any }>(`${this.url}cx=${this.customSearchId}&key=${this.googleKey}&q=${this.query}&start=${this.start}`)
      .pipe(map(res => {
        const itemsArray = new Array<SearchResult>();
        const items = res.items;
        if (items && items.length) {
          items.forEach((item) => {
            const newItem = new SearchResult(item)
            itemsArray.push(newItem);
          });
        }
        this.resultItemsBehavior.next(itemsArray);
        this.totalItemsCountChangedBehavior.next(res.searchInformation.totalResults);
        return { items: itemsArray, count: res.searchInformation.totalResults };
      }))
  }

}
