<?php
    cors();
    
    $con = new mysqli("localhost", "sanino", "", "my_sanino");

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
    exit();



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