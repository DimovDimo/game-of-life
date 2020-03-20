const cellConstant = 3;

class Engine {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.cells = this.getCells(width, height);
    }

    getCells(width, height){
        return new Array(width * height);
    }
}