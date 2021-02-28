let should = require('chai').should();
let _ = require('lodash');
let game = require('../game.js');

function distinct(value, index, self) {
    return self.indexOf(value) === index
}

describe("Card constructor", function () {
    it('should create a card with a suit and a value', function () {
        let testCard = new game.Card("Hearts", "1");
        testCard.suit.should.equal("Hearts");
        testCard.faceValue.should.equal("1");
    });

    it("should fail if only one parameter is passed", function () {
        let testCard = function () { new game.Card("Hearts"); }
        testCard.should.throw(Error, "Must provide both a suit and a value");
    });
});

describe("Deck", () => {
    describe("constructor", () => {
        it("should create an array of cards", function () {
            let testDeck = new game.Deck(['a'], [1]);
            let expectedCards = [new game.Card('a', 1)];
            testDeck.cards.should.be.an("array");
            _.isEqual(testDeck.cards, expectedCards).should.equal(true);
        });
    });

    describe("shuffleDeck", function () {
        let suits = ['a', 'b', 'c'];
        let faceValues = [1, 2, 3, 4, 5];

        it("should not delete or duplicate any cards", function () {
            let testDeck = new game.Deck(suits, faceValues);
            let origOrder = [...testDeck.cards];

            testDeck.shuffleDeck();
            testDeck.cards.length.should.equal(origOrder.length);
            testDeck.cards.filter(distinct).length.should.equal(origOrder.length);
        });

        it("should randomize the order of the original cards", function () {
            let testDeck = new game.Deck(suits, faceValues);
            let origOrder = _.clone(testDeck.cards);

            testDeck.shuffleDeck();
            _.isEqual(testDeck.cards, origOrder).should.equal(false);
        });
    });
});
describe("Player", function () {
    describe('constructor', function () {
        it("Should create a player and assign a hand and points to that player", function () {
            let testPlayer = new game.Player('Bobby Bobberson')

            testPlayer.name.should.equal('Bobby Bobberson');
            testPlayer.points.should.equal(0);
            _.isEqual(testPlayer.hand, []).should.equal(true);
        });
    });
    describe("Describe Player", function () {
        it("Should display player name and player points", function () {
            let testPlayer = new game.Player('Luna Lovegood');

            testPlayer.describe().should.equal('Luna Lovegood has 0 points');
        });
    });
});
describe("Class War", function () {
    let buildWar = () => {
        let player1 = new game.Player("P1");
        let player2 = new game.Player("P2");
        return new game.War(player1, player2);
    }
    describe('constructor', function () {
        it("Should create two players", function () {
            let war = buildWar();
            war.player1.name.should.equal('P1');
            war.player2.name.should.equal('P2');
        });
        it("Should make a new deck", function () {
            let war = buildWar();
            war.deck.cards.should.be.a("array");
            war.deck.cards.length.should.equal(52);
        });
        it("Should rank cards in order based on their index in the array", function () {
            let war = buildWar();
            let testCard = new game.Card('a', 2);
            war.cardRanks[testCard.faceValue].should.equal(0);
        });
        it("Should not rank cards based on suit index", function () {
            let war = buildWar();
            let testCard1 = new game.Card('a', 2);
            let testCard2 = new game.Card('b', 2);
            war.cardRanks[testCard1.faceValue].should.equal(0);
            war.cardRanks[testCard2.faceValue].should.equal(0);
        });
    });
    describe("dealCards()", function () {
        it("Should split the deck in half and deal to both players", function () {
            let war = buildWar();
            war.dealCards();
            war.player1.hand.should.be.an("array");
            war.player1.hand.length.should.equal(26);
            war.player2.hand.should.be.an("array");
            war.player2.hand.length.should.equal(26);
        });
    });
    describe("playRound()", function () {
        it("Should take first index card from each player", function () {
            let war = buildWar();

            war.dealCards();
            let player1Card = war.player1.hand[1];
            let player2Card = war.player2.hand[1];

            war.playRound()
            war.player1.hand[0].should.equal(player1Card);
            war.player2.hand[0].should.equal(player2Card);
        });
    });
    describe("playGame()", function () {
        it("Should play round() until one player has no more cards in their hand", function () {
            let war = buildWar();
            war.playGame();


            war.player1.hand.length.should.equal(0) || war.player2.hand.length.should.equal(0);
        });
    });

});


