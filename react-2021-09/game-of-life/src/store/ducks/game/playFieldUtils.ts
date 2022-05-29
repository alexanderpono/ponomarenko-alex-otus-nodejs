import { DEFAULT_CELL_STATE } from '@src/consts';
import { CellArray, CellInfo } from '@src/types';

export function createData(width: number, height: number): CellInfo[] {
    const cellsNumber = width * height;
    const newData: CellInfo[] = [];
    for (let i = 0; i < cellsNumber; i++) {
        newData.push(DEFAULT_CELL_STATE);
    }
    return newData;
}

export function recreateData(
    oldData: CellInfo[],
    oldWidth: number,
    oldHeight: number,
    width: number,
    height: number
): CellInfo[] {
    const cellsNumber = width * height;
    const newData: CellInfo[] = [];
    for (let i = 0; i < cellsNumber; i++) {
        newData.push(DEFAULT_CELL_STATE);
    }

    const minWidth = oldWidth < width ? oldWidth : width;
    const minHeight = oldHeight < height ? oldHeight : height;

    for (let y = 0; y < minHeight; y++) {
        for (let x = 0; x < minWidth; x++) {
            const visibleVal = oldData[yx(y, x, oldWidth)];
            newData[yx(y, x, width)] = visibleVal;
        }
    }
    return newData;
}

export const yx = (y: number, x: number, width: number) => y * width + x;

export const randomFill = (srcAr: CellArray, probability: number): CellArray => {
    if (probability < 0 || probability > 1) {
        throw new Error('Probability must be between 0 and 1');
    }

    const ar = {
        ...srcAr,
        data: createData(srcAr.width, srcAr.height),
    };

    const totalCells = ar.width * ar.height;
    let unprocessedCells = totalCells;
    let restAliveCells = Math.floor(unprocessedCells * probability);
    for (let i = 0; i < totalCells; i++) {
        let alive = CellInfo.dead;
        if (restAliveCells > 0 && restAliveCells / unprocessedCells > Math.random()) {
            alive = CellInfo.alive;
            restAliveCells--;
        }
        ar.data[i] = alive;
        unprocessedCells--;
    }

    return ar;
};

export const getInverted = (cell: CellInfo): CellInfo =>
    cell === CellInfo.alive ? CellInfo.dead : CellInfo.alive;

export const getCicledX = (srcAr: CellArray, x: number): number => {
    if (x >= 0) {
        return x % srcAr.width;
    }

    return (x % srcAr.width) + srcAr.width;
};

export const getCicledY = (srcAr: CellArray, y: number): number => {
    if (y >= 0) {
        return y % srcAr.height;
    }

    return (y % srcAr.height) + srcAr.height;
};

//matrix of cells 3x3:
//a b c
//d e f
//g h i
type CellCalculator = (
    a: CellInfo,
    b: CellInfo,
    c: CellInfo,
    d: CellInfo,
    e: CellInfo,
    f: CellInfo,
    g: CellInfo,
    h: CellInfo,
    i: CellInfo
) => CellInfo;
export const getInvertedCellState: CellCalculator = (
    a: CellInfo,
    b: CellInfo,
    c: CellInfo,
    d: CellInfo,
    e: CellInfo,
    f: CellInfo,
    g: CellInfo,
    h: CellInfo,
    i: CellInfo
) => (e === CellInfo.dead ? CellInfo.alive : CellInfo.dead);

export const getNewField = (srcAr: CellArray, calculator: CellCalculator): CellArray => {
    const newField = { ...srcAr, data: [...srcAr.data] };
    const getVal = (ar: CellArray, y: number, x: number) => {
        if (y < 0 || y >= ar.height || x < 0 || x >= ar.width) {
            return CellInfo.dead;
        }
        return ar.data[yx(y, x, ar.width)];
    };

    for (let y = 0; y < srcAr.height; y++) {
        for (let x = 0; x < srcAr.width; x++) {
            const a = getVal(srcAr, y - 1, x - 1);
            const b = getVal(srcAr, y - 1, x);
            const c = getVal(srcAr, y - 1, x + 1);
            const d = getVal(srcAr, y, x - 1);
            const e = getVal(srcAr, y, x);
            const f = getVal(srcAr, y, x + 1);
            const g = getVal(srcAr, y + 1, x - 1);
            const h = getVal(srcAr, y + 1, x);
            const i = getVal(srcAr, y + 1, x + 1);
            const newE = calculator(a, b, c, d, e, f, g, h, i);
            newField.data[yx(y, x, srcAr.width)] = newE;
        }
    }
    return newField;
};

export const getGOLCellState: CellCalculator = (
    a: CellInfo,
    b: CellInfo,
    c: CellInfo,
    d: CellInfo,
    e: CellInfo,
    f: CellInfo,
    g: CellInfo,
    h: CellInfo,
    i: CellInfo
) => {
    const neighbors = [a, b, c, d, f, g, h, i];
    const aliveNeighbors = neighbors.filter((cell: CellInfo) => cell === CellInfo.alive);
    const cellToLive =
        aliveNeighbors.length === 3 || (aliveNeighbors.length === 2 && e == CellInfo.alive);
    return cellToLive ? CellInfo.alive : CellInfo.dead;
};
