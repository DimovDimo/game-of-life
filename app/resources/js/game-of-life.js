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
            this.updateVariableCellsPosition(index, false);
            this.updateVariableCellsNeighbours(index, true);
            this.updateVariableCells(index);
            this.updateAllCells(index);
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

    getIndexByWith(index, isBefore) {
        return this.width + this.getCellPosition(index, isBefore);
    }

    updateVariableCellsPosition(index, isBefore) {
        this.variableCells[this.getVariableCellsPosition(index)] = this.cells[this.getIndexByWidth(index)] + this.cells[this.getIndexByWith(index, isBefore)];
    }

    getPositionByWidth(index, isBefore) {
        return this.getIndexByWith(index, isBefore) % this.variableCells.length;
    }

    getIndexByWidthConstant(index) {
        return this.getIndexLengthByWidth(index) - widthConstant;
    }

    getIndexByVariableCellsConstant(index) {
        return this.getIndexLengthByWidth(index) - variableCellsConstant;
    }

    getIndexLengthByWidth(index) {
        return index + this.getLength();
    }

    updateVariableCellsNeighbours(index, isBefore) {
        this.variableCells[this.getPositionByWidth(index, isBefore)] = this.cells[this.getIndexByWidthConstant(index)] + this.cells[this.getIndexByVariableCellsConstant(index)];
    }

    updateVariableCells(index) {
        for (let variableCellsIndex = variableCellsConstant; variableCellsIndex < this.getFirstVariablePosition(); variableCellsIndex++) {
            let position = this.getIndexPositionByLength(index, variableCellsIndex);
            let cellsIndex = this.getCellsIndex(index, variableCellsIndex);
            this.variableCells[position] = this.cells[cellsIndex] + this.cells[this.getCellPosition(cellsIndex, true)] + this.cells[this.getCellPosition(cellsIndex, false)];
        }
    }

    getCellsIndex(index, variableCellsIndex) {
        return variableCellsIndex + this.getIndexByWidth(index);
    }

    getIndexPositionByLength(index, variableCellsIndex) {
        return (index + variableCellsIndex) % this.variableCells.length
    }

    updateAllCells(index) {
        for (let cells = spaceCellsConstant; cells < this.width; cells++) {
            let sumSpaceCells = this.getSpaceCellsSum(spaceCells, index);
        }
    }

    getSpaceCellsSum(spaceCells, index) {
        return this.variableCells[this.getIndexByWidth(spaceCells)]
            + this.variableCells[this.getIndexLengthByWidth(spaceCells)]
            + this.variableCells[spaceCells]
            - this.cells[spaceCells + index];
    }

    isCellPosition(sumSpaceCells){
        return sumSpaceCells == cellConstant;
    }
    
    isCellWidth(sumSpaceCells){
        return sumSpaceCells != widthConstant;
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