<?php
	require_once "config.php";

	$sql = "SELECT * FROM User";
    if($result = mysqli_query($link, $sql)){
        if(mysqli_num_rows($result) > 0){
			echo "SUCESS!!!"

		}
	}

?>
