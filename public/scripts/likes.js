$(function() {


$("#like-counter").on('click', function(e) {
  if (typeof(Storage) !== "undefined") {
    if (localStorage.clickcount) {
      //Using this just to reset after every refresh :D
      localStorage.clickcount = parseInt($("#displayCount").text());
      localStorage.clickcount = Number(localStorage.clickcount) + 1;
    } else {
      localStorage.clickcount = 1;
    }
    document.getElementById("displayCount").innerHTML = localStorage.clickcount;
  } else {
    document.getElementById("displayCount").innerHTML = "NaN";
  }
});


});