import { Cell } from "./models/Cell";
import { initalizeGrid, drawBoard, detectBlock, detectBlinker, detectLoaf, detectBoat, detectGlider, detectTub, detectPatterns, computeNextState } from "./api";
import { StyleOptions } from "./models/StyleOptions";
import { RegisteredAction } from "./models/RegisteredAction";
import { setText, drawCell, registered, setButton } from "./utils/drawing";

export default () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let gridOptions = {
        xOffset: 0,
        yOffset: 100,
        width: width,
        height: height - 200,
        rows: 100,
        columns: 90
    }

    canvas.addEventListener("mousemove", (event) => {
        const { clientX, clientY } = event;
        
        for(const { startX, endX, startY, endY } of registered) {
            if(clientX > startX && clientX < endX && clientY > startY && clientY < endY) {
                canvas.style.cursor = "pointer";
            }
            else {
                canvas.style.cursor = "initial";
            }
        }
    })

    canvas.addEventListener("click", (event) => {
        const { clientX, clientY } = event;
        
        for(const { startX, endX, startY, endY, callback } of registered) {
            if(clientX > startX && clientX < endX && clientY > startY && clientY < endY) {
                callback();
                return;
            }
        }
    })

    window.addEventListener("resize", () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        gridOptions.width = width;
        gridOptions.height = height - 200;
        resetTriggered = true;
        grid = initalizeGrid(gridOptions);
    })

    if(!context) {
        return
    }

    let grid = initalizeGrid(gridOptions);

    const dpr = window.devicePixelRatio || 1;
    const bsr = context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
          context.backingStorePixelRatio || 1;

    const state = {
        ready: false
    }

    let newGrid: any = null;
    let lastState = {
        grid,
        lifes: [],
        aliveCells: 0
    };
    let resetTriggered = false;
    let canUpdate = false;

    const getLatestState = () => {
        return lastState
    }

    const tryReplaceState = (state: any) => {
        if(canUpdate) {
            if(!resetTriggered) {
                lastState = state;
            }
            resetTriggered = false;
            setTimeout(computeNextStateLoop, 0);
            return;
        }
        setTimeout(tryReplaceState, 5);    
    }

    const computeNextStateLoop = () => {
        const { grid } = lastState;
        computeNextState(grid)
            .then((state: any) => {
                setTimeout(() => tryReplaceState(state), 0);
            })
    }

    setTimeout(computeNextStateLoop, 0);

    const currentYear  = new Date().getFullYear();

    const onResetClick = () => {
        resetTriggered = true;
        grid = initalizeGrid(gridOptions);
        lastState = {
            grid,
            lifes: [],
            aliveCells: 0
        };
    }

    const loop = () => {
        canUpdate = false;
        drawBoard(context, canvas.width, canvas.height);

        const { aliveCells, lifes, grid } = getLatestState();

        for(let cell of grid) {
            drawCell(context, cell);
        }

        setText(context, {
            text: `Alive cells ${aliveCells}`,
            x: width / 50,
            y: height / 10
        })

        setText(context, {
            text: "Game of Life",
            x: width / 2,
            y: height / 10,
            fontSize: "50px"
        });

        // setText(context, {
        //     text: "Detected lifes",
        //     x: 1000,
        //     y: 50
        // });

        setButton(1, context, {
            text: "Reset",
            x: width * 2 / 3,
            y: height * 9 / 10,
        }, onResetClick);

        // for(let [index, name, count] of lifes) {
        //     setText(context, {
        //         text: `${name} ${count}`,
        //         x: 1000,
        //         y: index * 50 + 100
        //     });
        // }

        setText(context, {
            text: `Józef Podlecki ${currentYear}`,
            x: width / 2,
            y: height * 9 / 10
        });

        canUpdate = true;

        setTimeout(() => {
            requestAnimationFrame(loop);
        }, 30)
    }

    requestAnimationFrame(loop);
}