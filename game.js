class Card {
    constructor(suit, faceValue) {
        if (!faceValue) throw new Error("Must provide both a suit and a value");
        this.faceValue = faceValue;
        this.suit = suit;
    }
}

class Deck {
    constructor(cardSuits, cardValues) {
        let cards = [];
        for (let s of cardSuits) {
            for (let v of cardValues) {
                cards.push(new Card(s, v));
            }
        }
        this.cards = cards
    }
    //loops through all cards gets index card is currently on and swaps in the old index
    shuffleDeck() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            var newIndex = Math.floor(Math.random() * (i + 1))
            var oldIndex = this.cards[newIndex];
            this.cards[newIndex] = this.cards[i];
            this.cards[i] = oldIndex;
        }
    }

}
//player will have name, points and each have their own array of cards
class Player {
    constructor(name) {
        this.name = name;
        this.points = 0;
        this.hand = [];
    }
    describe() {
        return `${this.name} has ${this.points} points`;
    }
}
//using classic playing cards create a new deck; shuffle deck; get card ranks

class War {
    suits = ['Spades', 'Heart', 'Club', 'Diamond'];
    faceValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.deck = new Deck(this.suits, this.faceValues);
        this.deck.shuffleDeck();
        this.cardRanks = this.rankCards();
        this.cardsInPlay = [];
    }

    //ranks cards based on their index in the array, so that we can compare the values later
    rankCards() {
        let cardRanks = {};
        for (let i = 0; i < this.faceValues.length; i++) {
            let v = this.faceValues[i]
            cardRanks[v] = i
        }
        return cardRanks
    }

    /*deal cards identifies the middle of the deck and splits it from beginning of deck array 
   to the middle for player 1 and middle point to end of array for player 2
   split the shuffled deck in two and push each half to the two players to create their decks
   */
    dealCards() {
        let deckMiddle = this.deck.cards.length / 2;
        this.player1.hand = this.deck.cards.slice(0, deckMiddle);
        this.player2.hand = this.deck.cards.slice(deckMiddle);
    }

    /*take card from beginning of each players array; push cards to cards in play array as a 
        "holding" array; compare each players card by assigned rank; depending who wins, send cards
        in play to the winning players array; if one card doesn't beat the other, draw two more cards and
        compare based on rank until there is winning card
        */
    playRound() {
        let player1Card = this.player1.hand.shift();
        let player2Card = this.player2.hand.shift();

        if (this.cardRanks[player1Card.faceValue] > this.cardRanks[player2Card.faceValue]) {
            this.player1.points += 1;
        } else if (this.cardRanks[player2Card.faceValue] > this.cardRanks[player1Card.faceValue]) {
            this.player2.points += 1;
        }
    }

    // play game will deal cards to players and play round until one of the players has run out of cards
    playGame() {
        this.player1.points = 0;
        this.player2.points = 0;
        this.dealCards();

        do this.playRound();
        while (this.player1.hand.length > 0 && this.player2.hand.length > 0)

        return this.declareWinner();
    }
    declareWinner() {
        return `${this.player1.describe()}\n${this.player2.describe()}`
    }
}

let war = new War(new Player('Abby'), new Player('computer'));
console.log(war.playGame());

exports.Card = Card
exports.Deck = Deck
exports.Player = Player
exports.War = War