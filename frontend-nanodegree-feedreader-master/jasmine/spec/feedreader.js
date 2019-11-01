/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        
        /* test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url are defined and not empty', function() {
                for (var i = 0; i<allFeeds.length; i++ ){
                    expect(allFeeds[i].url).toBeDefined();
                    expect(allFeeds[i].url).not.toBe(' ');
                }
        });
        
        /*  test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name are defined and not empty', function() {
                for (var i = 0; i<allFeeds.length; i++ ){
                    expect(allFeeds[i].name).toBeDefined();
                    expect(allFeeds[i].name).not.toBe(' ');
                }
        });
    });
        // a new test suite named "The menu"
     describe('test menu', function() {
        // test that ensures the menu element is hidden by default.
        it('menu element is hidden by default',function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
         /* test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */
        it('menu element is hidden by click',function () {
            // test menu display when click 
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            // test menu hide when click again
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

        // a new test suite named "Initial Entries" 
     describe('initial entires', function() {
        
        /* test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function (done) {
            loadFeed(0, done);
		});
		it('are present', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
		});
    });
        

    //a new test suite named "New Feed Selection"
    describe('New Feed Selection', function() {
        var oldFeed;

        /* test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                // store old feed
                oldFeed = $('.feed').html();
                // fetch newer feed
                loadFeed(1, done);
            });
        });

        it('is different from old', function() {
            expect($('.feed').html()).not.toBe(oldFeed);
        });
    });

}());