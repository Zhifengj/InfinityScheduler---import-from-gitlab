<?php
  require_once "session.php";

  if (startOrResumeSession())
  {

    require_once "config.php";

    $args = urldecode($_GET['args']);
    $args = json_decode($args, true);

    $stmt = mysqli_stmt_init($link);

    if (mysqli_stmt_prepare($stmt, "UPDATE User SET Password=?, Salt=? WHERE UID=?"))
    {
      $salt = bin2hex(random_bytes('20'));
      $passhash = hash("sha256", $args["new_pass"] . $salt);
      mysqli_stmt_bind_param($stmt, "ssi", $passhash, $salt, $_SESSION["UID"]);
      mysqli_stmt_execute($stmt);
      if (mysqli_stmt_affected_rows($stmt) == 1){
        echo formatSuccess("Password updated");
      } else {
        echo formatError("Failed");
      }
    }
    else
    {
      echo formatError("failure: bad query");
    }


    mysqli_stmt_close($stmt);
  }
 ?>
