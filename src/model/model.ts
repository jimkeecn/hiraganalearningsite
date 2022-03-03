export class Card{
    category: boolean;
    answer: string;
    url: string;
    isFalse: boolean;
}

export class User{
    userName: string;
    currentDeck: Card[];
    usedDeck: Card[];
    progress: number; //1 == "a" , 2 = "aa"
    cooldownTimer: Date;
    finishTimer: Date;

    constructor(data) {
        this.userName = data.userName;
        this.currentDeck = data.currentDeck;
        this.usedDeck = data.usedDeck;
        this.progress = data.progress;
        this.cooldownTimer = new Date(data.cooldownTimer);
        this.finishTimer = new Date(data.finishTimer);
    }
}