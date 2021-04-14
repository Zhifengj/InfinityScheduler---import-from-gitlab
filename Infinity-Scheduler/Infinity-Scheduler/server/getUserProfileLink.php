<?php
  require_once "session.php";
  if (startOrResumeSession()) {
    require_once "config.php";

    $stmt = mysqli_stmt_init($link);
    if (mysqli_stmt_prepare($stmt, "SELECT imagelink FROM Profileimage WHERE UID=?")) {

      mysqli_stmt_bind_param($stmt, "i", $_SESSION["UID"]);

			mysqli_stmt_execute($stmt);
			$result = mysqli_stmt_get_result($stmt);

			echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC)[0]);

			mysqli_stmt_close($stmt);

    } else {
			echo formatError("failure: bad query");
		}

  }

 ?>
