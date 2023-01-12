import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skimmer',
  templateUrl: './skimmer.component.html',
  styleUrls: ['./skimmer.component.scss']
})
export class SkimmerComponent {
  @Input() text = "";

  currentWord = "skym";
}
