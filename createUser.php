<?php

    setcookie("username", $_GET["username"], time() + (86400 * 30) * 40, "/"); 

        echo("done");


?>