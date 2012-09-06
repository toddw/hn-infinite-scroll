$(document).ready(function() {
  $("body").append('<div id="loader">loading...</div>');
  
  function loadNext() {
    var nextPageHolderId = "page-" + Date.now(),
      moreButton = $("a:contains('More'):last"),
      nextPageURL = moreButton.attr('href');
    // validate moreButton
    if(moreButton.text() != "More") {
      return setTimeout(function() {
        loadNext();
      });
    }
    
    moreButton.parents('table').parents('table').children('tbody').children('tr:last').remove();
    moreButton.closest('tr').remove();
    $("#loader").before('<div id="' + nextPageHolderId + '" style="margin-top:-20px"></div>');
    $("#" + nextPageHolderId).load(nextPageURL, function() {
      $("#" + nextPageHolderId).find('tr:first').remove();
    });
  }
  
  $(document).scroll(function() {
    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(function() {
      if($(window).scrollTop() + $(window).height() + 500 > $("#loader").offset().top) {
        loadNext();
      }
    }, 500);
  });
});
