var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1502211510181
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "<script>alert('uh oh!');</script>"
    },
    "created_at": 1461113796368
  }
];

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


const renderTweet= (data) => {
  var articles = data.map(generateHTML)
  var html = articles.join('')
  $('#tweets-container').html(html)
 }


 renderTweet(data)

});












