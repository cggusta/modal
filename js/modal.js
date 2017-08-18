$(function(){

modalOpen = false;
internalModal = false;
modalVideoOpen = false;

// finds if links are internal or external
$.expr[':'].external = function (a) {
    var PATTERN_FOR_EXTERNAL_URLS = /^(\w+:)?\/\//;
    var href = $(a).attr('href');
    return href !== undefined && href.search(PATTERN_FOR_EXTERNAL_URLS) !== -1;
};

$.expr[':'].internal = function (a) {
    return $(a).attr('href') !== undefined && !$.expr[':'].external(a);
};

hiroCloseButton = $(' <div class="hiroModalClose"><a href="#" onclick="return false;" tabindex="0" style="text-decoration:none;color:white;">&times;</a></div> ');

$('.hiroModal').prepend(hiroCloseButton);


var modalContainer = $('.hiroModal.currentModal');
modalContainer.attr('tabindex', 0).focus().append('<button class="pull-right modalCloseBtn">Close</button>');
var modalCloseBtn = $('.hiroModal.currentModal .modalCloseBtn');

// close functionality on new button
$('#hiroBlocker, .modalCloseBtn').click(function(event)

{ closeModal(); }
);

modalCloseBtn.on('keydown', function(e) {
var key = 'which' in e ? e.which : e.keyCode;
if (key === 9) {
// to avoid teb jump
setTimeout(function()

{ modalContainer[0].focus(); }
,0);
}
});


// modal click detector, starts the testing
$('.hiroModalLink').click(function(event) {
  event.preventDefault();
  $('#hiroBlocker').fadeIn('fast');

  if( $(this).prop("nodeName") == 'IMG' ) {

    // do img things
    var imgSource = $(this).prop("src");
    $('#hiroModalFrame').append( '<img class="addedToModal" src="' + imgSource + '"><div id="modalEnd" tabindex="0"></div>')
    $('#hiroModalFrame').fadeIn('fast', function() {
      $(this).addClass('currentModal');
    });

  }
  else if( $(this).data('videoid') ) {
    
    //  if it's a video
    modalVideoOpen = true;
    youTubeModalId = $(this).data('videoid');
    youTubeModuleName = $(this).data('trackingref');
    selectModalVideo();
    $('#hiroYouTubeModal').fadeIn('fast');
    $('#hiroYouTubeModal').addClass('currentModal');
    $('.hiroModalClose').addClass('reverseOutClose');
    $('#hiroYouTubeModal').append('<div id="modalEnd" tabindex="0"></div>');

  }
  else if ( $(this).is( 'a:internal' ) ) {

    // if it's an internal link
    var internalLinkTarget = $(this).attr('href');
      // $('#hiroModalFrame').append( '<div class="iframeWrapper"><iframe class="addedToModal"></iframe></div><div id="modalEnd" tabindex="0"></div>' );
      // $('#oprahAppearanceFAQ').find('.hiroModalContentWrapper').appendTo('.addedToInternalModal');
      // $(internalLinkTarget).appendTo('#hiroModalFrame');

    $(internalLinkTarget).fadeIn('slow/400/fast', function() {
      $(this).addClass('currentModal').prepend('<div id="iModalStart" tabindex="0"></div>').append('<div id="iModalEnd" tabindex="0"></div>');
      internalModal = true;
      $("#iModalStart").attr('tabindex', 0)[0].focus();
    });
  }

  else if ( $(this).is('a:external') ) {
    // if it's external
    event.preventDefault();
    console.log('external link');
    $('.hiroModal').focus();
    
    var externalLinkTarget = $(this).attr('href');
    // console.log("EXTERNAL LINK TARGET FIRST CHARACTER IS:" + externalLinkTarget[0]);
    $('#hiroModalFrame').append( '<div class="iframeWrapper"><iframe class="addedToModal" src="' + externalLinkTarget + '"></iframe></div><div id="modalEnd" tabindex="0"></div>' );
    $('#hiroModalFrame').fadeIn('fast', function() {
      $(this).addClass('currentModal');
    });
  }

  $('.currentModal').focus();
  // reorder tab index to start with modal close button
  if (!internalModal) {
    $("#hiroBlocker").attr('tabindex', 0)[0].focus();
  }
  modalOpen = true;



  $("body").addClass('hiroModal-open').on('keyup', function(evt) {
  if (modalOpen){
    if (evt.which === 9) { // tab
      if (!internalModal) {
        var first = $("#hiroBlocker")[0];
        var last = $("#modalEnd")[0];
        var onFirstWithShift = evt.target === first && evt.shiftKey;
        var onLastNoShift = evt.target === last && !evt.shiftKey;
        if (onFirstWithShift || onLastNoShift) {
          evt.preventDefault();
        }
      } else {
        var first = $("#iModalStart")[0];
        var last = $("#iModalEnd")[0];
        var onFirstWithShift = evt.target === first && evt.shiftKey;
        var onLastNoShift = evt.target === last && !evt.shiftKey;
        if (onFirstWithShift || onLastNoShift) {
          evt.preventDefault();
        }
      }
    }
    if (evt.which === 27) {
      closeModal();
    }
    else if (heroVideoOpen){
      closeHeroVideo();
    }
  }
  });
   
  $("body").on('keydown', function(evt) {
  if (modalOpen){
    if (evt.which === 9) { // tab
      if (!internalModal) {
        var first = $("#hiroBlocker")[0];
        var last = $("#modalEnd")[0];
        if (evt.target === first && evt.shiftKey) {
          // user is going from first to last
          evt.preventDefault();
          last.focus();
        } else if (evt.target === last && !evt.shiftKey) {
          // uesr is going from last to first
          evt.preventDefault();
          first.focus();
        }
      } else {
        var first = $("#iModalStart")[0];
        var last = $("#iModalEnd")[0];
        if (evt.target === first && evt.shiftKey) {
          // user is going from first to last
          evt.preventDefault();
          last.focus();
        } else if (evt.target === last && !evt.shiftKey) {
          // uesr is going from last to first
          evt.preventDefault();
          first.focus();
        }
      }
    }
  }
  });
});

// close functions

$('#hiroBlocker, .hiroModalClose').click(function(event) {
  closeModal();
});

// defining functions

window.closeModal = function() {
  if (modalOpen) {
    if (modalVideoOpen){
     stopModalVideo();
     $('.hiroModalClose').removeClass('reverseOutClose');
     modalVideoOpen = false;
    };
    $('#hiroBlocker').fadeOut('fast');
    $('.currentModal').fadeOut('fast');
    if ($('.currentModal').has('.addedToModal').length != 0) {
      $('.addedToModal').remove();
      $('.iframeWrapper').remove();
      $('#modalEnd').remove();
    };
    if (internalModal) {
      $('#iModalStart').remove();
      $('#iModalEnd').remove();
      internalModal = false;
    }
    $('.currentModal').removeClass('currentModal');
    $("body").removeClass('hiroModal-open');
    modalOpen = false;
  }
};

})();