class GameOfLifeTS {
    cellSize = 5;
    deadColor = '#6cc8f6';
    colorPalette: string[] = [
        "#1a1c2c",
        "#5d275d",
        "#b13e53",
        "#ef7d57",
        "#ffcd75",
        "#a7f070",
        "#38b764",
        "#257179",
        "#29366f",
        "#3b5dc9",
        "#41a6f6",
        "#73eff7",
        "#f4f4f4",
        "#94b0c2",
        "#566c86",
        "#333c57",
    ];
    cellsInColumn: number;
    cellsInRows: number;
    active: number[][] = [];
    context: CanvasRenderingContext2D;

    constructor(board: HTMLCanvasElement) {
        this.cellsInColumn = Math.floor(board.width / this.cellSize);
        this.cellsInRows = Math.floor(board.height / this.cellSize);
        this.context = board.getContext("2d") as CanvasRenderingContext2D;
    }

    initialize() {
        // TODO This seems to have been already taken care of in the new standard lib. Check that out
        this.active = Array.from({ length: this.cellsInRows }, () => (
            Array.from({ length: this.cellsInColumn }, () => 0)
        ));
    }

    randomize() {
        this.active.forEach((x, i) => {
            x.forEach((_, j) => {
                this.active[i][j] = (Math.random() > 0.5) ? 1 : 0;
            });
        });
    }

    paint() {
        this.active.forEach((x, i) => {
            x.forEach((y, j) => {
                let color: string;
                if(y == 1)
                    color = this.colorPalette[Math.floor(Math.random() * 15)];
                else
                    color = this.deadColor;
                this.context.fillStyle = color;
                this.context.fillRect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
            })
        });
    }

    getCellValue(row: number, col: number): number {
        try {
            return this.active[row][col];
        }
        catch {
            return 0;
        }
    }

    countNeighbours(row: number, col: number): number {
        let totalNeighbours = 0;
        totalNeighbours += this.getCellValue(row - 1, col - 1);
        totalNeighbours += this.getCellValue(row - 1, col);
        totalNeighbours += this.getCellValue(row - 1, col + 1);
        totalNeighbours += this.getCellValue(row, col - 1);
        totalNeighbours += this.getCellValue(row, col + 1);
        totalNeighbours += this.getCellValue(row + 1, col - 1);
        totalNeighbours += this.getCellValue(row + 1, col);
        totalNeighbours += this.getCellValue(row + 1, col + 1);
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
                this.active[i][j] = new_state;
            }
        }
    }

    setup() {
        this.initialize();
        this.randomize();
    }

    run() {
        this.updateLifeCycle();
        this.paint();
    }
};