
## Description
The 'Meet the Team' page for SketchUp. 
This is just a single webpage with three sections: A "Scalee Sorter", a "Say Hello" section, and the job postings.

The Scalee Sorter section has a single-page app feel, and on a desktop that is basically what it is. Basically, every person's scalee is shown, then they can be filtered by either location, interest, or team.  Clicking on a scalee opens up it's bio, which then also has a button to play the person's "Two-truths-one-lie" game.

The Say Hello section is pretty standard, with just some links. But, the Job Postings secction has some animations when opening up a job description.


## File Structure
All the working files live in the `src` directory.  Gulp is used as a task runner, and compiles and minifies the JS, CSS, and HTML into the `build` directory.

**Images and fonts** however, live in their `/build/img/` and `/build/fonts/` directories, and are not processed by any Gulp tasks. Any new images and fonts should go here.


## Development Tools
####HTML
Nothing. All the HTML lives in the `index.html` file, then is minified in a Gulp task.
####CSS
The css is written in SCSS format, and compiled with a Gulp task. All the styles are in the `/src/scss/` directory, with all partials pulled together into `main.scss` file.
####JS
The JS files are bundled together with [Browserify](http://browserify.org/), and all queued up in the `js/main.js` file.  The modules that aren't npm dependencies are in `/src/js/modules`, and all new JS should be created as a module here.  The final, bundled and minified file is created in a Gulp task and put within the `/build/js/` directory.

The exception for this is the GreenSock Animation and ScrollMagic libraries, which did not mesh well with Browserify, so they are combined and minified in their own gulp task, and loading on the page as their own file.

On that note, the scrolling animations on the page are controlled by the pairing of the well maintained and documented [ScrollMagic](http://scrollmagic.io/) and [GreenSock Animation](https://greensock.com/) libraries.  Basically, the desired animation effect is created using the Greensock library, as a "tween", then the ScrollMagic library progresses that animation based on the position of the scroll.  Some good demos, with code, are [here](http://scrollmagic.io/examples/basic/simple_tweening.html).


## Easter Eggs
**Leaderboard Mode**: Clicking on the 'Winners' team in the Scalee Sorter triggers a change to 'Leaderboard Mode'. This shows a new control panel with different buttons for switching the leaderboard, and the scalees are replaced with podium positions for a game.  The data for this is generated from the scalee JSON, and logic is found in the `js/modules/scalee-leaderboard.js` file. Likewise, styles are found in `/scss/sections/_s1-leaderboard-mode.scss`.

**Airplane Polygons**: In the Say Hello and Job Postings sections, the red airplane-like polygon can be clicked and will change its color to blue.  Code for this lives soley in `js/modules/easter-eggs.js`.


## To Work locally
1. Download repository
2. Run `npm i` - All dependencies are handled with NPM
3. Run `gulp` - This creates the `/build/` directory, starts a local server on port 8000, and then runs a watch task