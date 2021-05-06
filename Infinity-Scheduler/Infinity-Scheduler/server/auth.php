<?php
	require_once "session.php";
	session_start();
	header("Cache-Control: no-cache");
	if (isset($_SESSION["UID"]) && $_SESSION["UID"] != -1){
		if (ISPROD){
			header("location: https://infinityscheduler.com/#/navigation");
		} else {
			header("location: https://localhost/#/navigation");
		}
		
	} else {
		
		session_regenerate_id(true);
		$_SESSION["UID"] = -1;
		require_once "config.php";
		if(isset($_GET["args"]) && !empty(trim($_GET["args"]))){
		

			

			$args = urldecode($_GET['args']);
		
			$args = json_decode($args, true);
			


			$salt = "";
		
			$stmt = mysqli_stmt_init($link);
			if (mysqli_stmt_prepare($stmt, "SELECT Salt FROM User WHERE Username=?")) {
				mysqli_stmt_bind_param($stmt, "s", $args["uname"]);
				mysqli_stmt_execute($stmt);
				$result = mysqli_stmt_get_result($stmt);
				if(mysqli_num_rows($result) > 0){
					$res = mysqli_fetch_all($result, MYSQLI_ASSOC)[0];
					$salt = $res["Salt"];
				}
			}
			if (mysqli_stmt_prepare($stmt, "SELECT UID, NextTID FROM User WHERE Username=? AND Password=?")) {
				

				$passhash = hash("sha256", $args["pword"] . $salt);
		
				
				/* bind parameters for markers */
				mysqli_stmt_bind_param($stmt, "ss", $args["uname"], $passhash);

				/* execute query */
				mysqli_stmt_execute($stmt);
				$result = mysqli_stmt_get_result($stmt);

				if(mysqli_num_rows($result) > 0){
					
					$res = mysqli_fetch_all($result, MYSQLI_ASSOC)[0];
					/*set uid*/
					$_SESSION["UID"] = $res["UID"];
					echo $_SESSION["UID"];
					/*return NextTID*/
					echo json_encode(array("nextTID" => $res["NextTID"]));
					if (ISPROD){
						header("location: https://infinityscheduler.com/#/navigation");
					} else {
						header("location: https://localhost/#/navigation");
					}
					
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

	}
	
?>
