//STAYIN' SAFE FROM XXS
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

//GENERATES THE HTML FOR EACH NEW TWEET
const generateHTML = (obj) => {
  const html = `
  <article>
      <header>
        <img class="usericon" src="${obj.user.avatars.small}">
        <span class="username">${obj.user.name}</span>
        <span class="user-handle">${obj.user.handle}</span>
      </header>

      <div class="tweet-content">
        <p class="break-word">${escape(obj.content.text)}</p>
      </div>

      <footer>
        <span class="date">${convertDate(obj).created_at}<span>
        <span class="edit-on-hover" id="#icons" role="img-icon">
          <a href="#"><img class="hover-icon" src ="./images/flag.png"></a>
          <a href="#"><img class="hover-icon" src ="./images/retweet.png"></a>
          <span class = "likes">${obj.likes}</span>
          <a href ="#" class="heart" data-tweetid="${obj._id}">
            <img class="hover-icon" src ="./images/like.png">
          </a>
        </span>
      </footer>
    </article>
    `
  return html;
}

//DOM READY
$(function() {


//TOGGLE COMPOSE NEW TWEET & AUTO FOCUS
$('.grow').click(function(){
   $('.new-tweet').slideToggle()
    $('textarea').focus();
});


//ALLOW USER TO SUBMIT BY PRESSING ENTER
$("textarea.tweetinput").keydown(function(event){
    if(event.keyCode == 13){
        $("#tweet-submit").click();
    }
});




//RENDER THE CORRECT HTML FOR TWEETS
const renderTweets = (data) => {
  let html = data
            .sort((a,b) => b.created_at - a.created_at)
            .map(generateHTML)
            .join('')
  $('#tweets-container').html(html)
 }



//LOAD DEM TWEETS
const loadTweets = () => {
  $.ajax({
          url:'http://localhost:8080/tweets',
          method: 'GET'
         }).then(function (response) {
            renderTweets(response);
      });
  }

//DAT FORM SUBMIT
$("#tweetform").submit(function(event) {
  event.preventDefault();
  let tweetLength = $('.tweetinput').val().length

  if (!tweetLength) {
    alert('You cannot send an empty tweet 🙅‍')
    return
  }

  if (tweetLength > 140) {
    alert('Your tweet is more than 140 characters 🚫')
    return
  }

  //VALIDATING TWEET LENGTH
  let data = $(this).serialize();
      $.ajax({
        url: 'http://localhost:8080/tweets',
        method: 'POST',
        data: data
      }).then(function() {
      //CLEAR THE INPUT
      $('.tweetinput').val('');
      //LOAD THE TWEETS
      loadTweets();
     //RESET THE COUNTER
      $('.counter').text('140');
    });

});

//LOAD TWEETS ON DOM READY
 loadTweets();


//AJAX REQUEST to handle the like click
$(document).on('click', '.heart', function (event) {
  event.preventDefault();
  var tweetid = $(this).data('tweetid')
      $.ajax({
        url: `http://localhost:8080/tweets/${tweetid}`,
        method: 'POST'
      }).then(function (response) {
                loadTweets();
          });
});




});









