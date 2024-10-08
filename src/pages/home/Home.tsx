import AboutTheCouple from "./about-the-couple/AboutTheCouple";
import MainSection from "./main-section/MainSection";
import RsvpSection from "./rsvp-section/RsvpSection";


const Home: React.FC = () => {
	return (
	  <>
		<MainSection />
		<RsvpSection />
		<AboutTheCouple />
	  </>
	);
};

export default Home;