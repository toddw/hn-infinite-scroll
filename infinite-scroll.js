$(document).ready(function() {
  $("body").append('<div id="loader">loading...</div>');
  
  function isLoaderOnScreen() {
    return $(window).scrollTop() + window.innerHeight + 500 > $("#loader").offset().top
  }

  function loadNext() {
    var nextPageHolderId = "page-" + Date.now(),
      moreButton = $("a:contains('More'):last"),
      nextPageURL = moreButton.attr('href');
    // validate moreButton
    if(moreButton.text() != "More") {
      return false;
    }
    
    moreButton.parents('table').parents('table').children('tbody').children('tr:last').remove();
    moreButton.closest('tr').remove();
    $("#loader").before('<div id="' + nextPageHolderId + '" style="margin-top:-20px"></div>');
    $("#" + nextPageHolderId).load(nextPageURL, function() {
      $("#" + nextPageHolderId).find('tr:first').remove();
    });

    if(isLoaderOnScreen()) {
      loadNext();
    }
  }
  
  $(document).scroll(function() {
    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(function() {
      if(isLoaderOnScreen()) {
        loadNext();
      }
    }, 500);
  });

  if(isLoaderOnScreen()) {
    loadNext();
  }
});
