<?php
    session_start();
    if (!isset($_GET["username"])) {
        die("No username");   
    }
    
    $con = new mysqli("localhost", "root", "", "FlappyCrab");

    // Controllo l'esito della Connesione
    if ($con->connect_errno)
        die("Errore Connessione DataBase: [" . $con->connect_errno . "] - " . $con->connect_error);

    
    // ricerca categoria
    $strSQL = "SELECT MAX(punteggio) as max from scoreboards where username='".$_GET["username"]."'";
    $rs = $con->query($strSQL);
    if ($record = $rs->fetch_assoc()){
        $strSQL = "SELECT punteggio, MAX(data) as min FROM scoreboards where username='".$_GET["username"]."' GROUP BY punteggio";
        $rs2 = $con->query($strSQL);
        if ($record2 = $rs2->fetch_assoc()){
            $obj["top"] = $record["max"];
            $obj["last"] = $record2["punteggio"];
            
            echo json_encode($obj); 
        }else
        echo "No data";

    }else
    echo "No data";

   
?>