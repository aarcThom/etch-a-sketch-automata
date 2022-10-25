
//adding the grid cell class
class gridCell {
    constructor(xVal, yVal, container) {
        this.xVal = xVal;
        this.yVal = yVal;
        this.container = container;

        this.id = `${xVal},${yVal}`;
        this.CSSobj = undefined;
        this.alive = false;
        this.neighbours = '00000000';
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
                    basicGrid[this.id].alive = true;
                } else if (buttonToggle == 2) {
                    event.target.style.backgroundColor = 'blanchedalmond';
                    basicGrid[this.id].alive = false;
                }      
        }});

        this.CSSobj.addEventListener('mousedown', function(event){
            drawingToggle = true;
            if (buttonToggle == 1) {
                event.target.style.backgroundColor = 'DarkSalmon';
                basicGrid[this.id].alive = true;
            } else if (buttonToggle == 2) {
                event.target.style.backgroundColor = 'blanchedalmond';
                basicGrid[this.id].alive = false;
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
                    basicGrid[this.id].alive = true;
                } else if (buttonToggle == 2) {
                    event.target.style.backgroundColor = 'blanchedalmond';
                    basicGrid[this.id].alive = false;
                }  
        }});
    }

    getNeighbours() {
        let idCheck = '';

        for (i = this.yVal + 1; i >= this.yVal - 1; i--){
            let nbrY;
            //wrapping the values
            if (i == sliderVal) {
                nbrY = 0;
            } else if (i == -1) {
                nbrY = sliderVal -1;
            } else {
                nbrY = i;
            }
                
                for (j = this.xVal - 1; j <= this.xVal + 1; j++){
                    let nbrX;
                    //wrapping the values
                    if (j == sliderVal) {
                        nbrX = 0;
                    } else if (j == -1) {
                        nbrX = sliderVal -1;
                    } else {
                        nbrX = j;
                    }

                    if (!(nbrX == this.xVal && nbrY == this.yVal)){ 
                        if (basicGrid[`${nbrX},${nbrY}`].alive == true) {
                            idCheck += '1';
                        } else {
                            idCheck += '0';
                        }
                    }
                }
            }
            this.neighbours = idCheck;
        }

        dieLive(newStat) {
            if (newStat) {
                basicGrid[this.id].alive = true;
                basicGrid[this.id].CSSobj.style.backgroundColor = 'DarkSalmon';
            } else {
                basicGrid[this.id].alive = false;
                basicGrid[this.id].CSSobj.style.backgroundColor = 'blanchedalmond';
            }
        }
    }

//POPULATION FUNCTIONS----------------------------------------------------------------------

//function to populate grid container with grid cells
function initGrid(gridCnt, grdContainer) {
    let gridDict = {};

    for (let y =gridCnt - 1; y >= 0; y--) {
        for (let x=0; x<gridCnt; x++) {
            gridDict[`${x},${y}`] = new gridCell(x,y,grdContainer);
        }
    }
    return gridDict;
}

//function to clear the grid on reset
function resetGrid() {
    for (let i in basicGrid){
        let curCell = basicGrid[i]
        curCell.alive = false;

        let cssCell = document.getElementById(curCell.id);
        cssCell.style.backgroundColor = 'blanchedalmond';
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
            //adding in the rotations
            let rot90 = `${key[5]}${key[3]}${key[0]}${key[6]}${key[1]}${key[7]}${key[4]}${key[2]}`;
            let rot180 = `${key[7]}${key[6]}${key[5]}${key[4]}${key[3]}${key[2]}${key[1]}${key[0]}`;
            let rot270 = `${key[2]}${key[4]}${key[7]}${key[1]}${key[6]}${key[0]}${key[3]}${key[5]}`;

            let state = document.getElementById(key).title;
            if (state === 'off') {
                dict[key] = false;
                dict[rot90] = false;
                dict[rot180] = false;
                dict[rot270] = false;
            } else {
                dict[key] = true;
                dict[rot90] = true;
                dict[rot180] = true;
                dict[rot270] = true;
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

function timer(){
    return new Promise(resolve => {
        setTimeout(()=> {
            resolve('done');
        }, 500);
    });
}

async function runSim() {
    // current user defined look up scheme
    let luDict = lookupDict();

    // assigning keys per each cell for the lookup dictionary
    for (let key in basicGrid){
        basicGrid[key].getNeighbours();
    }

    //killing or resurrecting the given cell >:)
    for (let key in basicGrid){
        let cellNbrs = basicGrid[key].neighbours;
        let newStatus = luDict[cellNbrs];
        basicGrid[key].dieLive(newStatus);
    }

    await timer();
    if (simStartBut.title === 'off') {
        return;
    } else {
        runSim();
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
        
        slider.disabled = true;


        //actually starting the simulation
        runSim();



    } else {
        simStartBut.style.backgroundColor = 'blanchedalmond';
        simStartBut.title = 'off';
        simStartBut.textContent = 'Start Simulation';

        slider.disabled = false;
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
        dEBut.style.backgroundColor = 'blanchedalmond';
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
                e.style.backgroundColor = 'blanchedalmond';
                e.title = 'off';
            } else {
                if (dEBut.id == 'resetBut'){
                    resetGrid();
                    e.style.backgroundColor = 'white';
                    e.title = 'on';
                    setTimeout(()=> {
                        e.style.backgroundColor = 'blanchedalmond';
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
for (i in basicGrid) {
    basicGrid[i].makeGrid();
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
    for (i in basicGrid) {
        basicGrid[i].makeGrid();
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
