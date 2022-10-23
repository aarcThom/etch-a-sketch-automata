
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

        //don't want to have overlapping lines
        if (this.xVal != 0) {
            cell.style.borderLeft = '1px solid DarkSalmon';
        }
        if (this.yVal != 0) {
            cell.style.borderBottom = ' 1px solid DarkSalmon';
        }
        
        this.container.appendChild(cell);
    }
}


//function to populate grid container with grid cells
function initGrid(gridCnt, grdContainer) {
    let gridDict = {};

    for (let y =gridCnt - 1; y >= 0; y--) {
        for (let x=0; x<gridCnt; x++) {
            gridDict[[x,y]] = new gridCell(x,y,false, grdContainer);
        }
    }
    return gridDict;
}

//function to change the slider bar side thicknesses
function thumbSides(curVal) {
    if (curVal == 3){
        docRoot.style.setProperty('--l-thumb','0px');
        docRoot.style.setProperty('--r-thumb','1px');
    } else if (curVal == 50) {
        docRoot.style.setProperty('--l-thumb','1px');
        docRoot.style.setProperty('--r-thumb','0px');
    } else {
        docRoot.style.setProperty('--l-thumb','1px');
        docRoot.style.setProperty('--r-thumb','1px');
    }
}

// SETUP--------------------------------------

//grabbing global variables
let docRoot = document.querySelector(':root');

//grabbing the slider
let slider = document.getElementById('gridSlider');
let sliderVal = slider.value;

//grabbing the grid caption
let sliderCap = document.getElementById('gridSizeCaption');
sliderCap.textContent = `Number of Rows X Columns: ${sliderVal}`;

//formatting the CSS grid
let gridDim = '1fr 1fr 1fr';
const gridCont = document.querySelector('.automata-grid');
gridCont.style.gridTemplateColumns = gridDim;

//populating the grid with cells
let basicGrid = initGrid(3, gridCont);

// calling the makeGrid method that creates corresponding CSS
for (var key of Object.keys(basicGrid)){
    basicGrid[key].makeGrid();
}

// INTERACTION----------------------------------------------------------
//sliding around the slider
slider.oninput = function() {

    //change the value
    sliderVal = this.value;
    sliderCap.textContent = `Number of Rows X Columns: ${sliderVal}`;
    thumbSides(this.value);

    //clear the dictionary
    basicGrid = {};
    //clear the div
    gridCont.innerHTML = '';

    gridDim = '1fr'+' 1fr'.repeat(this.value -1);
    gridCont.style.gridTemplateColumns = gridDim;

    basicGrid = initGrid(this.value, gridCont);
    for (var key of Object.keys(basicGrid)){
        basicGrid[key].makeGrid();
    }
    console.log(Object.keys(basicGrid).length);
    console.log(gridDim);
}



