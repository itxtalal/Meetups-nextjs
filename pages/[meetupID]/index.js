import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = () => {
  return (
    <>
      <MeetupDetail
        image="https://upload.wikimedia.org/wikipedia/commons/e/e5/Cityoflondontowerbridge.jpg"
        title="First Meetup"
        address="London"
        description="This is first meetup description"
      />
    </>
  );
};
export async function getStaticPaths() {
  return {
    // false - All supported paths are defined by us
    // true - dynamically generate params for any path not written by us
    fallback: false,
    paths: [
      {
        params: {
          meetupID: "m1",
        },
      },
      {
        params: {
          meetupID: "m2",
        },
      },
      {
        params: {
          meetupID: "m3",
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  // fetch data from an API

  const meetupID = context.params.meetupID;

  console.log(meetupID);

  return {
    props: {
      meetupData: {
        id: meetupID,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/e/e5/Cityoflondontowerbridge.jpg",
        title: "First Meetup",
        address: "London",
        description: "This is a first meetup in London",
      },
    },
  };
}

export default MeetupDetails;
