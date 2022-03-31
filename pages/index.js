// domain.com
// import { useState, useEffect } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  //   const [loadedMeetups, setLoadedMeetups] = useState([]);

  //   useEffect(() => {
  //     // send a fetch request and load data
  //     // !! Problem
  //     // !! Doing this will first create HTML documnet with empty dataset in the first execution useState is empty array
  //     // !! When the data is loaded in second execution, the data is updated in State, but the HTML document still has no data in it.
  //     // !! HTML Doc does not contain our data in it. Not SEO friendly.
  //     setLoadedMeetups(DUMMY_MEETUPS);
  //   }, []);

  return (
    <>
      <Head>
        <title>Meetups | NEXTJS</title>
        <meta
          name="description"
          content="Browse a list of highly active meetups for NEXTJS"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// // ? A special function by NEXTJS, to generate props on server side before deployment
// // ? To hide sensitive data by hiding props generation on client side
// // ? This function runs for every incoming request,
// // ! so no need to revalidate

// // * Better for ones that need data updates on every incoming request
// // * Use if
// // * 1) If you need access to request and response for authentication or other purpose
// // * 2) If data changes multiple times every second
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   // fetch Data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

//? A special function provided by NEXTJS to generate static pages when we need data to load
//? Only to be used in pages/files
//? Name should be getStaticProps
//? It generate props for the page, async behaviour
//! StaticProps will always be outdated data
//* Page is faster by using this, it is cached and reused instead of regeneration
export async function getStaticProps() {
  const pass = process.env.PASSWORD;
  // fetch Data from an API

  const client = await MongoClient.connect(
    `mongodb+srv://admin:${pass}@cluster0.ey5q6.mongodb.net/meetups?retryWrites=true&w=majority`
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        description: meetup.description,
        // Mongo makes an _id object which is not a string, but we use id as string, so converting it to string, therefore using map
        id: meetup._id.toString(),
      })),
    },
    //? Revalidate will regenerate the page after every 10 seconds
    //? Gets new data after every given value [10]
    revalidate: 1,
  };
}

export default HomePage;
