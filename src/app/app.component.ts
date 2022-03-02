import { Component } from '@angular/core';
import { HiraganaService } from 'src/services/hiragana-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hiraganalearningsite';

  answer: string = "";
  constructor(public service :HiraganaService) {
    console.log(new Date().getHours())
  }


  testGetCard() {
    this.service.getWords(3);
  }
  submitanswer(){

  }
}
