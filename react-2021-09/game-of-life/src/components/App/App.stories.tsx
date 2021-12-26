import React from 'react';
import { defaultAppState } from '@src/components/AppStateManager/appReducer';
import { App } from './App';
import { action } from '@storybook/addon-actions';
import { CellInfo } from '@src/types';

export default {
    title: 'App',
};

export const Static = () => {
    const x = CellInfo.alive;
    const o = CellInfo.dead;
    const defaultStaticAppState = {
        ...defaultAppState,
        data: [o, x, x, x, o, x, o, o, o, o, o, x, x, x, o, o, o, o, o, x, o, x, x, x, o],
    };

    return (
        <App
            appState={defaultStaticAppState}
            invert={action('invert')}
            setSmall={action('setSmall')}
            setMedium={action('setMedium')}
            setLarge={action('setLarge')}
            clear={action('clear')}
            fill25={action('fill25')}
            fill50={action('fill50')}
            fill75={action('fill75')}
            fill100={action('fill100')}
            onName={action('onName')}
            onLogout={action('onLogout')}
        />
    );
};
