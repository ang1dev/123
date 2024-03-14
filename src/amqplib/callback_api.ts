// __mocks__/amqplib/callback_api.ts

export function connect(url: string, callback: (error: any, connection: any) => void) {
    // Simulate successful connection
    const connection = {
      createChannel: (callback: (error: any, channel: any) => void) => {
        // Simulate successful channel creation
        const channel = {
          assertQueue: (queue: string, options: any) => {
            // Simulate successful queue assertion
            console.log(`Queue ${queue} asserted with options:`, options);
          },
          consume: (queue: string, onMessage: (msg: any) => void, options: any) => {
            // Simulate message consumption
            const mockMessage = { content: Buffer.from("Test message") };
            onMessage(mockMessage);
          }
        };
        callback(null, channel);
      }
    };
    callback(null, connection);
  }
  