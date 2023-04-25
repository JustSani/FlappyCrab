<?php
    session_start();
    if (!isset($_GET["username"])) {
        die("No username");   
    }
    $con = new mysqli("localhost", "root", "", "FlappyCrab");

    // Controllo l'esito della Connesione
    if ($con->connect_errno)
        die("Errore Connessione DataBase: [" . $con->connect_errno . "] - " . $con->connect_error);

    $mysqltime = date_create()->format('Y-m-d H:i:s');
    // ricerca categoria
    $strSQL = "INSERT INTO scoreboards (username, punteggio, data) VALUES('".$_GET["username"]."', ".$_GET["punteggio"].", '".$mysqltime."')";
    $rs = $con->query($strSQL);
    echo "done";

   
?>