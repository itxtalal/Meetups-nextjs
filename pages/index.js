// domain.com
import { useState, useEffect } from "react";
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e5/Cityoflondontowerbridge.jpg",
    address: "London",
    description: "This is a first meetup in London",
  },
  {
    id: "m2",
    title: "Second Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e5/Cityoflondontowerbridge.jpg",
    address: "London",
    description: "This is a second meetup in London",
  },
  {
    id: "m3",
    title: "Third Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e5/Cityoflondontowerbridge.jpg",
    address: "London",
    description: "This is a third meetup in London",
  },
];

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

  return <MeetupList meetups={props.meetups} />;
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
  // fetch Data from an API
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
    //? Revalidate will regenerate the page after every 10 seconds
    //? Gets new data after every given value [10]
    revalidate: 1,
  };
}

export default HomePage;
