
//adding the grid cell class
class gridCell {
    constructor(xVal, yVal, container) {
        this.xVal = xVal;
        this.yVal = yVal;
        this.container = container;

        this.id = `${xVal},${yVal}`;
        this.CSSobj = undefined;
        this.alive = false;
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
            if (drawingToggle) {
                if (buttonToggle == 1) {
                    event.target.style.backgroundColor = 'DarkSalmon';
                    this.alive = true;
                } else if (buttonToggle == 2) {
                    event.target.style.backgroundColor = 'blanchedalmond';
                    this.alive = false;
                }      
        }});

        this.CSSobj.addEventListener('mousedown', function(event){
            drawingToggle = true;
            if (buttonToggle == 1) {
                event.target.style.backgroundColor = 'DarkSalmon';
                this.alive = true;
            } else if (buttonToggle == 2) {
                event.target.style.backgroundColor = 'blanchedalmond';
                this.alive = false;
            }  
        });

        this.CSSobj.addEventListener('mouseup', function(){
            drawingToggle = false;
        });

        this.CSSobj.addEventListener('dragstart', function(){
            drawingToggle = true;
        });

        this.CSSobj.addEventListener('dragend', function(){
            drawingToggle = false;
        });

        this.CSSobj.addEventListener('dragover', function(event){
            if (drawingToggle) {
                if (buttonToggle == 1) {
                    event.target.style.backgroundColor = 'DarkSalmon';
                    this.alive = false;
                } else if (buttonToggle == 2) {
                    event.target.style.backgroundColor = 'blanchedalmond';
                    this.alive = false;
                }  
        }});
    }
}

//POPULATION FUNCTIONS----------------------------------------------------------------------

//function to populate grid container with grid cells
function initGrid(gridCnt, grdContainer) {
    let gridList = [];

    for (let y =gridCnt - 1; y >= 0; y--) {
        for (let x=0; x<gridCnt; x++) {
            gridList.push(new gridCell(x,y,grdContainer));
        }
    }
    return gridList;
}

//function to clear the grid on reset
function resetGrid() {
    for (let ix in basicGrid){
        let curCell = basicGrid[ix]
        curCell.alive = false;

        let cssCell = document.getElementById(curCell.id);
        cssCell.style.backgroundColor = 'blanchedAlmond';
    }
}

//laying out the automata diagrams
function automataButtonLayout(container) {
    for (i in luTable){
        let scheme = luTable[i];
        let autoScheme = undefined;
    
        let aSchemeCont= document.createElement('div');
        if (scheme){
            aSchemeCont.className = 'autoSCont';
            aSchemeCont.style.boxSizing = 'border-box';
            aSchemeCont.style.padding = '5px';
    
            autoScheme = document.createElement('div');
            autoScheme.style.borderLeft = '1px solid rgb(252, 200, 183)';
            autoScheme.style.borderTop = '1px solid rgb(252, 200, 183)';
            autoScheme.style.width = '100%';
            autoScheme.style.height = '100%';
    
            autoScheme.style.display = 'grid';
            autoScheme.style.gridTemplateColumns = '1fr 1fr 1fr';
    
        } else {
            aSchemeCont.className = 'blank';
        }
        container.appendChild(aSchemeCont);
    
        if (autoScheme){
            aSchemeCont.appendChild(autoScheme);
    
            let cellButton = document.createElement('button');
            cellButton.className = 'auto-cell-button';
            let schemeName = '';
    
            let counter = 0;
            for (i = 0; i < 9; i++) {
                if (i != 4){
                    let aCell= document.createElement('div');
                    aCell.style.height= '100%';
                    aCell.style.width= '100%';
                    aCell.style.borderRight = '1px solid rgb(252, 200, 183)';
                    aCell.style.borderBottom = '1px solid rgb(252, 200, 183)';
    
                    if (scheme[counter] == 1) {
                        aCell.style.backgroundColor = 'DarkSalmon';
                    }
                    autoScheme.appendChild(aCell);
                    schemeName += `${scheme[counter]}`;
                    counter +=1;
                    
    
                } else {
                    autoScheme.appendChild(cellButton);
                }
            }
            cellButton.id = schemeName;
            cellButton.title = 'off';
            cellButton.addEventListener('mouseover', () => CAdia(cellButton));
            cellButton.addEventListener('mouseout', () => CAdiaOut(cellButton));
            cellButton.addEventListener('click', () => CADiaClick(cellButton));
    
        }
    }
    }

