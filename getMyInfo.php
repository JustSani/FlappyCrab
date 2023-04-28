<?php
	cors();
    session_start();
    if (!isset($_GET["username"])) {
        die("No username");   
    }
    
    $con = new mysqli("localhost", "sanino", "", "my_sanino");

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

function cors() {
    
        // Allow from any origin
        if (isset($_SERVER['HTTP_ORIGIN'])) {
            // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
            // you want to allow, and if so:
            header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Max-Age: 86400');    // cache for 1 day
        }
        
        // Access-Control headers are received during OPTIONS requests
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
                // may also be using PUT, PATCH, HEAD etc
                header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
            
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
                header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        
            exit(0);
        }
        
    }

   
?>