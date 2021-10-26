class VcLife {
    field = [];

    constructor(countColumns = 20, countRows = 20) {
        let field = this.createField(countColumns, countRows);
        this.field = field;
    }

    createField(countColumns, countRows) {
        let field = [];

        for (let y = 0; y < countRows; y++) {
            let row = [];
            for (let x = 0; x < countColumns; x++) {
                row.push(0);
            }
            field.push(row);
        }

        return field;
    }

    addGlider(x, y) {
        this.field[y][x + 2] = 1;
        this.field[y + 1][x] = 1;
        this.field[y + 1][x + 2] = 1;
        this.field[y + 2][x + 2] = 1;
        this.field[y + 2][x + 1] = 1;
    }

    rotateMatrixInField(x, y, size) {
        let matrix = this.getMatrixFromField(x, y, size);
        let rotatedMatrix = this.rotateMatrix(matrix);
        this.setMatrixToField(x, y, rotatedMatrix);
    }

    rotateMatrix(matrix) {
        return matrix[0].map((val, index) => matrix.map(row => row[index]).reverse());
    }

    getMatrixFromField(x, y, size) {
        let matrix = this.createField(size, size);
        let matrixY = 0;
        let matrixX;

        for(let getY = y; getY < y + size; getY++) {
            matrixX = 0;
            for(let getX = x; getX < x + size; getX++) {
                let cell = this.getCell(getX, getY);
                matrix[matrixY][matrixX] = cell;

                matrixX++;
            }
            matrixY++;
        }

        return matrix;
    }

    setMatrixToField(x, y, matrix) {
        let countColumns = matrix[0].length;
        let countRows = matrix.length;
        let matrixY = 0;
        let matrixX;

        for(let setY = y; setY < y + countRows; setY++) {
            matrixX = 0;
            for(let setX = x; setX < x + countColumns; setX++) {
                let cell = matrix[matrixY][matrixX];
                this.setCell(setX, setY, cell);

                matrixX++;
            }
            matrixY++;
        }
    }

    determineLife(livingNeighbors, haveLife = false) {
        let willLife = false;

        if (haveLife 
            && (
                livingNeighbors == 2
                || livingNeighbors == 3
            )
        ) {
            willLife = true;
        }

        if (!haveLife 
            && livingNeighbors == 3
        ) {
            willLife = true;
        }

        return willLife;
    }

    countNeighbors(x, y) {
        let livingNeighbors = 0;

        for (let yIncrement = -1; yIncrement <= 1; yIncrement++) {
            for (let xIncrement = -1; xIncrement <= 1; xIncrement++) {
                let verifingX = x + xIncrement;
                let verifingY = y + yIncrement;

                if (verifingX == x && verifingY == y) continue;

                let cell = this.getCell(verifingX, verifingY);
                livingNeighbors += cell;
            }
        }

        return livingNeighbors;
    }

    getCell(x, y) {
        let [realX, realY] = this.getRealCoordinates(x, y);
        
        let cell = this.field[realY][realX];

        return cell;
    }

    setCell(x, y, value) {
        let [realX, realY] = this.getRealCoordinates(x, y);

        this.field[realY][realX] = value;
    }

    getRealCoordinates(x, y) {
        let countColumns = this.field[0].length;
        let countRows = this.field.length;
        let maxX = countColumns - 1;
        let maxY = countRows - 1;

        if (x < 0) x = x + countColumns;
        if (y < 0) y = y + countRows;
        if (x > maxX) x = x - countColumns;
        if (y > maxY) y = y - countRows;

        return [x, y];
    }

    getFieldHtml() {
        let html = '';

        for(let row of this.field) {
            html += '<div class="row">';
            for(let cell of row) {
                let cellAttribute = cell ? ' class="life"' : '';
                html += '<div'+cellAttribute+'></div>';
            }
            html += '</div>';
        }

        return html;
    }

    step() {
        let countColumns = this.field[0].length;
        let countRows = this.field.length;

        let newField = this.createField(countColumns, countRows);

        for(let y = 0; y < countRows; y++) {
            for(let x = 0; x < countColumns; x++) {
                let countNeighbors = this.countNeighbors(x, y);
                let cell = this.determineLife(countNeighbors, this.field[y][x]) ? 1 : 0;
                newField[y][x] = cell;
            }
        }

        this.field = newField;
    }
}

if (typeof window === 'undefined') module.exports = VcLife;