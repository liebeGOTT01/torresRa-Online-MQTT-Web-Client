var client = mqtt.connect('wss://test.mosquitto.org:8081/mqtt')
var status = true

$("#con-Broker").on('click', function() {
    $('#status').val("Connecting....")
    client = mqtt.connect($('#address').val())
    client.on("connect", function() {
        $('#status').val("Connected!")

    })
});


topic = $("#pub-topic").val()
message = $("#pub-payload").val()
var date = new Date()
time = (date.toDateString() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds())

client.on('message', function(topic, message, time) {
    if (topic == $('#sub-topic').val()) {
        $("#broker-table").append(
            "<tr><td>" +
            topic +
            "</td><td>" +
            message +
            "</td><td>" +
            time +
            "</td><td>"
        );
    }
})

$("#pub-button").on('click', function() {
    var pubTopic = $("#pub-topic").val()
    var payload = $("#pub-payload").val()
    var date = new Date()
    var pubTime = (date.toDateString() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds())
    client.publish(pubTopic, payload, pubTime)
    if ($('#status').val() == "Connected!") {
        $("#pub-table").append(
            "<tr><td>" +
            pubTopic +
            "</td><td>" +
            payload +
            "</td><td>" +
            pubTime +
            "</td><td>"
        );
    }
});

$("#sub-button").on('click', function() {
    var subTopic = $("#sub-topic").val()
    var date = new Date()
    var subTime = (date.toDateString() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds())
    client.subscribe(subTopic, subTime)
    if ($('#status').val() == "Connected!") {
        $("#sub-table").append(
            "<tr><td>" +
            subTopic +
            "</td><td>" +
            subTime +
            "</td><td>"
        );
    }
});