$(document).ready(function(){
  $("textarea.tweetinput").on('input', function (e) {
    var max = 140;
    var length = $(this).val().length;
    var remaining = max - length;
    var counterElement = $(this).siblings(".counter")

    counterElement.html(remaining);

    if (remaining < 0) {
      $(counterElement).addClass("overlimit")
    } else {
      $(counterElement).removeClass("overlimit");
    }
  });

});
