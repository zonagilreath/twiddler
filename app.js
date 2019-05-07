$(document).ready(function(){
  window.visitor = 'HR_Visitor';
  streams.users[visitor] = [];
  $('.load').on('click', function(){
    loadStream();
  });
  $('.homeButton').on('click', function() {
    loadStream();
  })
  $('.post-tweet').on('click', function(){
    let message = $('.textbox').val().replace(/\n/g, '<br/>');
    writeTweet(message);
    $('.textbox').val('');
    loadStream();
  })

  function loadStream(username){
    $("#tweetStream").html('');
    if(username){
      var tweetArray = streams.users[username]; 
      $('.load').off().on('click', function(){
        loadStream(username);
      });
      $('.load').text(`Load ${username}'s tweets`);
    }else {
      var tweetArray = streams.home;
      $('.load').off().on('click', function(){
        loadStream();
      });
      $('.load').text(`Load new tweets`);
    }
    let index = tweetArray.length - 1;
    while(index >= 0){
      let tweet = tweetArray[index]; 
      let $tweetCard = $('<div class="tweet-card"></div>');
      $tweetCard.append($(`<img class="avatar" src="img/${tweet.user}.png"></img>`));
      let $tweet = $('<div class="tweet"></div>');
      let $handle = $(`<h3 class="handle">@${tweet.user}</h3>`);
      $handle.on('click', function(event){
        let tweetUser = $(this).text().slice(1); 
        loadStream(tweetUser);
      });
      let $tweetBody = $(`<p class="tweetBody">${tweet.message}</p>`);
      let $tweetDate = $(`<p class="tweetDate">${moment(tweet.created_at).fromNow()}</p>`);
      $tweet.append($handle, $tweetBody, $tweetDate);
      $tweet.appendTo($tweetCard);
      $tweetCard.appendTo("#tweetStream");
      index -= 1;
    }
  }
  $('.user-handle').on('click', function(event){
    loadStream(window.visitor);
  })
  loadStream();
});