import HandRankings from "../../poker/HandRankings";
import Card from "../../common/Card";

let handRank = new HandRankings();
let hand:Card[] = [
    new Card(10,1),
    new Card(11,1),
    new Card(12,1),
    new Card(13,1), 
    new Card(14,2),
];



console.log(handRank.isRoyalFlush(hand));