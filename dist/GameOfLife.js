var GameOfLifeTS = /** @class */ (function () {
    function GameOfLifeTS(board) {
        this.cellSize = 5;
        this.deadColor = '#000000';
        this.colorPalettes = [
            [
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
            ],
            [
                "#ffffff",
                "#0ce6f2",
                "#0098db",
                "#1e579c",
                "#203562",
                "#252446",
                "#201533",
            ],
        ];
        this.colorPalette = this.colorPalettes[1];
        this.active = [];
        this.cellsInColumn = Math.floor(board.width / this.cellSize);
        this.cellsInRows = Math.floor(board.height / this.cellSize);
        this.context = board.getContext("2d");
    }
    GameOfLifeTS.prototype.initialize = function () {
        var _this = this;
        // TODO This seems to have been already taken care of in the new standard lib. Check that out
        this.active = Array.from({ length: this.cellsInRows }, function () { return (Array.from({ length: _this.cellsInColumn }, function () { return 0; })); });
    };
    GameOfLifeTS.prototype.randomize = function () {
        var _this = this;
        this.active.forEach(function (x, i) {
            x.forEach(function (_, j) {
                _this.active[i][j] = (Math.random() > 0.5) ? 1 : 0;
            });
        });
    };
    GameOfLifeTS.prototype.paint = function () {
        var _this = this;
        this.active.forEach(function (x, i) {
            x.forEach(function (y, j) {
                var color;
                if (y == 1)
                    color = _this.colorPalette[Math.floor(Math.random() * _this.colorPalette.length - 1)];
                else
                    color = _this.deadColor;
                _this.context.fillStyle = color;
                _this.context.fillRect(j * _this.cellSize, i * _this.cellSize, _this.cellSize, _this.cellSize);
            });
        });
    };
    GameOfLifeTS.prototype.getCellValue = function (row, col) {
        try {
            return this.active[row][col];
        }
        catch (_a) {
            return 0;
        }
    };
    GameOfLifeTS.prototype.countNeighbours = function (row, col) {
        var totalNeighbours = 0;
        totalNeighbours += this.getCellValue(row - 1, col - 1);
        totalNeighbours += this.getCellValue(row - 1, col);
        totalNeighbours += this.getCellValue(row - 1, col + 1);
        totalNeighbours += this.getCellValue(row, col - 1);
        totalNeighbours += this.getCellValue(row, col + 1);
        totalNeighbours += this.getCellValue(row + 1, col - 1);
        totalNeighbours += this.getCellValue(row + 1, col);
        totalNeighbours += this.getCellValue(row + 1, col + 1);
        return totalNeighbours;
    };
    GameOfLifeTS.prototype.updateCellValue = function (row, col) {
        var total = this.countNeighbours(row, col);
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
    };
    GameOfLifeTS.prototype.updateLifeCycle = function () {
        for (var i = 0; i < this.cellsInRows; i++) {
            for (var j = 0; j < this.cellsInColumn; j++) {
                var new_state = this.updateCellValue(i, j);
                this.active[i][j] = new_state;
            }
        }
    };
    GameOfLifeTS.prototype.setup = function () {
        this.initialize();
        this.randomize();
    };
    GameOfLifeTS.prototype.run = function () {
        this.updateLifeCycle();
    };
    return GameOfLifeTS;
}());
;
