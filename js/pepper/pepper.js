// Pepper.js
// Author: Alistair English
// Description: A library for exposing Pepper robot functionality to JavaScript


var Pepper = (function () {

    // Check if the android interface has been created
    if (!window.PepperJSInterface) {
        throw "PepperJS interface could not be found. Please ensure you are running inside the PepperJS app."
    }

    // Var to store the users requested callback
    var usrSayCallback;

    // Generic callback that parses the jsonString response from Pepper and passes it into the usr function in native JSON
    var _callback = function(jsonString) {
        console.log(jsonString)
        var callbackData = JSON.parse(jsonString);
        usrSayCallback(callbackData);
    }


    var say = function(toSay, callback) {
        usrSayCallback = callback;

        jsonMsg = JSON.stringify({toSay:toSay});

        PepperJSInterface.say(jsonMsg, "Pepper._callback");
    }


    var listen = function (phraseSets, callback) {
        // == Example phraseSets input ===
        // phraseSets = [
        //     {
        //         id: "one",
        //         phrases: ['1', 'one', 'uno', 'whan']
        //     },
        //     {
        //         id: "two",
        //         phrases: ['2', 'two', 'dos', 'toooow']
        //     }
        // ]
        
        usrSayCallback = callback;

        jsonMsg = JSON.stringify({phraseSets:phraseSets});

        PepperJSInterface.listen(jsonMsg, "Pepper._callback");
    }

    var goToTranslation = function (x, y, callback) {
        usrSayCallback = callback;

        jsonMsg = JSON.stringify({x:x, y:y});

        PepperJSInterface.goToTranslation(jsonMsg, "Pepper._callback");
    }

    var cancelCurrentSays = function() {
        PepperJSInterface.cancelCurrentSays()
    }

    var cancelCurrentListens = function() {
        PepperJSInterface.cancelCurrentListens()
    }

    var cancelCurrentGoTos = function() {
        PepperJSInterface.cancelCurrentGoTos()
    }

    return {
        say: say,
        listen: listen,
        goToTranslation: goToTranslation,

        cancelCurrentSays: cancelCurrentSays,
        cancelCurrentListens: cancelCurrentListens,
        cancelCurrentGoTos: cancelCurrentGoTos,

        _callback: _callback
    }


})();