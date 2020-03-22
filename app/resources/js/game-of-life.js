const cellConstant = 3;
const compactnessConstant = 0.3;

let random = Math.random;

class Engine {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.cells = this.getCells(width, height);
        this.variableCells = this.getVariableCells(width);
    }

    getCells(width, height){
        return new Array(width * height);
    }

    getVariableCells(width){
        return new Array(cellConstant * width);
    }

    randomCells() {
        //TODO
    }
}