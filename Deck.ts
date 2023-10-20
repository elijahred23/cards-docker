

class Card{
    value: number;
    suit: number;

    constructor(value: number, suit: number){
       this.value = value; 
       this.suit = suit;
    } 
}


class Deck {
    deck: Card[];


    constructor(){

        this.setDeck();
        this.shuffle();
    }
    setDeck(){
        for(let value = 1; value <= 14; value++){
            for(let suit = 1; suit <= 4; suit++){
                let newCard:Card = new Card(value, suit);
                this.deck.push(newCard);
            }
        }
    }
    shuffle(){
        let tempDeck = [...this.deck];

        for(let i = tempDeck.length -1; i > 0; i--){
            const randomIndex = Math.floor(Math.random() * (i+1));
            
            [tempDeck[i], tempDeck[randomIndex]] = [tempDeck[randomIndex], tempDeck[i]];            
        }
        this.deck = tempDeck;
    }
    deal(){
        return this.deck.pop();
    }
}






module.exports = {Card, Deck};