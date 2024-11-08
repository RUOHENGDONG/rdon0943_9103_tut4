# rdon0943_9103_tut4
In the basic version, a moving meteor and moon were added, the noise was improved, and a water ripple effect and bgm were added.
Detail：
1. Meteor effects
Generation and position:
The starting position and trajectory of the meteor are generated randomly. The createStar() function initialises the initial position, colour and speed direction of the meteor. The trajectory direction of the meteor is generated according to a given angle offset, giving the effect of it sliding down the skyline.
Animation and reset:
The meteors are updated and redrawn using the animate()method. As the animation progresses, the position of the meteors will change at a speed of one frame per second. At the same time, the position and transparency of the meteors will be reset whenever they go beyond the screen range or run out of transparency, achieving the effect of looping meteors.
Visual effect:
The meteor trails use a transparency gradient to make the meteors gradually disappear in motion, imitating the ‘trailing’ visual effect of real meteors. Some meteors achieve a slight halo effect, giving the meteors a deep sense of space.
2. Moon effect
Static drawing:
The moon is drawn statically at a fixed position on the canvas using the drawMoon() function. The moon is filled with a gradient from white to pale yellow to simulate the soft effect of natural moonlight.
Details: The shape of the moon may be a simple circle, but the fine-tuning of the brightness gradient makes the moon appear soft and natural in the background of the canvas, blending in with the night sky scene.
Water ripple effect
Click interaction:
When the user clicks on the canvas, the createWave()function generates a water wave object based on the position of the click. The water wave object stores information such as the position, radius, and transparency.
Animation diffusion: The diffusion effect of the water ripples is achieved using the animate() function. Each time the frame is updated, the ripples gradually increase their radius and decrease their transparency, simulating the real effect of water ripples spreading outwards from the point of contact.
Fade-out effect: The gradual decrease in transparency makes the water ripples become lighter and lighter as they spread, and eventually disappear. With this control, the water ripples simulate the visual experience of ripples on the water surface gradually dying out after being touched.
3. Noise effect
Use a function like drawBackgroundNoise() to generate small bright or dark dots. The position, size, and transparency of the dots are generated randomly, creating a slight grainy texture that simulates the feel of oil paint.
