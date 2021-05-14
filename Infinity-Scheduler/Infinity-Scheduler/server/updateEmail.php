<?php
  require_once "session.php";

  if (startOrResumeSession())
  {

    require_once "config.php";

    $args = urldecode($_GET['args']);
    $args = json_decode($args, true);

    $stmt = mysqli_stmt_init($link);

    $salt = "";

    if (mysqli_stmt_prepare($stmt, "SELECT Salt FROM User WHERE UID=?"))
    {
      mysqli_stmt_bind_param($stmt, "i", $_SESSION["UID"]);
      mysqli_stmt_execute($stmt);
      $result = mysqli_stmt_get_result($stmt);
      $res = mysqli_fetch_all($result, MYSQLI_ASSOC)[0];
      $salt = $res["Salt"];

      if (mysqli_stmt_prepare($stmt, "SELECT UID FROM User WHERE UID=? AND Password=?"))
      {
				$passhash = hash("sha256", $args["pword"] . $salt);
				mysqli_stmt_bind_param($stmt, "is", $_SESSION["UID"], $passhash);
				mysqli_stmt_execute($stmt);
				$result = mysqli_stmt_get_result($stmt);

				if(mysqli_num_rows($result) > 0){

          if (mysqli_stmt_prepare($stmt, "UPDATE User SET Email=? WHERE UID=?"))
          {
            mysqli_stmt_bind_param($stmt, "si", $args["new_email"], $_SESSION["UID"]);
            mysqli_stmt_execute($stmt);
            if (mysqli_stmt_affected_rows($stmt) == 1){
              echo formatSuccess("Email updated");
            } else {
              echo formatError("Failed");
            }
          }
          else
          {
            echo formatError("failure: bad query");
          }

        } else {
					echo formatError("failure: empty result");
				}

      } else {
				echo formatError("failure: bad query");
			}
    }
    else {
      echo formatError("failure: bad query");
    }

    mysqli_stmt_close($stmt);
  }
 ?>
