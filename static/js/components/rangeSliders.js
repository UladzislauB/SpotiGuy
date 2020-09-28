const progressBar = document.querySelector('.player-controls input[type="range"]');
const volumeBar = document.querySelector('.volume-bar__wrapper input[type="range"]');
rangeSlider.create(progressBar, {
    onSlideStart: value => {
        document.querySelector('.player-controls .rangeSlider__fill').classList.remove('buttonOff');
        document.querySelector('.player-controls .rangeSlider__fill').classList.add('buttonOn');
    },
    onSlideEnd: value => {
        document.querySelector('.player-controls .rangeSlider__fill').classList.remove('buttonOn');
        document.querySelector('.player-controls .rangeSlider__fill').classList.add('buttonOff');
    },
});
rangeSlider.create(volumeBar, {
    onSlide: value => {
        document.querySelector('.volume-bar__wrapper .rangeSlider__fill').style.background = '#05386b';
        document.querySelector('.volume-bar__wrapper .rangeSlider__handle').style.opacity = '1';
    },
    onSlideEnd: value => {
        document.querySelector('.volume-bar__wrapper .rangeSlider__fill').style.background = '#edf5e1';
        document.querySelector('.volume-bar__wrapper .rangeSlider__handle').style.opacity = '0';
    }
});