$(document).ready(function(){
  $("textarea.tweetinput").on('input', function (e) {
    let max = 140;
    let length = $(this).val().length;
    let remaining = max - length;
    let counterElement = $(this).siblings(".counter")

    counterElement.html(remaining);

    if (remaining < 0) {
      $(counterElement).addClass("overlimit")
    } else {
      $(counterElement).removeClass("overlimit");
    }
  });

});
