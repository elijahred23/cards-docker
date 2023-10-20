class Card{
    value: number;
    suit: number;

    constructor(value: number, suit: number){
       this.value = value; 
       this.suit = suit;
    } 
    getCard(){
        let value = this.getValue();
        let suit = this.getSuit().char;
        return `${value}${suit}`;
    }
    getValue(){
        if(this.value <= 10 && this.value >= 2){
            return this.value.toString();
        }
        switch(this.value){
            case 11: return 'J';
            case 12: return 'Q';
            case 13: return 'K';
            case 14: return 'A';
            default: return 'INVALID VALUE'; 
        }
    }
    getSuit(){
        switch(this.suit){
            case 1: return {char: '♣', string: 'Club'};
            case 2: return {char: '♦', string: 'Diamond'};
            case 3: return {char: '♥', string: 'Heart'};
            case 4: return {char:'♠', string: 'Spade'};
            default: return {char:'INVALID SUIT', string: 'INVALID SUIT'};
        }
    } 
}


export default Card;