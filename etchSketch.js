
//adding the grid cell class
class gridCell {
    constructor(xVal, yVal, state, container) {
        this.xVal = xVal;
        this.yVal = yVal;
        this.state = state;
        this.container = container;

        this.id = `${xVal},${yVal}`;
        this.CSSobj = undefined;
    }

    makeGrid() {
        let cell= document.createElement('div');
        cell.id = this.id;
        cell.className = 'gridCell';

        //don't want to have overlapping lines
        if (this.xVal != 0) {
            cell.style.borderLeft = '1px solid rgb(252, 200, 183)';
        }
        if (this.yVal != 0) {
            cell.style.borderBottom = ' 1px solid rgb(252, 200, 183)';
        }
        
        this.container.appendChild(cell);
        this.CSSobj = document.getElementById(this.id);
        this.CSSobj.style.backgroundColor = 'blanchedalmond';

        this.CSSobj.addEventListener('mouseover', function(event){
            if (drawingToggle && buttonToggle == 1) {
                event.target.style.backgroundColor = 'DarkSalmon';
        }});

        this.CSSobj.addEventListener('mousedown', function(event){
            if (buttonToggle == 1){
                event.target.style.backgroundColor = 'DarkSalmon';  
                drawingToggle = true;
        }});

        this.CSSobj.addEventListener('mouseup', function(){
            if (buttonToggle == 1){
                drawingToggle = false;
        }});

        this.CSSobj.addEventListener('dragstart', function(){
            if (buttonToggle == 1){
                drawingToggle = true;
        }});

        this.CSSobj.addEventListener('dragend', function(){
            if (buttonToggle == 1){
                drawingToggle = false;
        }});

        this.CSSobj.addEventListener('dragover', function(event){
            if (buttonToggle == 1){
                event.target.style.backgroundColor = 'DarkSalmon';
        }});
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

function editButtonClick(button, toggleNo) {
    if (buttonToggle != toggleNo) {
        button.style.backgroundColor = 'white';
        buttonToggle = toggleNo;

        editButtons.forEach( function(e) {
            if (e != button) {
                e.style.backgroundColor = 'blanchedalmond';
            }
        })

    } else {
        button.style.backgroundColor = 'blanchedalmond';
        buttonToggle = 0;
    }
}

function resetButtonClick() {
    //resetting the drawing
    for (var key of Object.keys(basicGrid)){
        basicGrid[key].CSSobj.style.backgroundColor = 'blanchedalmond';
    }
    drawingToggle = false;


    resetButton.style.backgroundColor = 'white';
    setTimeout(function(){
        resetButton.style.backgroundColor = 'blanchedalmond';
    }, 250);
}

function editButtonHover(button,toggle,background) {
    if (buttonToggle != toggle) {
        button.style.backgroundColor = background;
    }
}

// SETUP--------------------------------------

//grabbing global variables
let docRoot = document.querySelector(':root');

//grabbing the slider
let slider = document.getElementById('gridSlider');
let sliderVal = slider.value;

//grabbing the drawing mode buttons and defining the button toggle
const drawButton = document.getElementById('drawBut');
const eraseButton = document.getElementById('eraseBut');
const resetButton = document.getElementById('resetBut');
const editButtons = document.querySelectorAll('.editButs'); // nodelist of buttons
let buttonToggle = 0;

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

//toggle for drawing
let drawingToggle = false;

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
}

//clicking drawing buttons
drawButton.addEventListener('click', function() {editButtonClick(drawButton, 1)});
eraseButton.addEventListener('click', function() {editButtonClick(eraseButton, 2)});
resetButton.addEventListener('click', function() {resetButtonClick()});
drawButton.addEventListener('mouseover', function(){editButtonHover(drawButton,1,'bisque')});
eraseButton.addEventListener('mouseover', function(){editButtonHover(eraseButton,2,'bisque')});
resetButton.addEventListener('mouseover', function(){editButtonHover(resetButton,3,'bisque')});
drawButton.addEventListener('mouseout', function(){editButtonHover(drawButton,1,'blanchedalmond')});
eraseButton.addEventListener('mouseout', function(){editButtonHover(eraseButton,2,'blanchedalmond')});
resetButton.addEventListener('mouseout', function(){editButtonHover(resetButton,3,'blanchedalmond')});

//resetting the drawing mode if mouse leaves the canvas
gridCont.addEventListener('mouseleave', () => drawingToggle = false);


