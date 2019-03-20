/*
 * i corresponds to column,
 * j corresponds to row
 */
function Cell(i, j) {
	this.i = i;
	this.j = j;
	this.walls = [true, true, true, true];
	this.visited = false;
	this.current = false;
	this.inStack = false;

	this.render = function() {
		// draw fill visited
		if (this.current) {
			fill(248, 176, 0);
			noStroke();
			rect(this.i * cellSize, this.j * cellSize, cellSize, cellSize);
		}
		else if (this.inStack) {
			fill(40, 56, 136);
			noStroke();
			rect(this.i * cellSize, this.j * cellSize, cellSize, cellSize);
		}
		else if (this.visited) {
			fill(216, 56, 144);
			noStroke();
			rect(this.i * cellSize, this.j * cellSize, cellSize, cellSize);
		}

		// draw cell walls
		stroke(255);
		noFill();
		if (this.walls[0]) {
			line(this.i * cellSize, this.j * cellSize, this.i * cellSize + cellSize, this.j * cellSize);
		}
		if (this.walls[1]) {
			line(this.i * cellSize + cellSize, this.j * cellSize, this.i * cellSize + cellSize, this.j * cellSize + cellSize);
		}
		if (this.walls[2]) {
			line(this.i * cellSize + cellSize, this.j * cellSize + cellSize, this.i * cellSize, this.j * cellSize + cellSize);
		}
		if (this.walls[3]) {
			line(this.i * cellSize, this.j * cellSize + cellSize, this.i * cellSize, this.j * cellSize);
		}
	}

	this.getNeighbors = function() {
		let neighbors = [];
		if (this.j > 0) {
			let top = cells[this.j - 1][this.i];
			neighbors.push(top);
		}
		if (this.i < numCols - 1) {
			let right = cells[this.j][this.i + 1];
			neighbors.push(right);
		}
		if (this.j < numRows - 1) {
			let bottom = cells[this.j + 1][this.i];
			neighbors.push(bottom);
		}
		if (this.i > 0) {
			let left = cells[this.j][this.i - 1];
			neighbors.push(left);
		}
		return neighbors;
	}

	this.getUnvisitedNeighbors = function() {
		let unvisitedNeighbors = [];
		let neighbors = this.getNeighbors();
		if (neighbors.length > 0) {
			for (let i = 0; i < neighbors.length; i++) {
				if (!neighbors[i].visited) {
					unvisitedNeighbors.push(neighbors[i]);
				}
			}
		}
		return unvisitedNeighbors;
	}
}