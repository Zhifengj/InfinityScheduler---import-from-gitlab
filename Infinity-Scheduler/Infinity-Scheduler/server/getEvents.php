<?php
	
	if(isset($_GET["args"]) && !empty(trim($_GET["args"]))){
		require_once "config.php";

		$args = urldecode($_GET['args']);
		
		$args = json_decode($args, true);
		
		
		
		$stmt = mysqli_stmt_init($link);
		if (mysqli_stmt_prepare($stmt, "SELECT * FROM TaskEvent WHERE UID=?")) {

			/* bind parameters for markers */
			mysqli_stmt_bind_param($stmt, "i", $args["UID"]);

			/* execute query */
			mysqli_stmt_execute($stmt);
			$result = mysqli_stmt_get_result($stmt);

			
			echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC));
			

			
			  
			/* close statement */
			mysqli_stmt_close($stmt);

		} else {
			echo formatError("failure: bad query");
		}

	} else {
		echo formatError("failure: no args");
	}

?>
