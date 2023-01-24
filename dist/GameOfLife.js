var GameOfLifeTS = /** @class */ (function () {
    function GameOfLifeTS(board) {
        this.cellSize = 5;
        this.deadColor = '#6cc8f6';
        this.aliveColor = "#df47ce";
        this.active = [];
        this.inactive = [];
        this.cellsInColumn = Math.floor(board.width / this.cellSize);
        this.cellsInRows = Math.floor(board.height / this.cellSize);
        this.context = board.getContext("2d");
    }
    GameOfLifeTS.prototype.arrayInitialization = function () {
        var _this = this;
        // TODO This seems to have been already taken care of in the new standard lib. Check that out
        this.active = Array.from({ length: this.cellsInRows }, function () { return (Array.from({ length: _this.cellsInColumn }, function () { return 0; })); });
        this.inactive = this.active.slice();
    };
    GameOfLifeTS.prototype.arrayRandomize = function () {
        var _this = this;
        this.active.forEach(function (x, i) {
            x.forEach(function (_, j) {
                _this.active[i][j] = (Math.random() > 0.5) ? 1 : 0;
            });
        });
    };
    GameOfLifeTS.prototype.fillArray = function () {
        var _this = this;
        this.active.forEach(function (x, i) {
            x.forEach(function (y, j) {
                var color;
                if (y == 1)
                    color = _this.aliveColor;
                else
                    color = _this.deadColor;
                _this.context.fillStyle = color;
                _this.context.fillRect(j * _this.cellSize, i * _this.cellSize, _this.cellSize, _this.cellSize);
            });
        });
    };
    GameOfLifeTS.prototype.setCellValueHelper = function (row, col) {
        try {
            return this.active[row][col];
        }
        catch (_a) {
            return 0;
        }
    };
    GameOfLifeTS.prototype.countNeighbours = function (row, col) {
        var totalNeighbours = 0;
        totalNeighbours += this.setCellValueHelper(row - 1, col - 1);
        totalNeighbours += this.setCellValueHelper(row - 1, col);
        totalNeighbours += this.setCellValueHelper(row - 1, col + 1);
        totalNeighbours += this.setCellValueHelper(row, col - 1);
        totalNeighbours += this.setCellValueHelper(row, col + 1);
        totalNeighbours += this.setCellValueHelper(row + 1, col - 1);
        totalNeighbours += this.setCellValueHelper(row + 1, col);
        totalNeighbours += this.setCellValueHelper(row + 1, col + 1);
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
                this.inactive[i][j] = new_state;
            }
        }
        this.active = this.inactive.slice();
    };
    GameOfLifeTS.prototype.gameSetup = function () {
        this.arrayInitialization();
    };
    GameOfLifeTS.prototype.runGame = function () {
        this.updateLifeCycle();
        this.fillArray();
    };
    return GameOfLifeTS;
}());
;
