import {Component, Input, OnDestroy} from '@angular/core';
import Timeout = NodeJS.Timeout;

@Component({
  selector: 'app-skimmer',
  templateUrl: './skimmer.component.html',
  styleUrls: ['./skimmer.component.scss']
})
export class SkimmerComponent implements OnDestroy {
  @Input() text = "";
  words: string[] = [];
  wpm = 200;
  i = 0;
  currentWord() {
    return this.words[this.i];
  }

  started = false;
  paused = false;
  skimmerJob?: Timeout;

  showComplete = false;

  startSkimmer() {
    this.started = true;
    this.paused = false;

    this.words = this.text.split(/ +/);
    this.showNext();
  }

  pauseSkimmer() {
    this.paused = true;
    clearTimeout(this.skimmerJob);
  }

  resumeSkimmer() {
    this.paused = false;
    this.showNext();
  }

  skip(seconds: number) {
    this.i += (this.wpm / 60) * seconds;
    this.i = Math.round(Math.max(0, Math.min(this.i, this.words.length)));
  }

  private showNext() {
    if (this.i >= this.words.length) {
      this.stopSkimmer();
      this.showComplete = true;
      setTimeout(() => {
        this.showComplete = false;
      }, 1000);
    } else {
      this.skimmerJob = setTimeout(() => {
        this.i++;
        this.showNext();
      }, (60 / this.wpm) * 1000);
    }
  }

  stopSkimmer() {
    this.started = false;
    this.paused = false;

    clearTimeout(this.skimmerJob);
    this.words = [];
    this.i = 0;
  }

  ngOnDestroy(): void {
    this.stopSkimmer();
  }
}
