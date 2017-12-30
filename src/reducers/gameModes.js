export default {
    suddenDeath: {
        mode: 'suddenDeath',
        playerOne: {
            time: 300,
            moves: 0,
        },
        playerTwo: {
            time: 300,
            moves: 0,
        },
        activePlayer: undefined,
        paused: false,
        winner: undefined,
        addTime: undefined,
        increment: undefined,
        delay: undefined
    },
    hourGlass: {
        mode: 'hourGlass',
        playerOne: {
            time: 60,
            moves: 0,
        },
        playerTwo: {
            time: 60,
            moves: 0,
        },
        activePlayer: undefined,
        paused: false,
        winner: undefined,
        addTime: undefined,
        increment: undefined,
        delay: undefined
    },
    overTime: {
        mode: 'overTime',
        playerOne: {
            time: 1200,
            moves: 0,
        },
        playerTwo: {
            time: 1200,
            moves: 0,
        },
        customizable: true,
        activePlayer: undefined,
        paused: false,
        winner: undefined,
        addTime: {
            threshhold: 40,
            addTime: 1800
        },
        increment: undefined,
        delay: undefined
    },
    increment: {
        mode: 'incremnet',
        playerOne: {
            time: 5400,
            moves: 0,
        },
        playerTwo: {
            time: 5400,
            moves: 0,
        },
        customizable: true,
        activePlayer: undefined,
        paused: false,
        winner: undefined,
        addTime: undefined,
        increment: 10,
        delay: undefined
    },
    delay: {
        mode: 'delay',
        playerOne: {
            time: 5400,
            moves: 0,
        },
        playerTwo: {
            time: 5400,
            moves: 0,
        },
        customizable: true,
        activePlayer: undefined,
        paused: false,
        winner: undefined,
        addTime: undefined,
        increment: undefined,
        delay: 10
    }
}