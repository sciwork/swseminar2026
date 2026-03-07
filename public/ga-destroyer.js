/**
 * Google Analytics Blocker Script
 *
 * This script blocks Google Analytics and Google Tag Manager from loading
 * until the user explicitly consents to cookies. It uses a MutationObserver
 * to monitor DOM changes and prevents tracking scripts from executing.
 *
 * How it works:
 * 1. Sets a cookie to indicate the cookie banner should be shown
 * 2. Watches for new <script> and <iframe> elements being added to the page
 * 3. Blocks analytics scripts until user gives consent
 * 4. Once consent is given, allows analytics scripts to load normally
 */

/**
 * IIFE (Immediately Invoked Function Expression)
 * Pattern: (function() { ... })();
 *
 * This wraps the entire code in a function that executes immediately.
 * Benefits:
 * - Creates a private scope for variables (BLOCKED_URLS, observer, etc.)
 * - Prevents pollution of the global namespace
 * - Avoids conflicts with other scripts on the page
 * - Variables defined inside are not accessible from outside
 */
(function () {
  // Define the URLs we want to block (Google Analytics and Google Tag Manager)
  const BLOCKED_URLS = ["google-analytics.com", "googletagmanager.com/gtag/js"];

  // Cookie key that controls whether to show the cookie consent banner
  const COOKIE_SHOW_COOKIE_BANNER_KEY = "__sciwork_show_cookie_banner";

  // Cookie key that stores whether the user has accepted cookie consent
  const COOKIE_IS_COOKIE_CONSENTED_KEY = "__sciwork_is_cookie_consented";

  // Set a cookie to trigger the display of the cookie consent banner
  // This tells the application that the user needs to see the consent UI
  document.cookie = `${COOKIE_SHOW_COOKIE_BANNER_KEY}=true`;

  /**
   * Check if a script source URL should be blocked
   * @param {string} src - The source URL of the script or iframe
   * @returns {boolean} - Returns true if the URL contains any blocked domain
   */
  const shouldBlock = function (src) {
    // Check if the source URL contains any of the blocked domains
    // .some() returns true if at least one element matches the condition
    return BLOCKED_URLS.some((url) => src.includes(url));
  };

  /**
   * MutationObserver callback function
   * This function is called whenever DOM changes are detected
   * It monitors for new script and iframe elements and blocks them if necessary
   */
  const observer = new MutationObserver((mutations) => {
    // First, check if the user has already accepted cookies
    // If they have, we don't need to block anything, so exit early
    if (
      document.cookie.includes(`${COOKIE_IS_COOKIE_CONSENTED_KEY}=accepted`)
    ) {
      return;
    }

    // Process each mutation (DOM change) that occurred
    mutations.forEach((mutation) => {
      // For each mutation, check all newly added nodes
      mutation.addedNodes.forEach((node) => {
        // We only care about script and iframe elements
        // If this node is neither, skip it and continue to the next node
        if (!["script", "iframe"].includes(node.nodeName.toLowerCase())) {
          return;
        }

        // Get the source URL of the script or iframe
        const src = node.src;

        // If the node has a source URL and it matches our blocked URLs list
        if (src && shouldBlock(src)) {
          // Change the script type to prevent it from executing
          // Browsers won't execute scripts with type "javascript/blocked"
          node.type = "javascript/blocked";

          // Remove the node completely from the DOM
          // This ensures the tracking script never loads or runs
          node.remove();
        }
      });
    });
  });

  // Start observing the entire document for DOM changes
  // document.documentElement refers to the <html> element (root of the page)
  observer.observe(document.documentElement, {
    // childList: true - Watch for addition/removal of child nodes
    childList: true,
    // subtree: true - Watch for changes in all descendants, not just direct children
    // This ensures we catch scripts added anywhere in the page
    subtree: true,
  });
})(); // The () at the end immediately invokes/executes the function
