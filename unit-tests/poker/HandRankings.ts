import HandRankings from "../../poker/HandRankings";
import Card from "../../common/Card";

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