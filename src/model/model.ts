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
}