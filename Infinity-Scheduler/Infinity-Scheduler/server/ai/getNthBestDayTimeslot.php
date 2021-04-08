<?php
	require_once "session.php";
	if (startOrResumeSession()){
		require_once "config.php";
		if(isset($_GET["args"]) && !empty(trim($_GET["args"]))){
		

			$args = urldecode($_GET['args']);
		
			$args = json_decode($args, true);
		
			$stmt = mysqli_stmt_init($link);
			if (mysqli_stmt_prepare($stmt, "SELECT Day FROM DayTimeslot ORDER BY Occurrances DESC LIMIT ?,1 WHERE UID = ? AND CID = ?")) {

				/* bind parameters for markers */
				mysqli_stmt_bind_param($stmt, "iii", $args["N"], $_SESSION["UID"], $args["CID"]);

				/* execute query */
				mysqli_stmt_execute($stmt);
				$result = mysqli_stmt_get_result($stmt);

			
				echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC)[0]);
			

			
			  
				/* close statement */
				mysqli_stmt_close($stmt);

			} else {
				echo formatError("failure: bad query");
			}
		} else {
			echo formatError("failure: no args");
		}
	}
	

	

?>
