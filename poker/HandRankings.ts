import Card from '../common/Card';

class HandRankings {
    constructor() {

    }
    isRoyalFlush(hand: Card[]): boolean {
        let suitCards = this.createSuitMap(hand, 9);
        console.log({suitCards});
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
        const suitCards: { [suit: number]: Card[] } = {
            1: [],
            2: [],
            3: [],
            4: [],
        };

        for (const card of hand) {
            suitCards[card.suit].push(card);
        }

        // Find the suit with at least 5 cards
        const straightFlushSuit = [1, 2, 3, 4].find((suit) => suitCards[suit].length >= 5);

        if (!straightFlushSuit) {
            return false; // No suit with 5 or more cards, no straight flush
        }

        const sortedCards = suitCards[straightFlushSuit].sort((a, b) => a.value - b.value);

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

    }
    isStraight(hand: Card[]) {

    }
    isThreeOfAKind(hand: Card[]) {

    }
    isTwoPair(hand: Card[]) {

    }
}

export default HandRankings;
