// create class Board
class Board {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }
    get playerBoard() {
        return this._playerBoard;
    }
    flipTile = (rowIndex, columnIndex) => {
        if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
            console.log('This tile has already been flipped!');
            return;
        } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
            this._playerBoard[rowIndex][columnIndex] = 'B';
            return;
        } else {
            this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
        }
        this._numberOfTiles--;
    }// end of flipTile function
    getNumberOfNeighborBombs = function(rowIndex, columnIndex) {
        const neighborOffsets = [
            [-1,-1],
            [-1,0],
            [-1,1],
            [0,-1],
            [0,1],
            [1,-1],
            [1,0],
            [1,1]
        ];
        const numberOfRows = this._bombBoard.length;
        const numberOfColumns = this._bombBoard[0].length;
        let numberOfBombs = 0;
        neighborOffsets.forEach(offset => {
            const neighborRowIndex = rowIndex + offset[0];
            const neighborColumnIndex = columnIndex + offset[1];
            if (neighborRowIndex >= 0 && neighborRowIndex <  numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
                if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
                    numberOfBombs++;
                }
            }
        });
        return numberOfBombs;
    }// end of getNumberOfNeighborBombs function
    hasSafeTiles() {
        return this._numberOfTiles !== this._numberOfBombs;
    }
}// end of class Board



// generate empty game board
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
    let board = [];
    for (let rowIndex = 0; rowIndex<numberOfRows; rowIndex++) {
        let row = [];
        for (let columnIndex = 0; columnIndex<numberOfColumns; columnIndex++) {
            row.push(' ');
        } 
        board.push(row);
    } 
    return board;
};

// generate bomb board
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
    let board = [];
    for (let rowIndex = 0; rowIndex<numberOfRows; rowIndex++) {
        let row = [];
        for (let columnIndex = 0; columnIndex<numberOfColumns; columnIndex++) {
            row.push(null);
        } 
        board.push(row);
    } 

    let numberOfBombsPlaced = 0;

    // place random bombs on the board - this can place bombs on top of bombs at the moment
    while (numberOfBombsPlaced < numberOfBombs) {
        let randomRowIndex = Math.floor(Math.random() * numberOfRows);
        let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
            board[randomRowIndex][randomColumnIndex] = 'B';
            numberOfBombsPlaced++;
        }
        
    }
    return board;
};

// determine neighbor bombs


// user flip tile


// create game board
const printBoard = board => {
    console.log(board.map(row  => row.join(' | ')).join('\n'));
};


let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);
console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 0, 1);
console.log('Updated Player Board: ');
printBoard(playerBoard);
