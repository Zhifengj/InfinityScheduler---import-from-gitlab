<?php
	
	require_once "config.php";
	if(isset($_GET["args"]) && !empty(trim($_GET["args"]))){
		

		$args = urldecode($_GET['args']);
		
		$args = json_decode($args, true);
		

			
		if ($nextUidResult = mysqli_query($link, "SELECT MAX(UID) AS NextUID FROM User")){
			$nextUID = mysqli_fetch_all($nextUidResult, MYSQLI_ASSOC)[0]["NextUID"] + 1;

			$stmt = mysqli_stmt_init($link);
			if (mysqli_stmt_prepare($stmt, 
			"INSERT INTO User (Username, Password, UID, Name, NextTID)
				VALUES (?, ?, ?, ?, 0)
			")) {

				/* bind parameters for markers */
				mysqli_stmt_bind_param($stmt, "ssis", 
				$args["username"], 
				$args["password"],
				$nextUID,
				$args["name"]
				);

				/* execute query */
				mysqli_stmt_execute($stmt);
					
				if (mysqli_stmt_affected_rows($stmt) == 1){
					echo formatSuccess("registered");
				} else {
					echo formatError("failure: could not register");
				}
			
					
			

			
			  
				/* close statement */
				mysqli_stmt_close($stmt);

			} else {
				echo formatError("failure: bad query");
			}
		} else {
			echo formatError("failure: couldn't get next UID");
		}
		
		
			

	} else {
		echo formatError("failure: no args");
	}

	

?>
