# Playing around with Capacitor.js

![Gif of the implementation working](example.gif)

I took [this as reference](https://levelup.gitconnected.com/conways-game-of-life-in-javascript-9498ae1958fe) and did the following small changes on my implementation:

- Used Typescript instead of Javascript
- Changed how arrays are filled and iteretated on. Really just to see what would happen, as the loops in the original example were fine
- Made the size of the grid dynamic, so it'd adjust to different screen sizes

And that's pretty much it. Used this to try capacitor.js export capabilities and compiled for the web, a macOS and windows electron version, android and iOS. Worked great 
except on my S7plus tablet, where it lags a bit for some reason, something probably very simple to fix, but outside of the scope of this experiment
