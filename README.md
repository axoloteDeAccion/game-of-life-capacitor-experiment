# Playing around with Capacitor.js

![Gif of the implementation working](example.gif)

I took [this implementation](https://levelup.gitconnected.com/conways-game-of-life-in-javascript-9498ae1958fe) as a base and did the following small changes to my implementation:

- Used Typescript instead of Javascript
- Changed how arrays are filled and iteretated on. Really just to see what would happen, as the loops in the original implmentation were fine
- Made the size of the grid dynamic, so it'd adjust to different screen sizes

And that's pretty much it. Used this to tried capacitor.js export capabilities and tried it on the web, a macOS and windows electron version, android and iOS. Worked great 
except on my S7plus tablet, where it lags a bit.