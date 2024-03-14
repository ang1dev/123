import * as amqp from "amqplib/callback_api";

import { receiveMessage, sendMessage } from "./amqfunc";

describe("RabbitMQ Tests", () => {
  let connection: amqp.Connection;
  let channel: amqp.Channel;
  let channelReady: Promise<amqp.Channel>;

  beforeAll(() => {
    channelReady = new Promise((resolve, reject) => {
       amqp.connect("amqp://localhost:5672", (error0: any, conn: amqp.Connection) => {
         if (error0) {
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

    connection.close();
    done();
  });

  // it("should send and receive message", (done) => {
  //   const queue = "test_queue";
  //   const msg = "Hello RabbitMQ!";

  //   const consoleSpy = jest.spyOn(console, "log");

  //   sendMessage(channel, queue, msg);


  //   setTimeout(() => {
  
  //     receiveMessage(channel, queue);

  //     setTimeout(() => {
   
  //       expect(consoleSpy).toHaveBeenCalledWith(`${msg}`);
  //       done();
  //     }, 1000); 
  //   }, 1000); 
  // });

  it("should send and receive message", async () => {
    const queue = "test_queue";
    const msg = "Hello RabbitMQ!";
   
    const consoleSpy = jest.spyOn(console, "log");
   
    // Wait for the channel to be ready
    const channel = await channelReady;
   
    sendMessage(channel, queue, msg);

         setTimeout(() => {
   
        expect(consoleSpy).toHaveBeenCalledWith(`${msg}`);
   
      }, 1000); 
    }, 1000); 
   
    // Your existing test logic...
   });


