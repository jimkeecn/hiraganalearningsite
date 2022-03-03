import { Component } from '@angular/core';
import { Card, User } from 'src/model/model';
import { HiraganaService } from 'src/services/hiragana-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hiraganalearningsite';
  card: Card;
  user:User;
  answer: string = "";
  constructor(public service :HiraganaService) {
    console.log(new Date().getHours())
    this.service.user$.subscribe(user => { 
      if (user) {
        this.user = user;
        this.setCard()
      }
    })
  }

  submitanswer(){
    let answer = this.service.submit(this.answer);
    if (answer == false) {
      alert('wrong');
    } else {
      this.setCard();
      this.answer = "";
    }
  }

  newProfile() {
    this.service.createNewUserProfile();
    this.user = this.service.getUser();
  }

  setCard() {
    //this.user = this.service.getUser();
    if (this.user) this.card = this.user.currentDeck[0];
  }
}
