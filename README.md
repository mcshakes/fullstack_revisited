# Beating Tsundoku: A Reading List

### Try in Production

https://red-doright-81787.herokuapp.com/

Create test users and start adding books to the reading list.

### To run on development:

`git clone`  

`npm install`  

`npm start`  

And use test users:


### To run tests:

1) `npm run test`

Runs initial API level tests with mocha and nyc. While these were the tests I started with, I abandoned them (for now) since the responses and interactions were happening with the views.

2) `npm run cy:headless`

Runs cypress in a headless CLI, so you only see the "RSpec" style test declarations, and the results.  
_Note on the headless: doesn't seem to be much faster than running in the automated browser_

3) `npm run cy:open`  

Opens up the menu for you to pick and choose which test suite to run, pause and view as it goes through the automated browser.
