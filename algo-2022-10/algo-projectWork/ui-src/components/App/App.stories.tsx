import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { App } from './App';
import { Graph, SILENT } from '@ui-src/Graph';
import { GameField } from '@ui-src/GameField';

export default {
    title: 'App',
    decorators: [withKnobs]
};

export const App1 = () => {
    const adjacencyMatrix = `
  AABBCCDDEEFFGG
AA..020306......
BB02..04..09....
CC0304..010706..
DD06..01....04..
EE..0907....0105
FF....060401..08
GG........0508..
`;

    const g = Graph.create()
        .initFromAdjacencyString(adjacencyMatrix)
        .calcEdges()
        .calcVertices()
        .calcVerticesCost(6, 0, SILENT)
        .calcCheapestPath(6, 0);

    const field = GameField.create();

    return <App graph={g} field={field} />;
};