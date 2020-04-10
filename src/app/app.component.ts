import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  currImg = 1;
  isInFocus = false;
  lastFocus: Date;
  lastImgChange = new Date();
  timer: any;

  @HostListener('document:keyup', ['$event'])
  @HostListener('document:click', ['$event.target'])
  @HostListener('document:mousemove', ['$event.target'])
  @HostListener('document:touchstart', ['$event.target'])
  onKeyUp(ev: KeyboardEvent) {
    this.onChanged();
  }
  onClick(ev) {
    this.onChanged();
  }
  onMouseMove() {
    this.onChanged();
  }
  onTouchStart() {
    this.onChanged();
  }
  onChanged() {
    if (!this.isInFocus) {
      this.isInFocus = true;
      clearInterval(this.timer);
    }
    this.lastFocus = new Date();
    this.createTimer();
  }
  /**
   *
   */
  constructor(private sanitizer: DomSanitizer) { }
  ngOnInit(): void {
    this.createTimer();
  }
  createTimer() {
    this.timer = setInterval(() => {
      if (this.isInFocus && new Date(this.lastFocus.setSeconds(60)) < new Date()) {
        this.isInFocus = false;
      }
      // if (new Date(this.lastImgChange.setSeconds(10)) < new Date()) {
      //   this.currImg++;
      //   if (this.currImg > 7) {
      //     this.currImg = 0;
      //   }
      // }
    }, 60 * 1000);
  }

  ngOnDestroy(): void {

  }

  getCurrImg() { // center/100%
    const style = 'url(assets/img/SH' + (this.currImg ? this.currImg : '') + '.jpg) no-repeat 75% 70% fixed';
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }
}
