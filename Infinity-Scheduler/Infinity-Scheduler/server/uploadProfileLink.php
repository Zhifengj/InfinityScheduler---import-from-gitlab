<?php
  require_once "session.php";

  if (startOrResumeSession())
  {

    require_once "config.php";

    $args = urldecode($_GET['args']);
    $args = json_decode($args, true);

    $stmt = mysqli_stmt_init($link);

    if (mysqli_stmt_prepare($stmt, "SELECT * FROM Profileimage WHERE UID=?"))
    {
      mysqli_stmt_bind_param($stmt, "i", $_SESSION["UID"]);
      mysqli_stmt_execute($stmt);
      $result = mysqli_stmt_get_result($stmt);
      if(mysqli_num_rows($result) > 0)
      {
        if (mysqli_stmt_prepare($stmt, "UPDATE Profileimage SET imagelink=? WHERE UID=?"))
        {
          mysqli_stmt_bind_param($stmt, "si",$args["image_link"], $_SESSION["UID"]);
          mysqli_stmt_execute($stmt);
          if (mysqli_stmt_affected_rows($stmt) == 1){
            echo formatSuccess("Profile image link uploaded");
          } else {
            echo formatError("Failed");
          }
        }
        else
        {
          echo formatError("failure: bad query 1");
        }
      }
      else
      {
        if (mysqli_stmt_prepare($stmt, "INSERT INTO Profileimage (imagelink, UID) VALUES (?, ?)"))
        {
          mysqli_stmt_bind_param($stmt, "si",$args["image_link"], $_SESSION["UID"]);
          mysqli_stmt_execute($stmt);
          if (mysqli_stmt_affected_rows($stmt) == 1){
            echo formatSuccess("Profile image link uploaded");
          } else {
            echo formatError("Failed");
          }
        }
        else
        {
          echo formatError("failure: bad query 2");
        }
      }
    }
    else
    {
      echo formatError("failure: bad query 0");
    }
    mysqli_stmt_close($stmt);
  }
 ?>
