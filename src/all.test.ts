import * as amqp from "amqplib/callback_api";
import { sendMessage, receiveMessage } from "./amqfunc"

describe("RabbitMQ Tests", () => {
  let connection: amqp.Connection;
  let channel: amqp.Channel;
  let channelReady: Promise<amqp.Channel>;

  beforeAll(() => {
    channelReady = new Promise((resolve, reject) => {
      amqp.connect("amqp://localhost:5672", (error0: any, conn: amqp.Connection) => {
        if (error0) {
          console.error("Error connecting to RabbitMQ:", error0);
          reject(error0);
        }
        connection = conn;
        connection.createChannel((error1: any, ch: amqp.Channel) => {
          if (error1) {
            reject(error1);
          }
          channel = ch;
          resolve(ch);
        });
      });
    });
  });

  afterAll((done) => {
    connection.close(() => {
      done();
    });
  });

  it("should send and receive message", async () => {
    const queue = "test_queue";
    const msg = "Hello RabbitMQ!";
    const consoleSpy = jest.spyOn(console, "log");


    await channelReady;

    sendMessage(channel, queue, msg);

    await new Promise(resolve => setTimeout(resolve, 1000));


    receiveMessage(channel, queue);

    await new Promise(resolve => setTimeout(resolve, 1000));

    expect(consoleSpy).toHaveBeenCalledWith(`${msg}`);
  });
});
