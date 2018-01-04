export default {
    suddenDeath: {
        mode: 'Sudden death',
        playerOne: {
            time: 300000,
            prettyTime: {
                hours: '00',
                minutes: '00',
                seconds: '00',
            },
            moves: 0
        },
        playerTwo: {
            time: 300000,
            prettyTime: {
                hours: '00',
                minutes: '00',
                seconds: '00',
            },
            moves: 0
        },
        activePlayer: undefined,
        paused: false,
        winner: undefined,
        delay: 0
    },
    hourGlass: {
        mode: 'Hourglass',
        playerOne: {
            time: 60000,
            prettyTime: {
                hours: '00',
                minutes: '00',
                seconds: '00',
            },
            moves: 0
        },
        playerTwo: {
            time: 60000,
            prettyTime: {
                hours: '00',
                minutes: '00',
                seconds: '00',
            },
            moves: 0
        },
        activePlayer: undefined,
        paused: false,
        winner: undefined,
        delay: 0
    },
    overtime: {
        mode: 'Overtime',
        playerOne: {
            time: 12000000,
            prettyTime: {
                hours: '00',
                minutes: '00',
                seconds: '00',
            },
            moves: 0
        },
        playerTwo: {
            time: 12000000,
            prettyTime: {
                hours: '00',
                minutes: '00',
                seconds: '00',
            },
            moves: 0
        },
        activePlayer: undefined,
        paused: false,
        winner: undefined,
        addTime: {
            threshold: 40000,
            time: 1800000
        },
        delay: 0
    },
    increment: {
        mode: 'Increment',
        playerOne: {
            time: 60000,
            prettyTime: {
                hours: '00',
                minutes: '00',
                seconds: '00',
            },
            moves: 0
        },
        playerTwo: {
            time: 60000,
            prettyTime: {
                hours: '00',
                minutes: '00',
                seconds: '00',
            },
            moves: 0
        },
        activePlayer: undefined,
        paused: false,
        winner: undefined,
        addTime: {
            threshold: 0,
            time: 10000
        },
        delay: 0
    },
    delay: {
        mode: 'Delay',
        playerOne: {
            time: 5400000,
            prettyTime: {
                hours: '00',
                minutes: '00',
                seconds: '00',
            },
            moves: 0
        },
        playerTwo: {
            time: 5400000,
            prettyTime: {
                hours: '00',
                minutes: '00',
                seconds: '00',
            },
            moves: 0
        },
        activePlayer: undefined,
        paused: false,
        winner: undefined,
        delay: 10000
    }
}