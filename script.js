document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("board");
    const cells = document.querySelectorAll(".cell");
    const status = document.getElementById("status");
    const resetButton = document.getElementById("resetButton");

    let currentPlayer = "X";
    let boardState = ["", "", "", "", "", "", "", "", ""]; // Represents the current state of the board

    // Add click event listeners to each cell
    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            const index = parseInt(cell.id.split("-")[1]);
            if (boardState[index] === "") {
                boardState[index] = currentPlayer;
                cell.textContent = currentPlayer;
                checkWin();
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                status.textContent = `Player ${currentPlayer}'s turn`;
            }
        });
    });

    // Function to check if there is a winner
    // Function to check if there is a winner
    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                const winner = currentPlayer === "X" ? "Player X" : "Player O";
                window.alert(`${winner} wins!`);
                cells.forEach(cell => cell.style.pointerEvents = "none"); // Disable further clicks
                return;
            }
        }

        // Check for draw
        if (!boardState.includes("")) {
            window.alert("It's a draw!");
        }
    }


    // Reset game button functionality
    resetButton.addEventListener("click", () => {
        boardState = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => {
            cell.textContent = "";
            cell.style.pointerEvents = "auto";
        });
        currentPlayer = "X";
        status.textContent = `Player ${currentPlayer}'s turn`;
    });
});

