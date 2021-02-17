<?php

	require_once "session.php";
	if (startOrResumeSession()){
		echo true;
	}

?>
