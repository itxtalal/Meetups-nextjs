import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

const MeetupDetails = (props) => {
  // console.log(props.meetupData);

  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
};
export async function getStaticPaths() {
  const pass = process.env.PASSWORD;

  const client = await MongoClient.connect(
    `mongodb+srv://admin:${pass}@cluster0.ey5q6.mongodb.net/meetups?retryWrites=true&w=majority`
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  // find({how many objects to retrieve},{filter which data to extract from objects})
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    // false - All supported paths are defined by us
    // true - dynamically generate params for any path not written by us
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupID: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data from an API
  const meetupID = context.params.meetupID;
  const pass = process.env.PASSWORD;

  const client = await MongoClient.connect(
    `mongodb+srv://admin:${pass}@cluster0.ey5q6.mongodb.net/meetups?retryWrites=true&w=majority`
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupID),
  });

  client.close();

  console.log(meetupID);

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
