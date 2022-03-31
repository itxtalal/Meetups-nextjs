import { MongoClient } from "mongodb";

//* /api/new-meetup

//? Define functions which will run server side code
//? Files in api folder will run on server side, never on client side
//? we can use sensitive information / credentials in this file, since this runs on server side, not on client side

async function handler(req, res) {
  const pass = process.env.PASSWORD;
  if (req.method === "POST") {
    const data = req.body;

    const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      `mongodb+srv://admin:${pass}@cluster0.ey5q6.mongodb.net/meetups?retryWrites=true&w=majority`
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({
      message: "Meetup Data inserted",
    });
  }
}
export default handler;
