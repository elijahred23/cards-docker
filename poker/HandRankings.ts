import Card from '../common/Card';

class HandRankings{
    constructor(){

    }
    isRoyalFlush(hand: Card[]): boolean {
        const suitCards: { [suit: number]: Card[] } = {
          1: [],
          2: [],
          3: [],
          4: [],
        };
      
        for (const card of hand) {
          if (card.value >= 10) {
            suitCards[card.suit].push(card);
          }
        }
      
        if (![1, 2, 3, 4].some((suit) => suitCards[suit].length === 5)) {
          return false;
        }
      
        for (let suit = 1; suit <= 4; suit++) {
          if (suitCards[suit].length !== 5) {
            continue;
          }
      
          const sortedCards = suitCards[suit].sort((a, b) => a.value - b.value);
      
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
      
    isFourOfAKind(hand:Card[]){

    }
    isFullHouse(hand:Card[]){

    }
    isFlush(hand:Card[]){

    }
    isStraight(hand:Card[]){

    }
    isThreeOfAKind(hand:Card[]){

    }
    isTwoPair(hand:Card[]){

    }
}

export default HandRankings;
