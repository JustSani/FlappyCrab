<?php
    session_start();

    $con = new mysqli("localhost", "root", "", "FlappyCrab");

    // Controllo l'esito della Connesione
    if ($con->connect_errno)
        die("Errore Connessione DataBase: [" . $con->connect_errno . "] - " . $con->connect_error);

    
    // ricerca categoria
    $strSQL = "SELECT username, MAX(punteggio) as top  from scoreboards  GROUP BY username ORDER BY top DESC";
    $rs = $con->query($strSQL);
    $obj = array();
    while ($record = $rs->fetch_assoc()){
        array_push($obj, $record);
    }
    echo json_encode($obj);
    
?>