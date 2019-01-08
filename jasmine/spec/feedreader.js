/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/*all tests are placed within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This test suite is all about the RSS
   * feeds definitions, the allFeeds variable in the application.
   */
  describe('RSS Feeds', function() {
    /*test to make sure that the
     * allFeeds variable has been defined and that it is not empty*/

    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /*test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('have URLs', function() {
      for (let feed of allFeeds) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      }
    })

    /*test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('have names', function() {
      for (let feed of allFeeds) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      }
    })
  });

  /*test suite named "The menu"*/
  describe('The Menu', function() {


    /*test that ensures the menu element is hidden by default*/
    it('menu is hidden by default', function() {
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

    /*test that ensures the menu changes visibility when the menu icon is clicked*/
    it('menu is displayed when clicked and hides when clicked again', function() {
      const menu = document.querySelector('.menu-icon-link');
      const body = document.querySelector('body');

      menu.click();
      expect(body.classList.contains('menu-hidden')).toBe(false);
      menu.click();
      expect(body.classList.contains('menu-hidden')).toBe(true);
    });
  });

  /*test suite named "Initial Entries"*/
  describe('Initial Entries', function() {

    /*test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * an entry element within the feed container*/

    beforeEach(function(done) {
      loadFeed(0, done);
    });

    it('has at leas a single entry', function() {
      const entries = $('.feed .entry');
      expect(entries.length).toBeGreaterThan(0);
    });
  });

  /*test suite named "New Feed Selection"*/
  describe('New Feed Selection', function() {

    /*test that ensures when a new feed is loaded the content actually changes*/
    let firstFeed,
      secondFeed;

    beforeEach(function(done) {
      loadFeed(3, function() {
        firstFeed = document.querySelector('div.feed').innerHTML;
        loadFeed(2, function() {
          secondFeed = document.querySelector('div.feed').innerHTML;
          done();
        });
      });
    });

    it('new feed loaded', function() {
      expect(firstFeed).not.toBe(secondFeed);
    });

  });
}());
