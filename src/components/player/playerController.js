import { Howl } from 'howler';


/* eslint-disable */
export const PlayerController = function (playlist) {
    this.playlist = playlist;
    this.index = 0;

    // track.innerHTML = '1. ' + playlist[0].title;
};

PlayerController.prototype = {
    /**
     * Play a song in the playlist.
     * @param  {Number} index Index of the song in the playlist (leave empty to play the first or current).
     */
    play: function (index) {
        var self = this;
        var sound;

        index = (typeof index === 'number') ? index : self.index;
        var data = self.playlist[index];

        // If we already loaded this track, use the current one.
        // Otherwise, setup and load a new Howl.
        if (data.howl) {
            sound = data.howl;
        } else {
            sound = data.howl = new Howl({
                src: [data.file],
                // // Force to HTML5 so that the audio can stream in (best for large files).
                html5: true,
                preload: true,
                onplay: function () {
                    requestAnimationFrame(self.step.bind(self));
                    duration.innerHTML = self.formatTime(Math.round(sound.duration()));
                },
                // onload: function () {
                //     console.log('onload');
                // },
                // onend: function () {
                //     console.log('onend');
                //     self.skip('next');
                // },
                // onpause: function () {
                //     console.log('onpause');
                // },
                // onstop: function () {
                //     console.log('onstop');
                // }
            });
        }

        // Begin playing the sound.
        sound.play();

        // Update the track display.
        track.innerHTML = (index + 1) + '. ' + data.title;

        // Keep track of the index we are currently playing.
        self.index = index;
    },

    /**
     * Pause the currently playing track.
     */
    pause: function () {
        var self = this;

        // Get the Howl we want to manipulate.
        var sound = self.playlist[self.index].howl;

        // Puase the sound.
        sound.pause();
    },

    /**
     * Skip to the next or previous track.
     * @param  {String} direction 'next' or 'prev'.
     */
    skip: function (direction) {
        var self = this;

        // Get the next track based on the direction of the track.
        var index = 0;
        if (direction === 'prev') {
            index = self.index - 1;
            if (index < 0) {
                index = self.playlist.length - 1;
            }
        } else {
            index = self.index + 1;
            if (index >= self.playlist.length) {
                index = 0;
            }
        }

        self.skipTo(index);
    },

    /**
     * Skip to a specific track based on its playlist index.
     * @param  {Number} index Index in the playlist.
     */
    skipTo: function (index) {
        var self = this;

        // Stop the current track.
        if (self.playlist[self.index].howl) {
            self.playlist[self.index].howl.stop();
        }

        // Play the new track.
        self.play(index);
    },

    step: function () {
        var self = this;

        // Get the Howl we want to manipulate.
        var sound = self.playlist[self.index].howl;

        if (sound && sound.playing()) {
            // Determine our current seek position.
            var seek = sound.seek() || 0;
            timer.innerHTML = self.formatTime(Math.round(seek));

            requestAnimationFrame(self.step.bind(self));
        }

    },

    volume: function (val) {
        var self = this;

        // Update the global volume (affecting all Howls).
        Howler.volume(val);

        // Update the display on the slider.

        var volumeBarWidth = Number(val.toFixed(3));
        volumeBarFull.style.width = (volumeBarWidth * 100) + '%';
    },

    toggleVolume: function () {
        var display = (volumeControl.style.display === 'block') ? 'none' : 'block';
        var isVisible = (display === 'block');

        setTimeout(function () {
            volumeControl.style.display = display;
        }, isVisible ? 0 : 300);

        if (isVisible) {
            volumeControl.classList.add('volumeFadein');
            volumeControl.classList.remove('volumeFadeout');
        } else {
            volumeControl.classList.remove('volumeFadein');
            volumeControl.classList.add('volumeFadeout');
        }
    },

    hideVolume: function () {
        if (volumeControl.style.display === 'block') {
            setTimeout(function () {
                volumeControl.style.display = 'none';
            }, 300);

            volumeControl.classList.add('volumeFadein');
            volumeControl.classList.remove('volumeFadeout');
        }
    },

    /*
     * Format the time from seconds to M:SS.
     * @param  {Number} secs Seconds to format.
     * @return {String}      Formatted time.
     */
    formatTime: function (secs) {
        var minutes = Math.floor(secs / 60) || 0;
        var seconds = (secs - minutes * 60) || 0;

        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }
};
