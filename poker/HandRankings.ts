import Card from '../common/Card';

class HandRankings {
    handRankMap: {[key: number]:string}
    constructor() {
        this.handRankMap = {
            10: 'Royal Flush',
            9: 'Straight Flush',
            8: 'Four-of-a-Kind',
            7: 'Full House',
            6: 'Flush',
            5: 'Straight',
            4: 'Three-of-a-Kind',
            3: 'Two Pair',
            2: 'One Pair',
            1: 'High Card',
        };
    }
    getHandValueString(hand:Card[]):string{
        let handValue = this.getHandValue(hand);
        return this.getHandRank(handValue);
    }
    getHandValue(hand: Card[]):number{
        if(this.isRoyalFlush(hand)){
            return 10;
        } else if(this.isStraightFlush(hand)){
            return 9;
        } else if(this.isFourOfAKind(hand)){
            return 8;
        }else if(this.isFullHouse(hand)){
            return 7;
        }else if(this.isFlush(hand)){
            return 6;
        }else if(this.isStraight(hand)){
            return 5;
        }else if(this.isThreeOfAKind(hand)){
            return 4;
        }else if(this.isTwoPair(hand)){
            return 3;
        }else if(this.isOnePair(hand)){
            return 2;
        }else if(this.isHighCard(hand)){
            return 1;
        }
        return 1;
    }
    getHandRank(handValue:number):string{
        return this.handRankMap[handValue];
    }
    isRoyalFlush(hand: Card[]): boolean {
        let suitCards = this.createSuitMap(hand, 9);

        if (![1, 2, 3, 4].some((suit) => {
            let suitArray = suitCards.get(suit);
            return suitArray != undefined && suitArray.length === 5;
            } 
        )) {
            return false;
        } 
        for (let suit = 1; suit <= 4; suit++) {
            let suitArray = suitCards.get(suit);

            if (suitArray !== undefined && suitArray.length !== 5) {
                continue;
            }

            const sortedCards = suitArray !== undefined ? suitArray.sort((a, b) => a.value - b.value): [];

            if (sortedCards[0].value === 10 && sortedCards[4].value === 14) {
                return true; // Found a royal flush!
            }
        }

        return false;
    }

    isStraightFlush(hand: Card[]): boolean {
        const suitCards = this.createCardMap(hand);
        // Find the suit with at least 5 cards
        const straightFlushSuit = [1, 2, 3, 4].find((suit) => {
            let suitArray = suitCards.get(suit);
            return suitArray !== undefined && suitArray.length >= 5;           
        } );

        if (!straightFlushSuit) {
            return false; // No suit with 5 or more cards, no straight flush
        }

        let straightFlushSuitedCardsArray = suitCards.get(straightFlushSuit);
        const sortedCards = straightFlushSuitedCardsArray != undefined ? straightFlushSuitedCardsArray.sort((a, b) => a.value - b.value) : [];

        for (let i = 0; i < sortedCards.length - 4; i++) {
            if (
                sortedCards[i].value === sortedCards[i + 1].value - 1 &&
                sortedCards[i + 1].value === sortedCards[i + 2].value - 1 &&
                sortedCards[i + 2].value === sortedCards[i + 3].value - 1 &&
                sortedCards[i + 3].value === sortedCards[i + 4].value - 1
            ) {
                return true; // Found a straight flush!
            }
        }

        return false;
    }
    createCardMap(hand: Card[]): Map<number, Card[]> {
        let cardMap = new Map();
        for (let card of hand) {
            if (cardMap.has(card.value)) {
                cardMap.get(card.value).push(card);
            } else {
                cardMap.set(card.value, [card])
            }
        }
        return cardMap;
    }
    createSuitMap(hand: Card[], greaterThan: number = 0): Map<number, Card[]>  {
        let suitMap = new Map();
        for(let card of hand){
            if(card.value > greaterThan){
                if(suitMap.has(card.suit)){
                    suitMap.get(card.suit).push(card);
                } else{ 
                    suitMap.set(card.suit, [card]);
                }
            }
        }

        return suitMap;
    }

    isFourOfAKind(hand: Card[]): boolean {
        let cardMap = this.createCardMap(hand);

        for (let value = 2; value <= 14; value++) {
            const cardArray = cardMap.get(value);
            if (cardArray !== undefined && cardArray.length > 3) {
                return true;
            }
        }
        return false;
    }
    isFullHouse(hand: Card[]) {
        const cardMap = this.createCardMap(hand);
        let hasThreeOfKind = false;
        let hasPair = false;

        for (let value = 2; value <= 14; value++) {
            if (cardMap.has(value)) {
                const cards = cardMap.get(value);
                if (cards == undefined) {
                    continue;
                }
                else if (cards.length === 3) {
                    if (hasThreeOfKind == true) {
                        hasPair = true;
                    } else {
                        hasThreeOfKind = true;
                    }
                } else if (cards.length === 2) {
                    hasPair = true;
                }
            }

            // If you found both a Three of a Kind and a Pair, it's a Full House
            if (hasThreeOfKind && hasPair) {
                return true;
            }
        }

        return false;
    }

    isFlush(hand: Card[]) {
        let suitCards = this.createSuitMap(hand);
        for(let suit = 1; suit <=4; suit++){
            let suitArray = suitCards.get(suit);
            if(suitArray != undefined && suitArray.length > 4){
                return true;
            }
        }
        return false;
    }
    isStraight(hand: Card[]) {
        let sortedHand = hand.sort((a,b)=> a.value - b.value);
        let straightCounter = 0;
        for(let index = 0; index < sortedHand.length - 1; index++){
            let currentCard = sortedHand[index];
            let nextCard = sortedHand[index+1];
            if(currentCard.value === nextCard.value){
               continue; 
            }
            if(currentCard.value + 1 == nextCard.value){
                straightCounter++;
            } else {
                straightCounter = 0;
            }
        }
        return straightCounter >= 5;
    }
    isThreeOfAKind(hand: Card[]) {
        let cardMap = this.createCardMap(hand);
        for(let value = 2; value <= 14; value++){
            let cardArray = cardMap.get(value);
            if(cardArray !== undefined && cardArray.length === 3)
                return true;
        }
        return false;
    }
    isTwoPair(hand: Card[]) {
        let cardMap = this.createCardMap(hand);
        let pairCounter = 0;
        for(let value = 2; value <= 14; value++){
            let cardArray = cardMap.get(value);
            if(cardArray !== undefined && cardArray.length === 2)
               pairCounter++; 
        }
        return pairCounter >= 2;
    }
    isOnePair(hand: Card[]){
        let cardMap = this.createCardMap(hand);
        for(let value = 2; value <= 14; value++){
            let cardArray = cardMap.get(value);
            if(cardArray !== undefined && cardArray.length === 2)
                return true;
        }
        return false;
    }
    isHighCard(hand: Card[]){
        return true;
    }
}

export default HandRankings;
