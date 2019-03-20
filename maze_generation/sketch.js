// Jarad Gray
// Maze generation algorithm visualization - DFS with backtracking
// https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker
// 19 March 2019

let numCols, numRows;
let cellSize = 40;
let cells = [];
let currentCell;
let backtrackStack = [];
let finished = false;

function setup() {
	// frameRate(5);
	createCanvas(600, 600);
	numCols = floor(width / cellSize);
	numRows = floor(height / cellSize);

	// create grid of Cell objects
	for (let j = 0; j < numRows; j++) {
		let currentRow = [];
		for (let i = 0; i < numCols; i++) {
			let cell = new Cell(i, j);
			currentRow.push(cell);
		}
		cells.push(currentRow);
	}

	// Step 1: Make the initial cell the current cell
	currentCell = cells[0][0];
}//end setup()

function draw() {
	background(0);

	currentCell.visited = true;

	for (let j = 0; j < numRows; j++) {
		for (let i = 0; i < numCols; i++) {
			cells[j][i].render();
		}
	}

	if (finished) {
		return;
	}

	// Step 2.1: If the current cell has any neighbors which have not been visited
	let unvisitedNeighbors = currentCell.getUnvisitedNeighbors();
	if (unvisitedNeighbors.length > 0) {
		// Step 2.1.1: Choose randomly one of the unvisited neighbours
		let next = random(unvisitedNeighbors);
		// Step 2.1.2: Push the current cell to the stack
		backtrackStack.push(currentCell);
		currentCell.inStack = true;
		// Step 2.1.3: Remove the wall between the current cell and the chosen cell
		removeWalls(currentCell, next);
		// Step 2.1.4: Make the chosen cell the current cell
		currentCell.current = false;
		currentCell = next;
		currentCell.current = true;
	}
	// Step 2.2: Else if stack is not empty
	else if (backtrackStack.length > 0) {
		// Step 2.2.1: Pop a cell from the stack
		let next = backtrackStack.pop();
		next.inStack = false;
		// Step 2.2.2: Make it the current cell
		currentCell.current = false;
		currentCell = next;
		currentCell.current = true;
	}
	else {
		finished = true;
	}

	print(cells);
}//end draw()

/*
 * Given two Cells, remove the walls they share.
 */
function removeWalls(a, b) {
	if (a.i == b.i) {
		if (b.j > a.j) {
			// b is a's bottom neighbor
			a.walls[2] = false;
			b.walls[0] = false;
		}
		else {
			// b is a's top neighbor
			a.walls[0] = false;
			b.walls[2] = false;
		}
	}
	else {
		if (b.i > a.i) {
			// b is a's right neighbor
			a.walls[1] = false;
			b.walls[3] = false;
		}
		else {
			// b is a's left neighbor
			a.walls[3] = false;
			b.walls[1] = false;
		}
	}
}//end removeWalls()