class TicTacToe {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = { X: 0, O: 0 };
        
        this.winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.createBoard();
        this.bindEvents();
        this.updateDisplay();
    }
    
    createBoard() {
        const gameBoard = document.querySelector('.game-board');
        gameBoard.innerHTML = '';
        
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.setAttribute('data-index', i);
            gameBoard.appendChild(cell);
        }
    }
    
    bindEvents() {
        const cells = document.querySelectorAll('.cell');
        const resetButton = document.getElementById('reset-game');
        const resetScoreButton = document.getElementById('reset-score');
        
        cells.forEach(cell => {
            cell.addEventListener('click', this.handleCellClick.bind(this));
        });
        
        resetButton.addEventListener('click', this.resetGame.bind(this));
        resetScoreButton.addEventListener('click', this.resetScore.bind(this));
    }
    
    handleCellClick(event) {
        const cell = event.target;
        const cellIndex = parseInt(cell.getAttribute('data-index'));
        
        if (this.board[cellIndex] !== '' || !this.gameActive) {
            return;
        }
        
        this.makeMove(cellIndex, cell);
    }
    
    makeMove(index, cellElement) {
        this.board[index] = this.currentPlayer;
        cellElement.textContent = this.currentPlayer;
        cellElement.classList.add(this.currentPlayer.toLowerCase());
        
        if (this.checkWinner()) {
            this.gameActive = false;
            this.scores[this.currentPlayer]++;
            this.highlightWinningCells();
            this.updateGameStatus(`Player ${this.currentPlayer} wins! 🎉`);
            this.updateScoreDisplay();
        } else if (this.checkDraw()) {
            this.gameActive = false;
            this.updateGameStatus("It's a draw! 🤝");
        } else {
            this.switchPlayer();
            this.updateGameStatus(`Player ${this.currentPlayer}'s turn`);
        }
    }
    
    checkWinner() {
        for (let condition of this.winningConditions) {
            const [a, b, c] = condition;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                return true;
            }
        }
        return false;
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== '');
    }
    
    highlightWinningCells() {
        for (let condition of this.winningConditions) {
            const [a, b, c] = condition;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                const cells = document.querySelectorAll('.cell');
                cells[a].classList.add('winning');
                cells[b].classList.add('winning');
                cells[c].classList.add('winning');
                break;
            }
        }
    }
    
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateDisplay();
    }
    
    updateDisplay() {
        document.getElementById('current-player').textContent = this.currentPlayer;
        document.getElementById('current-player').style.color = this.currentPlayer === 'X' ? '#e74c3c' : '#3498db';
    }
    
    updateGameStatus(message) {
        const statusElement = document.getElementById('game-status');
        statusElement.textContent = message;
        statusElement.className = 'game-status';
        
        if (message.includes('wins')) {
            statusElement.classList.add('winner');
        } else if (message.includes('draw')) {
            statusElement.classList.add('draw');
        } else {
            statusElement.classList.add('current-turn');
        }
    }
    
    updateScoreDisplay() {
        document.getElementById('score-x').textContent = this.scores.X;
        document.getElementById('score-o').textContent = this.scores.O;
    }
    
    resetGame() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
        });
        
        this.updateDisplay();
        this.updateGameStatus(`Player ${this.currentPlayer}'s turn`);
    }
    
    resetScore() {
        this.scores = { X: 0, O: 0 };
        this.updateScoreDisplay();
        this.resetGame();
    }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});






