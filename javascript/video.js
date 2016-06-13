/**
 * Controlador de botones del video.
 * Created by mor on 12/06/16.
 */

var video = {
    /**
     * Retorna el elemento vídeo del DOM.
     * @returns {HTMLElement}
     */
    getVideo: function() {
        return elements.getVideo(true);
    },
    /**
     * Para o reanuda la reproducción del vídeo.
     */
    playPause: function() {
        var v = video.getVideo();
        if (v.paused)
            v.play();
        else
            v.pause();
    },
    /**
     * Aumenta el tamaño del elemento vídeo.
     */
    makeBig: function() {
        video.getVideo().width = 560;
    },
    /**
     * Reduce el tamaño del elemento vídeo.
     */
    makeSmall: function() {
        video.getVideo().width = 320;
    },
    /**
     * Restaura el tamaño del elemento vídeo a las proporciones por defecto.
     */
    makeNormal: function() {
        video.getVideo().width = 420;
    }
};