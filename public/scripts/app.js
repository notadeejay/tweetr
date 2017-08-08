function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


const generateHTML = (obj) => {
  const html = `
  <article>
      <header>
        <img class="usericon" src="${obj.user.avatars.small}">
        <span class="username">${obj.user.name}</span>
        <span class="user-handle">${obj.user.handle}</span>
      </header>

      <div class="tweet-content">
        <span>${escape(obj.content.text)}</span>
      </div>

      <footer>
        <span class="date">${convertDate(obj).created_at}<span>
        <span class="edit-on-hover" role="img-icon">
          <a href="#"><img class="hover-icon" src ="./images/flag.png"></a>
          <a href="#"><img class="hover-icon" src ="./images/retweet.png"></a>
          <a href="#"><img class="hover-icon" src ="./images/like.png"></a>
        </span>
      </footer>
    </article>
    `
  return html
}

//DOM READY
$(function() {

//TOGGLE COMPOSE NEW TWEET & AUTO FOCUS
$('.compose').click(function(){
   $('.new-tweet').slideDown()
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
  var html = data
            .sort((a,b) => b.created_at - a.created_at)
            .map(generateHTML)
            .join('')
  $('#tweets-container').html(html)
 }


//LOAD DEM TWEETS ON PAGE LOAD
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
  var tweetLength = $('.tweetinput').val().length

  if (!tweetLength) {
    alert('You cannot send an empty tweet 🙅‍')
    return
  }

  if (tweetLength > 140) {
    alert('Your tweet is more than 140 characters 🚫')
    return
  }

  //VALIDATING TWEET LENGTH
  var data = $(this).serialize();
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

 loadTweets();
});








