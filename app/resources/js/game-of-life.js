const variableCellsConstant = 1;
const widthConstant = 2;
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
      
    firstRows() {
        for (let x = 0; x < this.getLength(); x++) {
          this.variableCells[x] = 0;
        }
      }
      
    thirdRow() {
        this.variableCells[this.getLength()] = this.cells[0] + this.cells[1];
    }

    getVariablePosition() {
        return this.width + this.getLength() - variableCellsConstant;
    }

    generation() {
        let variableCells = this.variableCells;
        this.firstRows();
        this.thirdRow();
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}