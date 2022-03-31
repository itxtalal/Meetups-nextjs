//* /api/new-meetup

//? Define functions which will run server side code
//? Files in api folder will run on server side, never on client side
//? we can use sensitive information / credentials in this file, since this runs on server side, not on client side

function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const { title, image, address, description } = data;
  }
}
export default handler;
