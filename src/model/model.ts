export class Card{
    category: boolean;
    answer: string;
    url: string;
}

export class User{
    userName: string;
    currentDeck: Card[];
    progress: any[];
    cooldownTimer: Date;
    finishTimer: Date;
}