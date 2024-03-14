import * as amqp from "amqplib/callback_api";
import { Message } from "amqplib/properties";

export function receiveMessage(channel: amqp.Channel, queue: string): void {
  channel.consume(
    queue,
    (msg: Message | null) => {
      console.log( msg?.content.toString());
    },
    {
      noAck: true,
    }
  );
}

export function sendMessage(channel: amqp.Channel, queue: string, msg: string): void {
  channel.assertQueue(queue, {
    durable: false,
  });

  channel.sendToQueue(queue, Buffer.from(msg));
  console.log(msg);
}
