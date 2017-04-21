# fluxLecture
A step by step repo for solving the Flux frontend Challenge

Flux lecture notes
Code available at https://github.com/gsmith98/fluxLecture
Check out the commits. One for each step of the way. You can view the diffs.

Step 1: SETUP
Most of this I have saved and copied from past projects
Git repo
npm init
npm install a lotta crap
bare html
Basic server (might not even need with webpack devserver)
Webpack
Done when we can ReactDOM.render “yo”
All the magic will happen in app.js, which won’t even be that long

Step 2: Clickable Div
Just enough React to prove that we can get a component working
Also throw in some tiny functionality. A local state for red/green that toggles on click

Step 3: Migrate to Flux
I want to get this exact same functionality, but through Flux.
I don’t want to configure Flux for the first time in a complicated setting
Changing exactly what I have to be Flux will be a good side-by-side exercise
About the minimal introduction to getting Flux working, which is the first (next) step
See my Chrome history to see how I learned: April 10 at 3 PM
Searched Tutorial, didn’t like first result, tried second, lead me to third
Wanted a bare bones example, explanation of minimal rules to solve current task
^ similar to how redux can be described succinctly (actions, state, reducers)
   Like with the Counter app example
   ...vs in a video series that takes a whole week to watch
The ideal tutorial is probably out there
Found a great one to read: Flux for Stupid People together
“Should you use Flux” -> understand the DOM-tree and the React state problem
When implementing, watch out for tricky localUpdate binding in event callback

Step 4: Render a bunch of independent TimeSlots
Not enough to multiply by 10 (why?)
We can’t make this work with a single boolean. That could only encode 2 states
Let’s switch to an array of booleans, one for each timeslot
Need to add index number info to payload

Step 5: React Modal
Let’s make it so clicking opens a modal, clicking a button in the modal toggles color
I’ve decided that it’s okay for modalOpen to be in local react state (justify?)
Npm documentation demonstrates how to use. You can pretty much copy paste

Step 6: Add fields to Modal and data to store
Let’s start by picking some more appropriate names now that our stuff is changing
Then let’s add data to the payload that gets dispatched
Then let’s add spots for this data into our store
(Note: I recommend using one array of Objects instead of an array for each field)
Then let’s add logic to our register switch statement to handle these fields
Then let’s have our components pull them out and use them

Step 7: Make it look good
Perhaps one of you lovelies would like to make a pull request :)
