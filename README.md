
## Description
The 'Meet the Team' page for SketchUp. 
This is just a single webpage with three sections: A "Scalee Sorter", a "Say Hello" section, and the job postings.

The Scalee Sorter has a single-page app feel, and on a desktop that is basically what it is. Basically, every person's scalee is shown, then they can be filtered by either location, interest, or team.  Clicking on a scalee opens up it's bio, which then also has a button to play the person's "Two-truths-one-lie" game.

The Say Hello section is pretty standard, with just some links. But, the Job Postings secction has some animations when opening up a job description.


## Easter Eggs
**Leaderboard Mode**: Clicking on the 'Winners' team in the Scalee Sorter triggers a change to 'Leaderboard Mode'. This shows a new control panel with different buttons for switching the leaderboard, and the scalees are replaced by five 'playing card'-like boxes indicating the first five positions for the discipline.


## Development
#### Tools
**HTML:** Nothing. All the HTML lives in the `index.html` file
**CSS:** The css is written in SCSS format, and compiled with a Gulp task. All the styles are in the `/src/scss/` directory, with all partials pulled into `main.scss` file.
**JS:** The JS files live at `/src/js/`, as expected, and **Browserify** is used as a CommonJS bundler. All modules, which aren't npm dependencies, are at `/src/js/modules`, and all new JS should be created as a module here. A Gulp task runs and bundles the `main.js` file into the `/build/js/` directory.


#### Structure
All the working files live in the `src` directory.  Gulp is used as a task runner, and compiles and minifies the JS, CSS, and HTML into the `build` directory.

**Images and fonts** however, live in their `/build/img/` and `/build/fonts/` directories, and are not processed by any Gulp tasks. Any new images and fonts should go here.

#### To Work locally
1. Download repository
2. Run `npm i` - All dependencies are handled with NPM
3. Run `gulp` - This runs a watch task and creates a local server on port 8000 with live reloads