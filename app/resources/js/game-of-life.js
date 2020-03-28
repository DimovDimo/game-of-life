const cellConstant = 3;

let compactnessConstant = getRandomArbitrary(0.3, 0.7);

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
        for (let i = 0; i < this.cells.length; i++) {
          this.cells[i] = this.getRandomCell();
        }
    }
      
    getRandomCell(){
        return 0 | compactnessConstant + Math.random();
    }

    clear() {
        this.cells = new Array(this.cells.length).fill(0);
    }

    getLength(){
        return this.width * widthConstant
    }
      
    firstRows(variableCells) {
        for (let x = 0; x < this.getLength(); x++) {
            variableCells[x] = 0;
        }
        
        return variableCells;
    }

    generation() {
        let variableCells = this.variableCells;
        variableCells = this.firstRows(variableCells);
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}