var appid = "cf293613-9009-41f2-80e7-56673f77361d";
var call = null;

// create a client object using the App ID value from Step 2
var client = new respoke.Client({
  appId: appid,
  developmentMode: true
});

// listen for the 'connect' event
client.listen('connect', function() {
    $("#status").html("Connected!");
});

// listen for and answer incoming calls
client.listen('call', function(evt) {
     call = evt.call;
     if (call.initiator !== true) {
         call.answer({constraints: {audio: true, video: false}});
         call.listen('hangup', function() {
            call = null;
         });
     }
});

// now connect when the user clicks the 'Connect' button
$("#doLogin").click(function() {
    var endpoint =  $("#endpoint").val();
    client.connect({
         endpointId: endpoint
    });
});

// Create a call, hangup on click again
$("#makeCall").click(function() {
    if (call) {
      call.hangup();
      call = null;
      $("#makeCall").val("Connect");
    } else {
      var endpoint = client.getEndpoint({"id" : $("#remoteId").val()});
      call = endpoint.startAudioCall();
      $("#makeCall").val("Disconnect");
    }
});
