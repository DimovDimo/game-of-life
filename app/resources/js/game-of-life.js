const spaceCellsConstant = 0;
const variableCellsConstant = 1;
const widthConstant = 2;
const cellConstant = 3;
const compactnessConstant = getRandomArbitrary(0.3, 0.7);

class Engine {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.cells = this.getCells(width, height);
        this.variableCells = this.getVariableCells(width);
    }

    getCells(width, height) {
        return new Array(width * height);
    }

    getVariableCells(width) {
        return new Array(cellConstant * width);
    }

    randomCells() {
        for (let i = spaceCellsConstant; i < this.cells.length; i++) {
            this.cells[i] = this.getRandomCell();
        }
    }

    getRandomCell() {
        return spaceCellsConstant | compactnessConstant + Math.random();
    }

    clear() {
        this.cells = new Array(this.cells.length).fill(spaceCellsConstant);
    }

    getLength() {
        return this.width * widthConstant
    }

    firstRows() {
        for (let x = spaceCellsConstant; x < this.getLength(); x++) {
            this.variableCells[x] = spaceCellsConstant;
        }
    }

    newRows() {
        this.variableCellsLength();
        this.variableCellsPosition();
    }

    getVariablePosition() {
        return this.width + this.getLength() - variableCellsConstant;
    }

    getFirstVariablePosition() {
        return this.width - variableCellsConstant;
    }

    getSecondVariablePosition() {
        return this.width - widthConstant;
    }

    variableCellsLength() {
        this.variableCells[this.getLength()] = this.cells[spaceCellsConstant] + this.cells[variableCellsConstant];
    }

    variableCellsPosition() {
        this.variableCells[this.getVariablePosition()] = this.cells[this.getFirstVariablePosition()] + this.cells[this.getSecondVariablePosition()];
    }

    generation() {
        let variableCells = this.variableCells;
        this.firstRows();
        this.newRows();
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}