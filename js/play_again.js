function init() {
    $("#yes").click(()=>{
        Pepper.say("Hooray!", ()=>{
            // Go To index page
            window.location.replace("index.html");
        });
    });
    
    $("#no").click(()=>{
        Pepper.say("Ok, see you around!", ()=>{});
    });

    Pepper.say("Do you want to play again?", ()=>{
        $("button").fadeIn();

        Pepper.listen([
            {
                id: "yes",
                phrases: ["yes", "yeah", "yea", "sure", "love to", "ok"]
            },
            {
                id: "no",
                phrases: ["no", "nah", "nope", "nup", "meh"]
            }
        ], (result) => {
            if(result.matchId == "yes") {
                Pepper.say("Excellent!", ()=>{
                    // Go To index page
                    window.location.replace("index.html");
                });
            } else if(result.matchId == "no") {
                Pepper.say("ok then.", ()=>{});
            }
        });
    });
}

$(document).ready(init);