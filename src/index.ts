
import { app } from './app'
import { db } from "./config/db"
import amqp from 'amqplib'

let channel;
const start = async () => {
  try {
    if (!process.env.NODE_ENV) {
      throw new Error('NODE_ENV must be defined')
    }
    if (!process.env.SERVER_PORT ) {
      throw new Error('SERVER_PORT must be defined')
    }
    if (!process.env.PG_PORT ) {
      throw new Error('PG_PORT must be defined')
    }


    console.log("----------------------")
    console.log(process.env.NODE_ENV)
    console.log(process.env.SERVER_PORT)
    console.log("----------------------")
    try {
      db.initialize()
      console.log('Product database Connected')
    } catch (error) {
      console.log('Product database error:',error)
    }
    try {
      const amqpServer = `amqp://${process.env.RABBITMQ_URL}:${process.env.RABBITMQ_PORT}` || 'amqp://localhost:5673';
      const connection = await amqp.connect(amqpServer);
      channel = await connection.createChannel();
      await channel.assertQueue('PRODUCT');
    } catch (error) {
      console.log("error in rabbitmq connection: ", error)
    }

  } catch (error) {
    
  }
}


start()
app.listen(process.env.SERVER_PORT, async () => {
  console.log(`Product server listening on port ${process.env.SERVER_PORT}!!!!!!`);
});