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
        for (let i = 0; i < this.cells.length; i++) {
          this.cells[i] = this.getRandomCell();
        }
    }
      
    getRandomCell(){
        return 0 | compactnessConstant + random();
    }

    clear() {
        this.cells = new Array(this.cells.length).fill(0);
    }

    generation() {
        let variableCells = this.variableCells;
    }
}