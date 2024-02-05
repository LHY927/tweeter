/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const url = "http://localhost:8080/tweets";

const createTweetElement = function (tweet) {
  let $tweet = `
    <article class="tweet">
        <header>
        <div class="tweet-avatar">
            <img alt="Avatar" src="${tweet.user.avatars}">
            <span>${tweet.user.name}</span>
        </div>
        <div>
            <span>${tweet.user.handle}</span>
        </div>
        </header>
        <div class="tweet-text">
        <p>${escape(tweet.content.text)}</p>
        </div>
        <footer>
        <div>
            <span>${$.timeago(tweet.created_at)}</span>
        </div>
        <div class="footer-icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-share"></i>
            <i class="fa-solid fa-heart"></i>
        </div>
        </footer>
    </article>`;
  return $tweet;
};

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (const tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $(".tweets-container").append($tweet);
  }
};

const loadTweets = function (url) {
  $.ajax(url, { method: "GET" }).then(function (data) {
    renderTweets(data);
    //console.log(data);
  });
};

const showErrorMessage = function (msg) {
  $(".error-message").append(`<i class="fa-solid fa-triangle-exclamation"></i>
    <span>${msg}</span>
    <i class="fa-solid fa-triangle-exclamation"></i>`);
  $(document).ready(function () {
    $(".error-message").slideDown("slow", function () {
      console.log("works");
    });
  });
};

$(window).on("load", function () {
  loadTweets(url);
  $("form").on("submit", function (event) {
    event.preventDefault();
    //console.log( $( this ).serialize() );
    //console.log($("#tweet-text").val());
    let tweetText = $("#tweet-text").val();
    if (tweetText === "" || tweetText === undefined || tweetText === null) {
      //alert("Your input is empty!");
      showErrorMessage("Your input is empty!");
    } else if (tweetText.length > 140) {
      showErrorMessage("Your input is more than 140 charactor limit!");
      //alert("Your input is more than 140 charactor limit!");
    } else {
      $.post(url, $(this).serialize());
      if (!$(".error-message").is(":hidden")) {
        $(".error-message").slideUp("slow", function () {
          location.reload();
        });
      } else {
        location.reload();
      }
    }
  });
});
