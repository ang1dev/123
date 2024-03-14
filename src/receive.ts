import * as amqp from "amqplib/callback_api";
import {Message} from "amqplib/properties";

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
    
          channel.assertQueue(queue, {
            durable: false,
          });
    
          console.log(
            " [*] Waiting for messages in %s. To exit press CTRL+C",
            queue
          );
    
          channel.consume(
            queue,
            (msg: Message | null) => {
              console.log(" [x] Received %s", msg?.content.toString());
            },
            {
              noAck: true,
            }
          );
        });
      }
    );
