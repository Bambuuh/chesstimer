import Sound from 'react-native-sound'

const click = new Sound('button_click_sound.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        console.log('failed to load the sound', error);
        return;
    }
});

const timesUp = new Sound('time_up_sound.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        console.log('failed to load the sound', error);
        return;
    }
});

export { click, timesUp }