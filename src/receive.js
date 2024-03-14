"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var amqp = require("amqplib/callback_api");
amqp.connect("amqp://localhost:5672", function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = "test_queue";
        channel.assertQueue(queue, {
            durable: false,
        });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, function (msg) {
            console.log(" [x] Received %s", msg === null || msg === void 0 ? void 0 : msg.content.toString());
        }, {
            noAck: true,
        });
    });
});
