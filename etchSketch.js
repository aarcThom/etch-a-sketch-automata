
//adding the grid cell class
class gridCell {
    constructor(xVal, yVal, state, container) {
        this.xVal = xVal;
        this.yVal = yVal;
        this.state = state;
        this.container = container;

        this.id = `${xVal},${yVal}`;
    }

    makeGrid() {
        let cell= document.createElement('div');
        cell.id = this.id;
        cell.className = 'gridCell';
        cell.style.border = ' 0.25px solid grey';

        this.container.appendChild(cell);
    }
}



function addGrid(gridCnt, grdContainer) {
    let gridDict = {};

    for (let y =gridCnt - 1; y >= 0; y--) {
        for (let x=0; x<gridCnt; x++) {
            gridDict[[x,y]] = new gridCell(x,y,false, grdContainer);
        }
    }
    return gridDict;
}

// main

let rowColCount = 24;

let gridTempCol = '';
for (i = 0; i<rowColCount; i++){
    if (i != rowColCount-1) {
        gridTempCol += '1fr ';
    } else { gridTempCol += '1fr';}
}

const gridCont = document.querySelector('.grid-container');
gridCont.style.gridTemplateColumns = gridTempCol;


let basicGrid = addGrid(rowColCount, gridCont);

for (var key of Object.keys(basicGrid)){
    basicGrid[key].makeGrid();
    console.log(basicGrid[key].id);
}