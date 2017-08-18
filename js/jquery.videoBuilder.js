// YouTube Builder

      // This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      //This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      var heroCSVidPlayer;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          moduleName: '',
          playerVars: {
            'showinfo': 0,
            'rel': 0,
            'autoplay': 0,
          },
          events: {
            'onReady': onPlayerReady,
          }
        });

        heroCSVidPlayer = new YT.Player('heroCSVidPlayer', {
          height: '390',
          width: '640',
          moduleName: '',
          playerVars: {
            'showinfo': 0,
            'rel': 0,
            'autoplay': 0,
          },
          events: {
            'onReady': onPlayerReady,
          }
        });
        
      }

      
      function onPlayerReady() {};

      // selector functions
      function selectModalVideo() {
        console.log('playbackstarted set');
        player.cueVideoById(youTubeModalId);
        if(!/iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
          player.playVideo();
        }
      };
      
      function selectHeroVideo() {
        heroCSVidPlayer.cueVideoById(youTubeHeroId);
        if(!/iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
          heroCSVidPlayer.playVideo();
        }
      };

      // $(window).keyup(function(e) {
      //   var player;
      //   if ($(''))
      //   var SPACE_BAR = 32;
      //   switch (e.which) {
      //     case SPACE_BAR: 
      //       if{}
      //   }
      // });
      
      function stopModalVideo() {
        player.stopVideo();
      }

      function stopHeroVideo() {
        heroCSVidPlayer.stopVideo();
      }

// Video Modal Functions 
      
      

