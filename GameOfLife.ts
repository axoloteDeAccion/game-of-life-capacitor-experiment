class GameOfLifeTS {
    cellSize = 5;
    deadColor = '#6cc8f6';
    aliveColor = "#df47ce";
    cellsInColumn: number;
    cellsInRows: number;
    active: number[][] = [];
    inactive: number[][] = [];
    context: CanvasRenderingContext2D;

    constructor(board: HTMLCanvasElement) {
        this.cellsInColumn = Math.floor(board.width / this.cellSize);
        this.cellsInRows = Math.floor(board.height / this.cellSize);
        this.context = board.getContext("2d") as CanvasRenderingContext2D;
    }

    arrayInitialization() {
        // TODO This seems to have been already taken care of in the new standard lib. Check that out
        this.active = Array.from({ length: this.cellsInRows }, () => (
            Array.from({ length: this.cellsInColumn }, () => 0)
        ));

        this.inactive = this.active.slice();
    }

    arrayRandomize() {
        this.active.forEach((x, i) => {
            x.forEach((_, j) => {
                this.active[i][j] = (Math.random() > 0.5) ? 1 : 0;
            })
        })
    }

    fillArray() {
        this.active.forEach((x, i) => {
            x.forEach((y, j) => {
                let color: string;
                if(y == 1)
                    color = this.aliveColor;
                else
                    color = this.deadColor;
                this.context.fillStyle = color;
                this.context.fillRect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
            })
        });
    }

    setCellValueHelper(row: number, col: number): number {
        try {
            return this.active[row][col];
        }
        catch {
            return 0;
        }
    }

    countNeighbours(row: number, col: number): number {
        let totalNeighbours = 0;
        totalNeighbours += this.setCellValueHelper(row - 1, col - 1);
        totalNeighbours += this.setCellValueHelper(row - 1, col);
        totalNeighbours += this.setCellValueHelper(row - 1, col + 1);
        totalNeighbours += this.setCellValueHelper(row, col - 1);
        totalNeighbours += this.setCellValueHelper(row, col + 1);
        totalNeighbours += this.setCellValueHelper(row + 1, col - 1);
        totalNeighbours += this.setCellValueHelper(row + 1, col);
        totalNeighbours += this.setCellValueHelper(row + 1, col + 1);
        return totalNeighbours;
    }

    updateCellValue(row: number, col: number): number {  
        const total = this.countNeighbours(row, col);
        // cell with more than 4 or less then 3 neighbours dies. 1 => 0; 0 => 0
        if (total > 4 || total < 3) {
            return 0;
        }
        // dead cell with 3 neighbours becomes alive. 0 => 1
        else if (this.active[row][col] === 0 && total === 3) {
            return 1;
        }
        // or returning its status back. 0 => 0; 1 => 1
        else {
            return this.active[row][col];
        }
    }

    updateLifeCycle() {
        for (let i = 0; i < this.cellsInRows; i++) {
            for (let j = 0; j < this.cellsInColumn; j++) {
                let new_state = this.updateCellValue(i, j);
                this.inactive[i][j] = new_state;
            }
        }
        this.active = this.inactive.slice();
    }

    gameSetup() {
        this.arrayInitialization();
    }

    runGame() {
        this.updateLifeCycle();
        this.fillArray();
    }
};