//LOOKUP TABLE FOR CA
const x = undefined;
const luTable = [[0,0,0,0,0,0,0,0],x,x,x,x,x,x,x,[1,1,1,1,1,1,1,1],
    x,[1,0,0,0,0,0,0,0],[1,0,1,0,0,0,0,0],[1,0,1,0,0,0,0,1],[1,0,1,0,0,1,0,1],[0,1,0,1,1,1,1,0],[0,1,0,1,1,1,1,1],[0,1,1,1,1,1,1,1],x,
    x,[0,1,0,0,0,0,0,0],[0,1,0,1,0,0,0,0],[0,1,0,1,1,0,0,0],[0,1,0,1,1,0,1,0],[1,0,1,0,0,1,1,1],[1,0,1,0,1,1,1,1],[1,0,1,1,1,1,1,1],x,
    x,x,[0,1,0,0,0,0,0,1],[0,1,0,1,0,0,0,1],[0,1,1,1,0,0,0,1],[1,0,1,0,1,1,1,0],[1,0,1,1,1,1,1,0],x,x,
    x,x,[1,1,0,0,0,0,0,0],[1,1,0,1,0,0,0,0],[1,0,0,1,0,1,1,0],[0,0,1,0,1,1,1,1],[0,0,1,1,1,1,1,1],x,x,
    x,x,[0,1,0,0,0,0,1,0],[1,0,0,1,0,1,0,0],[1,0,1,1,1,0,0,0],[0,1,1,0,1,0,1,1],[1,0,1,1,1,1,0,1],x,x,
    x,x,[1,0,0,0,0,0,0,1],[1,0,1,1,0,0,0,0],[1,0,0,1,0,1,0,1],[0,1,0,0,1,1,1,1],[0,1,1,1,1,1,1,0],x,x,
    x,x,x,[1,0,1,0,0,0,1,0],[1,0,1,0,0,1,1,0],[0,1,0,1,1,1,0,1],x,x,x,
    x,x,x,[1,0,0,1,0,0,0,1],[1,1,0,1,0,0,0,1],[0,1,1,0,1,1,1,0],x,x,x,
    x,x,x,[0,0,1,0,1,0,1,0],[0,0,1,1,1,0,1,0],[1,1,0,1,0,1,0,1],x,x,x,
    x,x,x,[0,1,1,0,0,0,1,0],[0,1,1,0,1,0,1,0],[1,0,0,1,1,1,0,1],x,x,x,
    x,x,x,x,[1,1,1,0,0,0,1,0],x,x,x,x,
    x,x,x,x,[1,0,0,1,0,0,1,1],x,x,x,x,
    x,x,x,x,[1,1,0,0,0,0,1,1],x,x,x,x];

//creating the lookup table dictionary
function lookupDict () {
    let dict = {};
    for (i in luTable){
        let el = luTable[i];
        
        if (el) {
            let key = '';

            for (j in el) {
                let char = el[j];
                key += char;
            }
            let state = document.getElementById(key).title;
            if (state === 'off') {
                dict[key]=false;
            } else {
                dict[key]=true;
            }
        }
    }
    return dict;
}

//INTERACTION FUNCTIONS---------------------------------------------------------------------------

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

//CA diagram interactions
function CAdia(celButton) {
    if (celButton.title === 'off') {
        celButton.style.backgroundColor = 'bisque';
    }
}

function CAdiaOut(celButton) {
    if (celButton.title === 'off') {
        celButton.style.backgroundColor = 'white';
    }
}

function CADiaClick(celButton) {
    if (celButton.title === 'off') {
        celButton.title = 'on';
        celButton.style.background = 'grey';
    } else {
        celButton.title = 'off';
        celButton.style.background = 'bisque';
    }
}


//simulation interation functions
function simHover(simBut) {
    if (simBut.title === 'off') {
        simBut.style.backgroundColor = 'bisque';
    }
}

