<?php
require_once('twitteroauth.php');

class TwitterFeed {
	public $user;
	public $tweetsNumber;
	private $consumerKey = '1vkAwhtlAlH96T03C03oA';
	private $consumerSecret = 'mB7idg8mOF2Wfu5wYb2moVZms9rHxJT15Wp6qTKEIE';
	private $accessToken = '473819276-f2BDjgXNX5F5FDOXpB1f4HsDNMLXIcbnipYPe49R';
	private $accessTokenSecret = 'LZ6P03QaW7KCV1kwRsETxt48yANlfrN0KwYMxPbIZKe3S';
	private $connection;
	
	public function __construct($username, $tweets) {
		$this->user = $username;
		$this->tweetsNumber = $tweets;
		$this->connection = new TwitterOAuth($this->consumerKey, $this->consumerSecret, $this->accessToken, $this->accessTokenSecret);
	}
	
	public function getTweets() {
		$tweets = $this->connection->get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=' . $this->user . '&count=' . $this->tweetsNumber);
		echo json_encode($tweets);
	}
	
}