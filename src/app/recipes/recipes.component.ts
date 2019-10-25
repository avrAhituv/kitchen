import { Component, OnInit, OnDestroy, SecurityContext } from '@angular/core';
import { SpeechRecognitionService } from '../shared/services/speech-recognition.service';
import { CustomGoogleSearchService } from './services/custom-google-search.service';
import { SearchResult } from './classes/search-result';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit, OnDestroy {
  
  showSearchButton: boolean;
  inputSearch: string;
  result: Array<SearchResult> = [];
  totalResult: number;
  currentItemSelected: SearchResult;
  isSelected = false;

  resultSub: Subscription;
  totalSub: Subscription;
  constructor(private speechRecognitionService: SpeechRecognitionService, private googleSearch: CustomGoogleSearchService, private sanitizer: DomSanitizer) {
    this.showSearchButton = true;
    this.inputSearch = '';
    this.resultSub = this.googleSearch.resultItemsChanged.subscribe(result => this.result = result);
    this.totalSub = this.googleSearch.totalItemsCountChanged.subscribe(total => this.totalResult = total);
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.speechRecognitionService.DestroySpeechObject();
    if (this.resultSub) {
      this.resultSub.unsubscribe();
    }
    if (this.totalSub) {
      this.totalSub.unsubscribe();
    }
  }

  search() {
    this.googleSearch.query = this.inputSearch;
    this.googleSearch.search().subscribe((r) => console.info(r));
  }

  activateSpeechSearch(): void {
    this.showSearchButton = false;

    this.speechRecognitionService.record()
      .subscribe(
        // listener
        (value) => {
          this.inputSearch = value;
          console.log(value);
          this.speechRecognitionService.stop();
          this.search();
        },
        // errror
        (err) => {
          console.log(err);
          // tslint:disable-next-line: triple-equals
          if (err.error == 'no-speech') {
            console.log('--restatring service--');
            this.activateSpeechSearch();
          }
        },
        // completion
        () => {
          this.showSearchButton = true;
          console.log('--complete--');
          this.speechRecognitionService.stop();
        });
  }

  onItemSelected(item: SearchResult){
    console.log(item)
    this.currentItemSelected = item;
    this.isSelected = true;
  }
  showPageInIframe(url){
    console.log(url)
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  openInFullScreen(){
    
  }
}
