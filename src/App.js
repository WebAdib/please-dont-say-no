import React, { useState, useRef } from 'react';
import { Box, Button, Center, Text, Image, Flex } from '@chakra-ui/react';
import backgroundImage from './background1.jpg'; // Import your background image
import yesImage from './yes2.png'; // Import the "Yes" image
import please1 from './please1.gif'; // Import random images
import please2 from './please2.gif';
import please3 from './please3.gif';
import please4 from './please4.gif';
import please5 from './please5.gif';
import please6 from './please6.gif';
import please7 from './please7.gif';
import please8 from './please8.gif';
import please9 from './please9.gif';
import please10 from './please10.gif';

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [noPosition, setNoPosition] = useState({ top: '50%', left: '50%' });
  const [noButtonHovered, setNoButtonHovered] = useState(false);
  const [randomImage, setRandomImage] = useState(please1);
  const [yesClicked, setYesClicked] = useState(false); // State to track if "Yes" was clicked

  const images = [please1, please2, please3, please4, please5, please6, please7, please8, please9, please10];
  const yesButtonRef = useRef(null); // Ref to store the Yes button position

  const moveNoButton = () => {
    const yesButtonRect = yesButtonRef.current.getBoundingClientRect(); // Get the Yes button's current position

    let randomTop, randomLeft;
    let safeDistance = false;

    // Keep generating random positions until the "No" button is far enough from the "Yes" button
    while (!safeDistance) {
      randomTop = Math.floor(Math.random() * 80) + 10 + '%';
      randomLeft = Math.floor(Math.random() * 80) + 10 + '%';

      // Convert percentages to pixels for comparison
      const randomTopPixels = (parseInt(randomTop) / 100) * window.innerHeight;
      const randomLeftPixels = (parseInt(randomLeft) / 100) * window.innerWidth;

      // Calculate the distance between the "Yes" button and the new "No" button position
      const distance = Math.sqrt(
        Math.pow(randomLeftPixels - yesButtonRect.left, 2) +
        Math.pow(randomTopPixels - yesButtonRect.top, 2)
      );

      // If the distance is greater than a threshold (e.g., 150px), accept the position
      if (distance > 150) {
        safeDistance = true;
      }
    }

    const randomImageIndex = Math.floor(Math.random() * images.length);
    
    setNoPosition({ top: randomTop, left: randomLeft });
    setNoButtonHovered(true);
    setRandomImage(images[randomImageIndex]);
  };

  // Handle the "Yes" button click
  const handleYesClick = () => {
    setYesClicked(true); // Change to show the "Yes" state
  };

  return (
    <Center
      h="100vh"
      backgroundImage={`url(${backgroundImage})`} 
      backgroundSize="cover"
      backgroundPosition="center"
    >
      {!gameStarted ? (
        <Box
          bg="white"
          p={8}
          m={8}
          borderRadius="md"
          boxShadow="lg"
          textAlign="center"
          opacity={0.9} 
        >
          <Text fontSize="2xl" mb={4} fontWeight="bold">
            Namexyz, do you wanna play a game with me? 🤗
          </Text>
          <Button
            bg="#af8f87"
            color="white"
            _hover={{ bg: "#c9a89f" }} 
            size="lg"
            onClick={() => setGameStarted(true)}
          >
            Yes, Let's play!
          </Button>
        </Box>
      ) : (
        <Box
          bg="white"
          p={8}
          m={8}
          borderRadius="md"
          boxShadow="lg"
          textAlign="center"
          opacity={0.9}
          position="relative"
        >
          {/* Show the "Yes" image and text if the "Yes" button is clicked */}
          {yesClicked ? (
            <>
              <Image
                src={yesImage} // Show the "Yes" image
                alt="Yes Image"
                boxSize="300px"
                margin="auto"
                mb={4}
              />
              <Text fontSize="2xl" fontWeight="bold">
                Jaba nah jokhon taile yes kno click korla ??😔😔
              </Text>
            </>
          ) : (
            <>
              {/* Show random image and original text when game is active */}
              <Image
                src={randomImage} 
                alt="Random Image"
                boxSize="300px" 
                margin="auto"
                mb={4}
              />
              <Text fontSize="2xl" mb={4} fontWeight="bold">
                Kal k Cha khaite jaba ? ☕
              </Text>

              {/* Yes and No Buttons */}
              <Flex justifyContent="center" gap={4}>
                <Button
                  onClick={handleYesClick}
                  colorScheme="green"
                  size="lg"
                  ref={yesButtonRef} // Attach the ref to the Yes button
                >
                  Yes
                </Button>
                {/* Show "No" button only if "Yes" is not clicked */}
                <Button
                  onMouseEnter={moveNoButton}
                  onTouchStart={moveNoButton} 
                  position={noButtonHovered ? "absolute" : "relative"} 
                  top={noPosition.top}
                  left={noPosition.Center}
                  colorScheme="red"
                  size="lg"
                >
                  No
                </Button>
              </Flex>
            </>
          )}
        </Box>
      )}
    </Center>
  );
};

export default App;
