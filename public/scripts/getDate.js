function convertDate(obj) {
  var timeSince = "";
  var seconds = Math.floor((new Date() - obj.created_at) / 1000);
  //CONVERT TO YEARS
  var year = Math.floor(seconds / 31536000);
  var months = Math.floor(seconds / 2592000);
  var days = Math.floor(seconds / 86400);
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor(seconds / 60);


  if (year > 1) {
  timeSince = year + 'years ago'
  } else if (months > 1) {
    timeSince = months + ' months ago';
  } else if (days > 1) {
    timeSince =  days + ' days ago';
  } else if (hours > 1) {
    timeSince =  hours + ' hours ago';
  } else if (minutes > 1) {
    timeSince =  minutes + ' minutes ago';
  } else {
    timeSince = 'Just now';
  }

  obj = {
    user: obj.user.name,
    avatars: obj.user.avatars,
    handle: obj.user.handle,
    content: obj.content,
    created_at: timeSince
  }

  return obj
}
