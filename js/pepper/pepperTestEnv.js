// PepperTestEnv
// Author: Alistair English
// Description: An environment to load into JavaScript before pepper.js that emulates the interface the PepperJS app provides

var PepperJSInterface = (function(){


    var goToTranslation = function(jsonString, callback) {

        inputObj = JSON.parse(jsonString);

        console.log("Pepper: going to: (" + inputObj.x + ", " + inputObj.y + ")");

        eval(callback + "('" + JSON.stringify({isSuccess: true, isCancelled: false, error: 'test_error'}) + "')");
    }


    var listen = function(jsonString, callback) {

        inputObj = JSON.parse(jsonString);
        
        // === Example inputObj ===
        // {
        //      phraseSets: [
        //          {
        //              id: string,
        //              phrases: [string, string, ...]
        //          },
        //      
        //          {
        //              id: string,
        //              phrases: [string, string, ...]
        //          },
        //      
        //          ...
        //      ]
        // }

        console.log("Pepper: listening");

        inputObj.phraseSets.forEach(element => {
            console.log(element.id + ": " + element.phrases)
        });

        var foundMatch = false;
        var matchId;
        while(!foundMatch) {
            listenInput = prompt("Listen Input");
            inputObj.phraseSets.forEach(element => {
                if (element.phrases.includes(listenInput)) {
                    matchId = element.id;
                    foundMatch = true;
                }
            });
        }

        eval(callback + "('" + JSON.stringify({matchId: matchId, isSuccess: true, isCancelled: false, error: 'test_error'}) + "')");
    }

    var say = function(jsonString, callback) {

        inputObj = JSON.parse(jsonString);

        // === Example inputObj ===
        // {toSay: string}

        console.log("Pepper: saying '" + inputObj.toSay + "'");
        
        setTimeout(() => {eval(callback + "('" + JSON.stringify({isSuccess: true, isCancelled: false, error: 'test_error'}) + "')")}, 2000);
    }

    return {
        goToTranslation: goToTranslation,
        listen: listen,
        say: say
    }

})();