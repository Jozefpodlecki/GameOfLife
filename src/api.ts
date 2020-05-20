import { Cell } from "./models/Cell";
import { GridOptions } from "./models/GridOptions";

export const detectPatterns = (cell: Cell) => {

}

export const detectBlock = (grid: Cell[], cell: Cell) => {
    const cells = [
        {
            row: cell.row,
            column: cell.column
        },
        {
            row: cell.row,
            column: cell.column - 1
        },
        {
            row: cell.row - 1,
            column: cell.column - 1
        },
        {
            row: cell.row - 1,
            column: cell.column
        },
    ]

    if(grid.filter(cell => 
        cells.some(ce => cell.row === ce.row 
            && cell.column === ce.column) 
                && cell.active).length === 4) {
        return true;
    }
    
    return false;
}

export const detectBlinker = (grid: Cell[], cell: Cell) => {
    const cells1 = [
        {
            row: cell.row,
            column: cell.column
        },
        {
            row: cell.row - 1,
            column: cell.column
        },
        {
            row: cell.row - 2,
            column: cell.column
        }
    ]

    const cells2 = [
        {
            row: cell.row,
            column: cell.column
        },
        {
            row: cell.row,
            column: cell.column - 1
        },
        {
            row: cell.row,
            column: cell.column - 2
        }
    ]

    for(let cells of [cells1, cells2]) {
        if(grid.filter(cell => 
            cells.some(ce => cell.row === ce.row 
                && cell.column === ce.column) 
                    && cell.active).length === 3) {
            return true;
        }
    }
    
    return false;
}

export const detectTub = (grid: Cell[], cell: Cell) => {
    const cells = [
        {
            row: cell.row,
            column: cell.column
        },
        {
            row: cell.row - 2,
            column: cell.column
        },
        {
            row: cell.row - 1,
            column: cell.column - 1
        },
        {
            row: cell.row - 1,
            column: cell.column + 1
        }
    ]

    if(grid.filter(cell => 
        cells.some(ce => cell.row === ce.row 
            && cell.column === ce.column) 
                && cell.active).length === 4) {
        return true;
    }
    
    return false;
}

export const detectPulsar = (grid: Cell[], cell: Cell) => {
    return false;
}

export const detectToad = (grid: Cell[], cell: Cell) => {
    return false;
}

export const detectLoaf = (grid: Cell[], cell: Cell) => {
    const cells = [
        {
            row: cell.row,
            column: cell.column
        },
        {
            row: cell.row - 1,
            column: cell.column - 1
        },
        {
            row: cell.row - 2,
            column: cell.column - 2
        },
        {
            row: cell.row - 3,
            column: cell.column
        },
        {
            row: cell.row - 3,
            column: cell.column -1
        },
        {
            row: cell.row - 1,
            column: cell.column + 1
        },
        {
            row: cell.row - 2,
            column: cell.column + 1
        }
    ]

    if(grid.filter(cell => 
        cells.some(ce => cell.row === ce.row 
            && cell.column === ce.column) 
                && cell.active).length === 7) {
        return true;
    }
    
    return false;
}

export const detectBoat = (grid: Cell[], cell: Cell) => {
    const cells1 = [
        {
            row: cell.row,
            column: cell.column
        },
        {
            row: cell.row,
            column: cell.column - 1
        },
        {
            row: cell.row - 1,
            column: cell.column
        },
        {
            row: cell.row - 1,
            column: cell.column - 2
        },
        {
            row: cell.row - 2,
            column: cell.column -1
        }
    ]

    const cells2 = [
        {
            row: cell.row,
            column: cell.column
        },
        {
            row: cell.row,
            column: cell.column - 1
        },
        {
            row: cell.row - 1,
            column: cell.column
        },
        {
            row: cell.row - 1,
            column: cell.column - 2
        },
        {
            row: cell.row - 2,
            column: cell.column -1
        }
    ]

    for(const cells of [cells1, cells2]) {
        if(grid.filter(cell => 
            cells.some(ce => cell.row === ce.row 
                && cell.column === ce.column) 
                    && cell.active).length === 5) {
            return true;
        }
    }
    
    return false;
}

export const detectGlider = (grid: Cell[], cell: Cell) => {
    return false;
}


