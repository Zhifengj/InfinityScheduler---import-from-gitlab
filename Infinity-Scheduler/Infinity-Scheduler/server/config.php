<?php

define('DB_SERVER', "localhost");
define('DB_USERNAME', "root");
define('DB_PASSWORD', "");
define('DB_NAME', "dbzsjyjqfinn66");

$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);


if($link === false){
	die("ERROR: COULD NOT CONNECT: " . mysqli_connect_error());
}

function formatError($errorMessage) {
	return json_encode(array("error" => $errorMessage));
}

function formatSuccess($msg){
	return json_encode(array("success" => $msg));
}




?>
