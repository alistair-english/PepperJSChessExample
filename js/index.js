// ======== Defining Constants ========
USER_WRONG_MOVE_PHRASES = [
    "oops! Can't do that.",
    "I don't think you can do that!",
    "oh no! You can't move like that.",
    "oopsies, no can do.",
    "uh oh! You can't do that."
]

USER_CORRECT_MOVE_PHRASES = [
    "Nice move!",
    "Wow!",
    "Oof",
    "Incredible!",
    "Nice!",
    "I like it.",
    "Interesting..."
]

USER_MOVE_PHRASES = [
    "Your turn!",
    "You're up!",
    "Your go",
    "Take a move!"
]

PEPPER_MOVE_PHRASES = [
    "My turn!",
    "Hmm...",
    "Ok, here goes...",
    "", // Say nothing
]

USER_WIN_PHRASES = [
    "You win!",
    "Wow! You win!",
    "Congratulations! You win!",
    "I'm impressed!"
]

PEPPER_WIN_PHRASES = [
    "Yay! I win. Better luck next time."
]

PIECE_MAP = {
    'p': "Pawn",
    'k': "King",
    'n': "Knight",
    'q': "Queen",
    'b': "Bishop",
    'r': "Rook"
};

// ======== Helpers ========
Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

// ======== App Logic ========
var board;
var game = new Chess();

// Pepper makes a random move
var pepperMakeMove = function() {
    Pepper.say(PEPPER_MOVE_PHRASES.randomElement(), (result) => {
        var possibleMoves = game.moves();

        // game over
        if (possibleMoves.length === 0) return;

        move = game.move(possibleMoves.randomElement());

        Pepper.say(PIECE_MAP[move.piece] + " to " + move.to, (result) => {
            board.position(game.fen());
            if (game.in_checkmate()) {
                Pepper.say("Checkmate! " + PEPPER_WIN_PHRASES.randomElement(), (result) => {
                    // Go To play again page
                    window.location.replace("play_again.html");
                });
            } else if (game.in_check()) {
                Pepper.say("Check!", (result) => {});
            } else {
                Pepper.say(USER_MOVE_PHRASES.randomElement(), (result) => {});
            }
        });
    });
}

// validate user moves
var validUserMove = function(move) {
    // illegal move
    if (move === null) {
        Pepper.say(USER_WRONG_MOVE_PHRASES.randomElement(), (result) => {}); // run the say async while we return the piece
        return false;
    };

    // Check if the user won with that move
    if (game.in_checkmate()) {
        Pepper.say("Checkmate! " + USER_WIN_PHRASES.randomElement(), (result) => {
            // Go To play again page
            window.location.replace("play_again.html");
        });
    } else {
        Pepper.say(USER_CORRECT_MOVE_PHRASES.randomElement(), (result) => {
            pepperMakeMove();
        })
    }

    return true;
}

// User makes a move with the touchscreen
var onDrop = function(source, target) {
    // see if the move is legal
    var move = game.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });
    
    if (!validUserMove(move)) {
        return 'snapback';
    }
    
};

// do not pick up pieces if the game is overstyle="background-color:aqua"
// only pick up pieces for White
var onDragStart = function(source, piece, position, orientation) {
    if (game.in_checkmate() === true || game.in_draw() === true ||
      piece.search(/^b/) !== -1) {
      return false;
    }
};

// update the board position after the piece snap
// for castling, en passant, pawn promotion
var onSnapEnd = function() {
    board.position(game.fen());
};

var cfg = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
  };


$(document).ready(()=>{
    Pepper.say("Hi! Let's play some chess. You start.", (result) => {
        board = ChessBoard('board', cfg);
    });
});