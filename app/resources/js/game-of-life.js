const spaceCellsConstant = 0;
const variableCellsConstant = 1;
const widthConstant = 2;
const cellConstant = 3;
const compactnessConstant = getRandomArbitrary(0.3, 0.7);
const gameSizeConstant = 10;
const contextConstant = "2d";
const colorHexBackgroundConstant = "#5df000";

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
        for (let index = spaceCellsConstant; index < this.getFinish(); index = index + this.width) {
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
            this.fullCellsValue(sumSpaceCells, index, spaceCells);
        }
    }

    getSpaceCellsSum(spaceCells, index) {
        return this.variableCells[this.getIndexByWidth(spaceCells)]
            + this.variableCells[this.getIndexLengthByWidth(spaceCells)]
            + this.variableCells[spaceCells]
            - this.cells[spaceCells + index];
    }

    isCellPosition(sumSpaceCells) {
        return sumSpaceCells == cellConstant;
    }

    isCellWidth(sumSpaceCells) {
        return sumSpaceCells != widthConstant;
    }

    fullCellsValue(sumSpaceCells, index, spaceCells) {
        if (this.isCellPosition(sumSpaceCells)) {
            this.cells[spaceCells + index] = variableCellsConstant;
        }
        else if (this.isCellWidth(sumSpaceCells)) {
            this.cells[spaceCells + index] = spaceCellsConstant;
        }
    }

    lastRow() {
        let variableCellsArea = this.getVariableCellsArea();

        for (let index = spaceCellsConstant; index < this.width; index++) {
            let variableCellsSum = this.getVariableCellsSum(variableCellsArea, index);
            this.fullCellsValue(variableCellsSum, index, variableCellsArea)
        }
    }

    getArea() {
        return this.height * this.width;
    }

    getVariableCellsArea() {
        return this.getArea() - this.width;
    }

    getVariableCellsSum(variableCellsArea, index) {
        return this.variableCells[this.getFirstSpaceCellsPosition(variableCellsArea, index, true)]
            + this.variableCells[this.getFirstSpaceCellsPosition(variableCellsArea, index, false)]
            - this.cells[variableCellsArea + index];
    }

    getFirstSpaceCellsPosition(variableCellsArea, index, isWidth) {
        let cellsPosition = variableCellsArea + index;

        if (isWidth) {
            cellsPosition = cellsPosition - this.width;
        }

        return cellsPosition % this.variableCells.length
    }

    generation() {
        this.firstRows();
        this.middleRows();
        this.penultimateRows();
        this.lastRow();
    }
}

class Game {
    constructor(canvasGameOfLife) {
        this.canvasGameOfLife = canvasGameOfLife;
        this.contextGameOfLife = canvasGameOfLife.getContext(contextConstant);
        this.distance = spaceCellsConstant;
        this.create(gameSizeConstant);
    }

    create(gameSizeConstant) {
        this.engine = new Engine(gameSizeConstant, gameSizeConstant);
        this.engine.randomCells();

        this.canvasGameOfLife.width = gameSizeConstant;
        this.canvasGameOfLife.height = gameSizeConstant;

        this.gameBackground();
    }

    gameBackground(){
        this.canvasGameOfLife.style.background = colorHexBackgroundConstant;
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}