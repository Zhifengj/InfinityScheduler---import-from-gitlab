<?php

define('DB_SERVER', "ns2.giowm1215.siteground.biz")
define('DB_USERNAME', "urkmnjh23juah")
define('DB_PASSWORD', "isr00td@t@")
define('DB_NAME', "dbzsjyjqfinn66")

$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME)

if($link === false){
	die("ERROR: COULD NOT CONNECT: " . mysqli_connect_error())
}
?>