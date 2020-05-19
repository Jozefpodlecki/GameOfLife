import { Cell } from "../models/Cell";
import { StyleOptions } from "../models/StyleOptions";
import { RegisteredAction } from "../models/RegisteredAction";

const baseStyle: StyleOptions = {
    fontSize: "30px",
    fontFamily: "Arial",
    color: "#FFF",
}

export const setText = (context: CanvasRenderingContext2D, options: StyleOptions) => {
    const combined =  {
        ...baseStyle,
        ...options
    }

    if(!combined.color || !combined.text || !combined.x || !combined.y) {
        throw new Error("Missing params: x, y, color, text");
    }

    context.fillStyle = combined.color;
    context.font = `${combined.fontSize} ${combined.fontFamily}`;
    // ctx.fillText("width:" + ctx.measureText(txt).width, 10, 50)
    context.fillText(combined.text, combined.x, combined.y);
}

export const drawCell = (context: CanvasRenderingContext2D, cell: Cell) => {
    const { x, y, sizeX, sizeY, active } = cell;

    let color = "#FFFFFF99";

    if(!active) {
        color = "#000";
    }

    context.fillStyle = color;
    context.fillRect(x, y, sizeX, sizeY);
}

export const registered: RegisteredAction[] = []

export const setButton = (id: number, context: CanvasRenderingContext2D, options: StyleOptions, onClickCallback: () => void) => {
    const combined =  {
        ...baseStyle,
        ...options
    }

    if(!combined.color || !combined.text || !combined.x || !combined.y) {
        throw new Error("Missing params: x, y, color, text");
    }

    if(!registered.some(pr => pr.id === id)) {
        registered.push({
            id: id,
            startX: combined.x - 10,
            startY: combined.y - 35,
            endX: combined.x + 100,
            endY: combined.y + 50,
            callback: onClickCallback
        })
    }

    context.fillStyle = combined.color;
    context.font = `${combined.fontSize} ${combined.fontFamily}`;
    context.fillText(combined.text, combined.x, combined.y);
    context.strokeStyle = "#FFF";
    context.strokeRect(combined.x - 10, combined.y - 35, 100, 50);
}