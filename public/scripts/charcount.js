$(document).ready(function(){
  $("textarea.tweetinput").keyup(function () {
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