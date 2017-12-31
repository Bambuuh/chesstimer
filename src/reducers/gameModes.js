export default {
    suddenDeath: {
        key: 'suddenDeath',
        mode: 'Sudden death',
        settings: {
            baseTime: {
                hours: '00',
                minutes: '05',
                seconds: '00',
            }
        },
        playerOne: {
            time: 300,
            moves: 0
        },
        playerTwo: {
            time: 300,
            moves: 0
        },
        activePlayer: undefined,
        paused: false,
        winner: undefined
    },
    hourGlass: {
        key: 'hourGlass',
        mode: 'Hourglass',
        settings: {
            baseTime: {
                hours: '00',
                minutes: '01',
                seconds: '00'
            },
        },
        playerOne: {
            time: 60,
            moves: 0
        },
        playerTwo: {
            time: 60,
            moves: 0
        },
        activePlayer: undefined,
        paused: false,
        winner: undefined
    },
    overtime: {
        key: 'overtime',
        mode: 'Overtime',
        settings: {
            baseTime: {
                hours: '01',
                minutes: '30',
                seconds: '00'
            },
            addedTime: {
                hours: '00',
                minutes: '30',
                seconds: '00'
            },
            moveThreshold: 40
        },
        playerOne: {
            time: 1200,
            moves: 0
        },
        playerTwo: {
            time: 1200,
            moves: 0
        },
        activePlayer: undefined,
        paused: false,
        winner: undefined,
        addTime: {
            threshhold: 40,
            addTime: 1800
        },
    },
    increment: {
        key: 'increment',
        mode: 'Increment',
        settings: {
            baseTime: {
                hours: '00',
                minutes: '01',
                seconds: '00'
            },
            addedTime: {
                seconds: '10'
            },
        },
        playerOne: {
            time: 5400,
            moves: 0
        },
        playerTwo: {
            time: 5400,
            moves: 0
        },
        activePlayer: undefined,
        paused: false,
        winner: undefined,
        increment: 10
    },
    delay: {
        key: 'delay',
        mode: 'Delay',
        settings: {
            baseTime: {
                hours: '00',
                minutes: '05',
                seconds: '00'
            },
            addedTime: {
                minutes: '00',
                seconds: '10'
            },
        },
        playerOne: {
            time: 5400,
            moves: 0
        },
        playerTwo: {
            time: 5400,
            moves: 0
        },
        activePlayer: undefined,
        paused: false,
        winner: undefined,
        delay: 10
    }
}