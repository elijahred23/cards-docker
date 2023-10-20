import Card from './Card';

class Deck {
    deck: Card[];
    
    constructor(){
        this.setDeck();
        this.shuffle();
    }
    setDeck(){
        this.deck = [];
        for(let value = 2; value <= 14; value++){
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
    show(){
        for(let card of this.deck){
            console.log({card});
        }
    }
    getSize(){
        return this.deck.length;
    }
}

export default Deck;