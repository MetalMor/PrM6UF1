/**
 * Controlador de botones del video.
 * Created by mor on 12/06/16.
 */

var video = {
    getVideo: function() {
        return elements.getVideo(true);
    },
    playPause: function() {
        var v = video.getVideo();
        if (v.paused)
            v.play();
        else
            v.pause();
    },
    makeBig: function() {
        video.getVideo().width = 560;
    },
    makeSmall: function() {
        video.getVideo().width = 320;
    },
    makeNormal: function() {
        video.getVideo().width = 420;
    }
};