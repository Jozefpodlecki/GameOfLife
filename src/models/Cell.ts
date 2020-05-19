export interface Cell {
    id: number;
    x: number;
    y: number;
    row: number;
    column: number;
    sizeX: number;
    sizeY: number;
    active: boolean;
    neighborIds: number[];
}