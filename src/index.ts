
import { app } from './app'
import { db } from "./app-data-source"

const start = async () => {
  try {
    if (!process.env.NODE_ENV) {
      throw new Error('NODE_ENV must be defined')
    }


    console.log("----------------------")
    console.log(process.env.NODE_ENV)
    console.log("----------------------")
    db.initialize()
    console.log('Product database Connected')
  } catch (error) {
    console.log(error)
  }
}

app.listen(3000, async () => {
  console.log("Product server listening on port 3000!!!!!!!!");
});
start()