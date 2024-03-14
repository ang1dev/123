import * as amqp from "amqplib/callback_api";

import { receiveMessage, sendMessage } from "./amqfunc";

describe("RabbitMQ Tests", () => {
  let connection: amqp.Connection;
  let channel: amqp.Channel;

  beforeAll((done) => {

    amqp.connect("amqp://localhost:5672", (error0: any, conn: amqp.Connection) => {
      if (error0) {
        throw error0;
      }
      connection = conn;
      connection.createChannel((error1: any, ch: amqp.Channel) => {
        if (error1) {
          throw error1;
        }
        channel = ch;
        done();
      });
    });
  });

  afterAll((done) => {

    connection.close();
    done();
  });

  it("should send and receive message", (done) => {
    const queue = "test_queue";
    const msg = "Hello RabbitMQ!";

    const consoleSpy = jest.spyOn(console, "log");

    sendMessage(channel, queue, msg);


    setTimeout(() => {
  
      receiveMessage(channel, queue);

      setTimeout(() => {
   
        expect(consoleSpy).toHaveBeenCalledWith(`${msg}`);
        done();
      }, 1000); 
    }, 1000); 
  });
});


