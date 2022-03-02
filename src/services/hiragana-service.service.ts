import { Injectable } from '@angular/core';
import { Card, User } from 'src/model/model';
import json_data from 'src/data/hiragana.json'
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HiraganaService{

  //Full Progress = "aakkssttnnhhmmyyrrww"

  data = [...json_data];
  user$ = new BehaviorSubject<User>(null);

  constructor() { }

  getWords(progress: number) {
    let init_deck = this.getInitialDeckFromJson(progress);
    let duplicate_deck = this.getDuplicateWordForCategory(progress, init_deck);
    let completed_deck = this.getShuffleWords(duplicate_deck)
    return completed_deck;
  }

  getInitialDeckFromJson(progress) {
    let init_deck = [];
    if (progress <= 1) {
      //card position 0-4
      //progress position 0 or 1
      this.data.forEach((x,i) => { 
        if (i <= 4) {
          init_deck.push(x);
        }
      })
    }

    else if (progress <= 3) {
      //card position 5-9
      //progress position 2 or 3
      this.data.forEach((x,i) => { 
        if (i <= 9) {
          init_deck.push(x);
        }
      })
    }

    else if (progress <= 5) {
      //card position 10-14
      //progress position 4 or 5
      this.data.forEach((x,i) => { 
        if (i <= 14) {
          init_deck.push(x);
        }
      })
    }

    else if (progress <= 7) {
      //card position 15-19
      //progress position 6 or 7
      this.data.forEach((x,i) => { 
        if (i <= 19) {
          init_deck.push(x);
        }
      })
    }

    else if (progress <= 9) {
      //card position 20-24
      //progress position 8 or 9
      this.data.forEach((x,i) => { 
        if (i <= 24) {
          init_deck.push(x);
        }
      })
    }

    else if (progress <= 11) {
      //card position 25-29
      //progress position 10 or 11
      this.data.forEach((x,i) => { 
        if (i <= 29) {
          init_deck.push(x);
        }
      })
    }

    else if (progress <= 13) {
      //card position 30-34
      //progress position 12 or 13
      this.data.forEach((x,i) => { 
        if (i <= 34) {
          init_deck.push(x);
        }
      })
    }


    else if (progress <= 15) {
      //card position 35-37
      //progress position 14 or 15
      this.data.forEach((x,i) => { 
        if (i <= 37) {
          init_deck.push(x);
        }
      })
    }

    else if (progress <= 17) {
      //card position 38-42
      //progress position 16 or 17
      this.data.forEach((x,i) => { 
        if (i <= 42) {
          init_deck.push(x);
        }
      })
    }

    else if (progress <= 19) {
      //card position 43-47
       //progress position 18 or 19
       this.data.forEach((x,i) => { 
        if (i <= 47) {
          init_deck.push(x);
        }
      })
    }

    return init_deck;
  }

  getDuplicateWordForCategory(progress, init_deck) {
    let duplicate_deck = [];
   
    let repeat = 0;
    if (progress % 2 == 0) {
          repeat = 5;
    } else {
          repeat = 3;
    }
    
    if (init_deck.length - 1 == 4) {
      init_deck.forEach((x,i) => { 
        for (let times = 0; times < repeat; times++){
          duplicate_deck.push(x);
        }
      })
     
    } else if (init_deck.length - 1 == 37) {
      init_deck.forEach((x,i) => { 
        if (i < 35) {
          for (let times = 0; times < 3; times++){
            duplicate_deck.push(x);
          }
        } else {
          for (let times = 0; times < repeat; times++){
            duplicate_deck.push(x);
          }
        }
      })
      
    } else {
      init_deck.forEach((x,i) => { 
        if (i < init_deck.length - 5) {
          for (let times = 0; times < 3; times++){
            duplicate_deck.push(x);
          }
        } else {
          for (let times = 0; times < repeat; times++){
            duplicate_deck.push(x);
          }
        }
      })
    }

   

    console.log(duplicate_deck);
    return duplicate_deck;
    
  }

  getShuffleWords(array: Card[]) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      
      if (randomIndex > 0) {
        if (array[currentIndex].answer == array[randomIndex - 1].answer
          || array[currentIndex].answer == array[randomIndex + 1].answer) {
          continue;
        }
        // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
      } else {
        continue;
      }
    }
    return array;
  }

  get5RandomWordsFromUsedCard(currentDeck, usedDeck, falseCard) {
    for (let times = 0; times < 4; times++){
      let random = Math.floor(Math.random() * usedDeck.length);
      if (usedDeck[random].answer == currentDeck[currentDeck.length - 1].answer) {
        currentDeck.push(random == 0 ? usedDeck[random + 1] : usedDeck[random - 1])
      } else {
        currentDeck.push(usedDeck[random])
      }
    }
    currentDeck.push(falseCard)

  }

  submit(answer){
    let user = { ...this.user$.value };
    let date_now = new Date();
    //Check cooldown time
    if (date_now.getTime() < user.cooldownTimer.getTime()) {
      let remain_time = user.cooldownTimer.getTime() - date_now.getTime();
      alert(`Please wait ${remain_time / 1000 / 60} mins for your next level.`);
      return;
    }

    //If the current Time is over the finishTime, redo whole process
    
    let date_finished = user.finishTimer;
    if (date_now.getTime() > date_finished.getTime()) {
      let new_finish_time = date_now;
      let new_deck = this.getWords(user.progress);
      user.currentDeck = new_deck;
      new_finish_time.setHours(new_finish_time.getHours() + 1);
      user.finishTimer = new_finish_time;
      this.user$.next(user);
      return;
    }

    //If the answer is correct or not correct
    if (answer == user.currentDeck[0].answer) {
      let usedCard = user.currentDeck.shift();
      user.usedDeck.push(usedCard);
    } else {
      if (user.currentDeck[0].isFalse != true) {
        user.currentDeck[0].isFalse = true;
        if (user.currentDeck.length <= 5) {
          this.get5RandomWordsFromUsedCard(user.currentDeck,user.usedDeck,user.currentDeck[0])
        } else {
          user.currentDeck.push(user.currentDeck[0]);
        }
      } 
      return;
    }

    //If the current Deck is running out...
    //Insert Cooldown timer base on the progress they have, 1 hour for 0, 3 hour for 1.
    if (user.currentDeck.length == 0) {
      if (user.progress % 2 == 0) {
        date_now.setHours(date_now.getHours() + 1);
        user.cooldownTimer = date_now;
      } else {
        date_now.setHours(date_now.getHours() + 3);
        user.cooldownTimer = date_now;
      }
      user.progress = user.progress++
      let new_deck = this.getWords(user.progress);
      user.currentDeck = new_deck;
      user.usedDeck = [];
    }

    return;
  }

  

  getUser(){
    return JSON.parse(localStorage.getItem('hiragana_user'))
  }

  getProgress() {
    let user: User = JSON.parse(localStorage.getItem('hiragana_user'));
    return user.progress;
  }

  createNewUserProfile() {
    let date_now = new Date();
    date_now.setHours(date_now.getHours() + 1);
    let profile: User = {
      userName: "ABC",
      currentDeck: this.getWords(0),
      progress: 0,
      cooldownTimer: null,
      finishTimer: date_now,
      usedDeck: []
    }
    localStorage.setItem('hiragana_user', JSON.stringify(profile));
    this.user$.next(profile);

    //Run Finish Time Clock

  }
}
