

$(()=>{
    let req = sendRequestNoCallback("https://sanino.altervista.org/FlappyCrab/topPlayers.php", "GET", "");
    req.done(function(serverdata){
        console.log(serverdata)
        let i = 1;
        serverdata.forEach(element => {
            if(i <= 5){
                let tr = $("<tr>");
                tr.append($("<th>").attr("scope", "row").text(i))
                if(element.username.length <= 8)
                    tr.append($("<td>").text(element.username))
                else
                    tr.append($("<td>").text(element.username[0] + element.username[1] + element.username[2] + element.username[3] + element.username[4] + element.username[5] + element.username[6] + element.username[7] + ".."))

                tr.append($("<td>").text(element.top))
                i++;
                $("#tBody").append(tr)
            }
            
        });
    })

    $("#gioca").on("click", function(){
        window.location.href='index.html'
    })

    $("#classifica").click(function(){
        window.location.href='scoreboard.html'
    })
})