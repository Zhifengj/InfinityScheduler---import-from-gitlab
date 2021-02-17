<?php

define('ISPROD', false);

function formatRedir($dest){
	return json_encode(array("redirect" => $dest));
}


function checkSesh(){
	if (isset($_SESSION["UID"]) && $_SESSION["UID"] != -1){
		return true;
	} else {
		if (ISPROD){
			echo formatRedir("http://infinityscheduler.com/?#/");
		} else{
			
			echo formatRedir("http://localhost/?#/");
		}
		
		return false;
	}
}

//call before all php scripts. Make sure this is true to assure security
function startOrResumeSession(){
	header("Cache-Control: no-cache");
	$domain = NULL;
	if (ISPROD) {
		$domain = "infinityscheduler.com";
	}  
	
	session_set_cookie_params(
		0, //lifetime
		'/', //path
		$domain,//domain
		true, // is secure
		false //httponly
	);
	session_start();
	return checkSesh();

}
?>