# Beating Tsundoku: A Reading List

So many books, so little time.

Don't bother trying to remember all the books to read out there. Use this instead.

When you're done, just remove the book from your reading list.

Use an anonymous Visitor and add books manually via a form. If that's too hard, search for the title or author name and add to your library.  

Or create a test user and save your to-read books for yourself.

### Try in Production

https://red-doright-81787.herokuapp.com/

Create test users and start adding books to the reading list.

Prod Test User:

email: test_user@example.com
password: password1

### To run on development:

`git clone`  

`npm install`  

(in separate terminal panels)

`mongod`

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
