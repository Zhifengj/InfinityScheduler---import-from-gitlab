<?php
	require_once "session.php";
	if (startOrResumeSession()){
		require_once "config.php";
		if(isset($_GET["args"]) && !empty(trim($_GET["args"]))){
		

			$args = urldecode($_GET['args']);
		
			$args = json_decode($args, true);
		
		
		
			$stmt = mysqli_stmt_init($link);
			if (mysqli_stmt_prepare($stmt, 
			"INSERT INTO Todo (Title,TID,UID)
				VALUES (?, ?, ?)
			")) {

				/* bind parameters for markers */
				mysqli_stmt_bind_param($stmt, "sii", 
				$args["title"], 
				$args["id"],
				$_SESSION["UID"]
				);

				/* execute query */
				mysqli_stmt_execute($stmt);
				$result = mysqli_stmt_get_result($stmt);

			
				echo json_encode(mysqli_stmt_error_list($stmt));
			

			
			  
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
