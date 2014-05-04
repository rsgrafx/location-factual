<?php
require_once('twitterfeed/TwitterFeed.php'); 
header('Content-Type: application/json');
$twitterFeed = new TwitterFeed('nikospera', 2);
$twitterFeed->getTweets();
?>