export const getNeighborIndicies = (grid: Cell[], cell: Cell, rows: number, columns: number) => {

    let prevRow = cell.row - 1;

    if(prevRow < 0) {
        prevRow = rows;
    }

    let nextRow = cell.row + 1;

    if(nextRow > rows) {
        nextRow = 0;
    }

    let prevColumn = cell.column - 1;

    if(prevColumn < 0) {
        prevColumn = columns;
    }

    let nextColumn = cell.column + 1;

    if(nextColumn > columns) {
        nextColumn = 0;
    }

    const potentialNeighbors = [
        {
            row: nextRow,
            column: cell.column
        },
        {
            row: prevRow,
            column: cell.column
        },
        {
            row: cell.row,
            column: prevColumn,
        },
        {
            row: cell.row,
            column: nextColumn,
        },
        {
            row: nextRow,
            column: nextColumn,
        },
        {
            row: prevRow,
            column: prevColumn,
        },
        {
            row: nextRow,
            column: prevColumn,
        },
        {
            row: prevRow,
            column: nextColumn,
        },
    ]

    return grid.filter(pr => potentialNeighbors.some(nb => nb.row === pr.row && nb.column === pr.column)).map(pr => pr.id)
}

export const drawBoard = (context: CanvasRenderingContext2D, width: number, height: number) => {
    let size = 15;
    let xOffset = 100;
    let yOffset = 100;
    let rows = 50;
    let columns = 50;
    let borderWidth = 1;
    const newSize = borderWidth + size;

    //const width = newSize * rows;
    //const height = newSize * rows;

    context.fillStyle = "#000";
    context.fillRect(0, 0, width, height);
}

export const initalizeGrid = (options: GridOptions) => {
    const { height, width, columns, rows, xOffset, yOffset } = options;

    let sizeX = width / columns;
    let sizeY = height / rows;
    let borderWidth = 1;
    const newSizeX = borderWidth + sizeX;
    const newSizeY = borderWidth + sizeY;

    let grid: Cell[] = Array(rows * columns).fill(0).map((pr, index) => {
        const row = Math.floor(index / rows);
        const column = index % columns;

        return {
            id: index,
            row,
            column,
            x: xOffset + newSizeX * column,
            y: yOffset + newSizeY * row,
            sizeX,
            sizeY,
            active: Boolean(Math.floor(Math.random() * 2)),
            neighborIds: []
        }
    })



    for(let cell of grid) {
        cell.neighborIds = getNeighborIndicies(grid, cell, rows, columns);
    }

    return grid;
}

export const getNewCellState = (grid: Cell[], cell: Cell) => {
    const aliveNeighbors = cell.neighborIds.filter(neighborId => grid[neighborId].active).length;
        
    if(!cell.active && aliveNeighbors === 3) {
        return true;
    }
    else if(cell.active && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
        return false;
    }

    return cell.active;
}

export const computeNextState = (grid: Cell[]) => new Promise<any>((resolve, reject) => {
    
    const newGrid = [...grid.map(pr => ({...pr}))];
    const length = newGrid.length;
    const lifes: {
        [index: string]: number
    } = {

    }
    let aliveCells = 0;

    for(let i = 0; i < length ; i++) {
        const cell = grid[i];
        const newCell = newGrid[i];

        const active = getNewCellState(grid, cell);
        newCell.active = active;

        aliveCells = aliveCells + Number(newCell.active);

        const patterns = detectPatterns(cell);
        // if(detectBlock(grid, newCell)) {
        //     lifes["block"] = (lifes["block"] || 0) + 1;
        // }
        // if(detectBlinker(grid, newCell)) {
        //     lifes["blinker"] = (lifes["blinker"] || 0) + 1;
        // }
        // if(detectTub(grid, newCell)) {
        //     lifes["tub"] = (lifes["tub"] || 0) + 1;
        // }
        // if(detectLoaf(grid, newCell)) {
        //     lifes["loaf"] = (lifes["loaf"] || 0) + 1;
        // }
        // if(detectBoat(grid, newCell)) {
        //     lifes["boat"] = (lifes["boat"] || 0) + 1;
        // }
        // if(detectGlider(grid, newCell)) {
        //     lifes["glider"] = (lifes["glider"] || 0) + 1;
        // }
    }

    resolve({
        aliveCells,
        grid: newGrid,
        lifes: Object.entries(lifes).map((pr, index) => [index, ...pr] as [number, string, number])
    });
})