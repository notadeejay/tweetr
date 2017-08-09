function convertDate(obj) {
  let timeSince = "";
  let seconds = Math.floor((new Date() - obj.created_at) / 1000);

  let year = Math.floor(seconds / 31536000);
  let months = Math.floor(seconds / 2592000);
  let days = Math.floor(seconds / 86400);
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor(seconds / 60);

//YEARS
  if (year > 1) {
    timeSince = year + 'years ago'
//MONTHS
  } else if (months > 1) {
    timeSince = months + ' months ago';
//DAYS
  } else if (days > 1) {
    timeSince =  days + ' days ago';
//HOURS
  } else if (hours > 1) {
    timeSince =  hours + ' hours ago';
//MINUTES
  } else if (minutes > 1) {
    timeSince =  minutes + ' minutes ago';
//SECONDS
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
