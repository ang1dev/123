import * as amqp from "amqplib/callback_api";

amqp.connect(
  "amqp://localhost:5672",
  (error0: any, connection: amqp.Connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1: any, channel: amqp.Channel) => {
      if (error1) {
        throw error1;
      }

      const queue = "test_queue";
      const msg = "Hello RabbitMQ!";

      channel.assertQueue(queue, {
        durable: false,
      });

      channel.sendToQueue(queue, Buffer.from(msg));
      console.log(" [x] Sent %s", msg);
    });
  }
);

