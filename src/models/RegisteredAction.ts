export interface RegisteredAction {
    id: number;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    callback: () => void;
}