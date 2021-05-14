<?php
	require_once "session.php";
	if (startOrResumeSession()){
		require_once "config.php";
		if(isset($_GET["args"]) && !empty(trim($_GET["args"]))){
		

			$args = urldecode($_GET['args']);
		
			$args = json_decode($args, true);
		
		
		
			$stmt = mysqli_stmt_init($link);
			if (mysqli_stmt_prepare($stmt, "DELETE FROM Todo WHERE UID=? AND TID=?")) {

				/* bind parameters for markers */
				mysqli_stmt_bind_param($stmt, "ii", $_SESSION["UID"], $args["TID"]);

				/* execute query */
				mysqli_stmt_execute($stmt);
				if (mysqli_stmt_affected_rows($stmt) == 1){
					echo formatSuccess("deleted");
				} else {
					echo formatError("nothing deleted");
				}
			
			
			
			
			
			

			
			  
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
