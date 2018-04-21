/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable is in our application.
     */
    describe('RSS Feeds', function () {
        /* Test to make sure that the allFeeds variable
         * has been defined and that it is not empty.
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test that loops through each feed object in
         * the allFeeds array and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('each feed has a defined URL', function () {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });

        /* Test that loops through each feed object in
         * the allFeeds array and ensures it has a name defined
         * and that the name is not empty.
         */
        it('each feed has a defined name', function () {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });


    /* The Menu test suite  */
    $(function () {
        describe('The menu', function () {

            const body = document.querySelector('body');
            const menuIcon = document.querySelector('.menu-icon-link');

            /* Test that ensures the menu element
             * is hidden by default.
             */
            it('is hidden by default', function () {
                expect(body).toHaveClass('menu-hidden');
            });

            /* Test that ensures the menu changes
             * visibility when the menu icon is clicked.
             * 1. Does the menu display when clicked?
             * 2. Does it hide when clicked again?
             */
            it('visibility is toggled on click', function () {
                menuIcon.click();
                expect(body).not.toHaveClass('menu-hidden');
                menuIcon.click();
                expect(body).toHaveClass('menu-hidden');
            });
        });
    });

    /* "Initial Entries" test suite */
    $(function () {
        describe('Initial Entries', function () {

            beforeEach(function (done) {
                loadFeed(0, done);
            });

            /* Test that ensures when the loadFeed function is
             * called and completes its work, there is at least
             * a single .entry element within the .feed container.
             * Remember, loadFeed() is asynchronous so this test will require
             * the use of Jasmine's beforeEach and asynchronous done() function.
             */
            it('loadFeed completes in at least one .entry in the .feed container', function (done) {
                const oneEntry = document.querySelector('.feed .entry');
                expect(oneEntry).toBeDefined();
                done();
            });
        });
    });

    /* "New Feed Selection" test suite */
    $(function () {
        describe('New Feed Selection', function () {

            let feed1;
            let feed2;

            beforeEach(function (done) {
                loadFeed(0, () => {
                    feed1 = document.querySelector('h1').innerHTML;
                    done();
                });
            });

            /* Test that ensures when a new feed is loaded by the
             * loadFeed function that the content actually changes.
             */
            it('loadFeed new content is updated', function (done) {
                loadFeed(1, () => {
                    feed2 = document.querySelector('h1').innerHTML;
                    expect(feed1).not.toEqual(feed2);
                    done();
                });
            });
        });
    });

}());