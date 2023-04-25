

$(()=>{
    let req = sendRequestNoCallback("https://sanino.altervista.org/FlappyCrab/topPlayers.php", "GET", "");
    req.done(function(serverdata){
        console.log(serverdata)
        let i = 1;
        serverdata.forEach(element => {
            let tr = $("<tr>");
            tr.append($("<th>").attr("scope", "row").text(i))
            tr.append($("<td>").text(element.username))
            tr.append($("<td>").text(element.top))
            i++;
            $("#tBody").append(tr)
        });
    })

    $("#gioca").on("click", function(){
        window.location.href='index.html'
    })
})