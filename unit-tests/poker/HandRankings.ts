import HandRankings from "../../poker/HandRankings";
import Card from "../../common/Card";
import Deck from "../../common/Deck";

let handRank = new HandRankings();
let hand:Card[] = [
    new Card(10,1),
    new Card(11,1),
    new Card(12,1),
    new Card(13,1), 
    new Card(14,1),
];



console.log(handRank.isRoyalFlush(hand));

hand = [
    new Card(4,1),
    new Card(4,2),
    new Card(4,3),
    new Card(4,4),
    new Card(5,1),
];

console.log("IS FOUR OF A KIND: " + handRank.isFourOfAKind(hand));
function getRandomCards(numCard:number):Card[]{
    let deck = new Deck();
    let cardArray:Card[] = [];
    for(let i = 0; i < numCard; i++){
        let card:Card = deck.deal() as Card;
        cardArray.push(card);
    }
    return cardArray;
}
function getHandRankingTest(numTests:number){
    for(let i = 0; i < numTests; i++){
        let cards:Card[] = getRandomCards(8);
        let handRankValue = handRank.getHandValueString(cards);
        console.log("HAND RANKING: " + handRankValue);
        cards.forEach(card=>console.log(card.getCard()));
         
    }
}

getHandRankingTest(5);