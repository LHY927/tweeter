/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from initial-tweets.json
const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

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
        <p>${tweet.content.text}</p>
        </div>
        <footer>
        <div>
            <span>${timeDiff(tweet.created_at)}</span>
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

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (const tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $(".tweets-container").append($tweet);
  }
};

$(window).on("load", function () {
  renderTweets(data);
  $("form").on("submit", function (event) {
    event.preventDefault();
    //console.log( $( this ).serialize() );
    $.post("http://localhost:8080/tweets", $(this).serialize());
  });
});
