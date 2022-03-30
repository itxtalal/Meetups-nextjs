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

const HomePage = () => {
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    // send a fetch request and load data
    // !! Problem
    // !! Doing this will first create HTML documnet with empty dataset in the first execution useState is empty array
    // !! When the data is loaded in second execution, the data is updated in State, but the HTML document still has no data in it.
    // !! HTML Doc does not contain our data in it. Not SEO friendly.
    setLoadedMeetups(DUMMY_MEETUPS);
  }, []);

  return <MeetupList meetups={loadedMeetups} />;
};

export default HomePage;
