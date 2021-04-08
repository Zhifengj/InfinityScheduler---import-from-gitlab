<?php
	require_once "session.php";
	if (startOrResumeSession()){
		require_once "config.php";
		if(isset($_GET["args"]) && !empty(trim($_GET["args"]))){
		

			$args = urldecode($_GET['args']);
		
			$args = json_decode($args, true);
		
		
		
			$stmt = mysqli_stmt_init($link);
			/*Insert if DNE */
			if (mysqli_stmt_prepare($stmt, "INSERT INTO HourTimeslot (UID, CID, Time) VALUES SELECT ?, ?, ? EXECPT SELECT ?, ?, ? FROM HoursTimeslot")) {

				/* bind parameters for markers */
				mysqli_stmt_bind_param($stmt, "siisii",  $_SESSION["UID"], $args["CID"], $args["Time"], $_SESSION["UID"], $args["CID"], $args["Time"]);

				/* execute query */
				mysqli_stmt_execute($stmt);
				if (mysqli_stmt_affected_rows($stmt) == 1){
					echo formatSuccess("hours inserted");
				} else {
					echo formatSuccess("nothing inserted");
				}

				/* close statement */
				mysqli_stmt_close($stmt);

			} else {
				echo formatError("failure: bad query");
			}

			$stmt = mysqli_stmt_init($link);
			if (mysqli_stmt_prepare($stmt, "UPDATE HourTimeslot SET Time = ? WHERE UID = ? AND CID = ?")) {

				/* bind parameters for markers */
				mysqli_stmt_bind_param($stmt, "sii", $args["Time"], $_SESSION["UID"], $args["CID"]);

				/* execute query */
				mysqli_stmt_execute($stmt);
				if (mysqli_stmt_affected_rows($stmt) == 1){
					echo formatSuccess("hours updated");
				} else {
					echo formatError("nothing updated");
				}

				/* close statement */
				mysqli_stmt_close($stmt);

			} else {
				echo formatError("failure: bad query");
			}

			/*------------------------------------------DAYS---------------------------------*/
			$stmt = mysqli_stmt_init($link);
			/*Insert if DNE */
			if (mysqli_stmt_prepare($stmt, "INSERT INTO DayTimeslot (UID, CID, Day) VALUES SELECT ?, ?, ? EXECPT SELECT ?, ?, ? FROM DayTimeslot")) {

				/* bind parameters for markers */
				mysqli_stmt_bind_param($stmt, "siisii",  $_SESSION["UID"], $args["CID"], $args["Day"], $_SESSION["UID"], $args["CID"], $args["Day"]);

				/* execute query */
				mysqli_stmt_execute($stmt);
				if (mysqli_stmt_affected_rows($stmt) == 1){
					echo formatSuccess("days inserted");
				} else {
					echo formatSuccess("nothing inserted");
				}

				/* close statement */
				mysqli_stmt_close($stmt);

			} else {
				echo formatError("failure: bad query");
			}

			$stmt = mysqli_stmt_init($link);
			if (mysqli_stmt_prepare($stmt, "UPDATE DayTimeslot SET Day = ? WHERE UID = ? AND CID = ?")) {

				/* bind parameters for markers */
				mysqli_stmt_bind_param($stmt, "sii", $args["Day"], $_SESSION["UID"], $args["CID"]);

				/* execute query */
				mysqli_stmt_execute($stmt);
				if (mysqli_stmt_affected_rows($stmt) == 1){
					echo formatSuccess("days updated");
				} else {
					echo formatError("nothing updated");
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