function simHoverOut(simBut) {
    if (simBut.title === 'off') {
        simBut.style.backgroundColor = 'blanchedalmond';
    }
}

function simStartClick () {
    if (simStartBut.title === 'off') {
        simStartBut.style.backgroundColor = 'white';
        simStartBut.title = 'on';
        simStartBut.textContent = 'End Simulation';

        drawButton.style.backgroundColor = 'blanchedalmond';
        eraseButton.style.backgroundColor = 'blanchedalmond';
        drawButton.title = 'off';
        eraseButton.title = 'off';
        resetButton.title = 'off';
        buttonToggle = 0; 

    } else {
        simStartBut.style.backgroundColor = 'blanchedalmond';
        simStartBut.title = 'off';
        simStartBut.textContent = 'Start Simulation';
    }
    
    
    }


//drawing mode interaction functions

function drawEraseHover(dEBut) {
    if (dEBut.title === 'off' && simStartBut.title === 'off') {
        dEBut.style.backgroundColor = 'bisque';
    }
}

function drawEraseHoverOut(dEBut) {
    if (dEBut.title === 'off' && simStartBut.title === 'off') {
        dEBut.style.backgroundColor = 'blanchedAlmond';
    }
}

function drawEraseClick(dEBut) {

    if (dEBut.title === 'off' && simStartBut.title === 'off') {
        switch(dEBut.id) {
            case 'drawBut':
                buttonToggle = 1;
                break;
            case 'eraseBut':
                buttonToggle = 2;
                break;
            default:
                buttonToggle = 1;
        }
    
        editButtons.forEach((e) => {
            if (dEBut.id !== e.id){
                e.style.backgroundColor = 'blanchedAlmond';
                e.title = 'off';
            } else {
                if (dEBut.id == 'resetBut'){
                    resetGrid();
                    e.style.backgroundColor = 'white';
                    e.title = 'on';
                    setTimeout(()=> {
                        e.style.backgroundColor = 'blanchedAlmond';
                        e.title = 'off';

                        drawButton.title = 'on';
                        drawButton.style.backgroundColor = 'white'
                    },250);
                } else {
                    e.style.backgroundColor = 'white';
                    e.title = 'on';
                }
            }
        });
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
let buttonToggle = 1;

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
for (ix in basicGrid) {
    basicGrid[ix].makeGrid();
}

//toggle for drawing
let drawingToggle = false;

//container for automata buttons
let autoButCont = document.querySelector('.button-container');
autoButCont.style.gridTemplateColumns = '1fr'+' 1fr'.repeat(8);
automataButtonLayout(autoButCont);

//simulation buttons
let simStartBut = document.getElementById('startSim');


// INTERACTION----------------------------------------------------------

//sliding around the slider
slider.oninput = function() {

    //change the value
    sliderVal = this.value;
    sliderCap.textContent = `Number of Rows X Columns: ${sliderVal}`;
    thumbSides(this.value);

    //clear the grid list
    basicGrid = [];
    //clear the div
    gridCont.innerHTML = '';

    gridDim = '1fr'+' 1fr'.repeat(this.value -1);
    gridCont.style.gridTemplateColumns = gridDim;

    basicGrid = initGrid(this.value, gridCont);

    // calling the makeGrid method that creates corresponding CSS
    for (ix in basicGrid) {
        basicGrid[ix].makeGrid();
}
}

//draw mode buttons
let btnIx = 0;
const btnStates = [1,2,0];
editButtons.forEach((e) => {
    e.addEventListener('mouseover', ()=> drawEraseHover(e));
    e.addEventListener('mouseout', ()=> drawEraseHoverOut(e));
    e.addEventListener('click', ()=> drawEraseClick(e));
    btnIx += 1;
})


//resetting the drawing mode if mouse leaves the canvas
gridCont.addEventListener('mouseleave', () => drawingToggle = false);


//simulation button interations
simStartBut.addEventListener('mouseover', ()=> simHover(simStartBut));
simStartBut.addEventListener('mouseout', ()=> simHoverOut(simStartBut));
simStartBut.addEventListener('click', ()=> simStartClick());


//creating the loopup dictionary
let luDict = lookupDict();