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
        for (let index = spaceCellsConstant; index < this.cells.length; index++) {
            this.cells[index] = this.getRandomCell();
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
        for (let index = spaceCellsConstant; index < this.getLength(); index++) {
            this.variableCells[index] = spaceCellsConstant;
        }
    }

    middleRows() {
        this.variableCellsLength();
        this.variableCellsPosition();
        this.fullVariableCells();
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

    fullVariableCells() {
        for (let index = variableCellsConstant; index < this.getFirstVariablePosition(); index++) {
            this.fullVariableCellsByIndex(index);
        }
    }

    getCellsPosition(index) {
        return index + this.getLength();
    }

    getCellPosition(index, isBefore) {
        if (isBefore) {
            return index - variableCellsConstant;
        }

        return index + variableCellsConstant;
    }

    fullVariableCellsByIndex(index) {
        this.variableCells[this.getCellsPosition(index)] = this.cells[index]
            + this.cells[this.getCellPosition(index, true)]
            + this.cells[this.getCellPosition(index, false)];
    }

    penultimateRows() {
        for (let index = spaceCellsConstant, finish = this.getFinish(); index < finish; index = index + this.width) {
            this.updateVariableCellsPosition(index);
        }
    }

    getFinish() {
        return this.height * this.width - this.width;
    }

    getVariableCellsPosition(index) {
        return index % this.variableCells.length;
    }

    getIndexByWidth(index) {
        return index + this.width;
    }

    getIndexWithVariableConstant(index) {
        return this.getIndexByWidth(index) + variableCellsConstant;
    }

    updateVariableCellsPosition(index) {
        this.variableCells[this.getVariableCellsPosition(index)] = this.cells[this.getIndexByWidth(index)] + this.cells[this.getIndexWithVariableConstant(index)];
    }

    generation() {
        let variableCells = this.variableCells;
        this.firstRows();
        this.middleRows();
        this.penultimateRows();
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}