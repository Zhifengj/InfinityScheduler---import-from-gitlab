<?php
	TODO
	if(isset($_GET["args"]) && !empty(trim($_GET["args"]))){
		require_once "config.php";

		$args = urldecode($_GET['args']);
		
		$args = json_decode($args, true);
		
		
		
		$stmt = mysqli_stmt_init($link);
		if (mysqli_stmt_prepare($stmt, "SELECT UID FROM User WHERE Username=? AND Password=?")) {

			/* bind parameters for markers */
			mysqli_stmt_bind_param($stmt, "ss", $args["uname"], $args["pword"]);

			/* execute query */
			mysqli_stmt_execute($stmt);
			$result = mysqli_stmt_get_result($stmt);

			if(mysqli_num_rows($result) > 0){
				echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC)[0]);
			} else {
				echo formatError("failure: empty result");
			}

			
			  
			/* close statement */
			mysqli_stmt_close($stmt);

		} else {
			echo formatError("failure: bad query");
		}

	} else {
		echo formatError("failure: no args");
	}

?>
