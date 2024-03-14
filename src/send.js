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
        var msg = "Hello RabbitMQ!";
        channel.assertQueue(queue, {
            durable: false,
        });
        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
    });
});
