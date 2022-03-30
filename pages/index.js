// domain.com
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
  return <MeetupList meetups={DUMMY_MEETUPS} />;
};

export default HomePage;
