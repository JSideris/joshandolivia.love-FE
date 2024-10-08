import React, { useRef } from 'react';
import './AboutTheCouple.css';
import smallImage from '../../../assets/images/small-pic.jpg';
import PageSection from '../../../components/page-section/PageSection';

const AboutTheCouple: React.FC = () => {
  const smallImageRef = useRef<HTMLImageElement | null>(null);

  return (
    <PageSection>
      <div className="section-container-atc">
        <div className="overlay-atc">
          <h1>About Olivia and Josh</h1>
          <img ref={smallImageRef} src={smallImage} alt="Olivia and Josh" />
		  <p>
			In the hallowed halls of York University, where dreams were woven from the threads of ambition, 
			two souls converged in an unexpected alliance. Josh, a Computer Engineering virtuoso with a passion 
			for mechanical combat, led a band of robot fighting enthusiasts. Olivia, an ethereal spirit majoring 
			in English and Professional Writing, was captivated by the sparks of creativity she found there.
			<br /><br />
			A mysterious connection drew Olivia to the arena of metal and code, and she reached out to join the ranks. 
			With a welcoming smile, Josh ushered her into his world, and she quickly found her place within the club. 
			From the fusion of gears and prose, a camaraderie was born, and they were entwined as fast friends.
			<br /><br />
			In the dance of life, their connection evolved, flourishing into a romance that blossomed with shared passions 
			- chess, video games, snowboarding, and, above all, robotics. Their love was a vintage blend, maturing and 
			deepening like a rich wine.
			<br /><br />
			Upon the 29th of January, 2022, on a beautiful starry night in Mexico's warm embrace, amid a playful debate about the constellation 
			Orion, Josh sensed a moment ripe to take a lover's chance to send their relationship to the next level. 
			"It's written in the stars," he mused. And as he spoke, a shooting star flew across the sky and through the belt of Orion. 
			A profound blessing from the heavens. And with the cosmos bearing witness he got down on one knee. 
			No ring in hand (as the proposal was not planned), yet love's intent most clearly burned, A Ferrero Rocher, 
			a token rich in meaning, though in gold unweighed. 
			A question was asked, a universe held its breath, and with joyous cry, Olivia accepted.
			<br /><br />
			Now, they invite you to be a witness to a celebration like no other, a testament to a love born from friendship and nurtured through 
			shared dreams. Join them in toasting to a love "written in the stars," a love that transcends ordinary bounds, 
			a love that is their eternal promise.
			</p>

        </div>
      </div>
    </PageSection>
  );
};

export default AboutTheCouple;
