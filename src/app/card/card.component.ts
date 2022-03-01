import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/model/model';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card: Card;
  @Output() submit = new EventEmitter();

  answer : string = "";
  constructor() { }

  ngOnInit(): void {
  }

  submitanswer(): void{
    if (this.answer == this.card.answer) {
      
    } else {
      
    }
  }

}
