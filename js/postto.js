var button = document.querySelector('.js-click');
var form = document.querySelector('.js-form');

// Set up GA tracking
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-57440172-4']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

// Submit the form using the current tab's url
// plus it's HTML title, or the title submitted
// from the text input.
form.onsubmit = function(e) {

    e.preventDefault();
    var title = document.querySelector('.js-title').value;

    chrome.tabs.query({ currentWindow: true, active: true }, function(tab) {

        var toPost = encodeURIComponent(tab[0].url);
        title = title === '' ? tab[0].title : title;
        title = encodeURIComponent(title);

        var url = 'http://news.ycombinator.com/submitlink?u=' + toPost + '&t=' + title;

        // Track event with GA
        var gaEvent = decodeURIComponent(title) + ': ' + url;
        _gaq.push(['_trackEvent', gaEvent, 'submitted']);

        // Direct the tab to the prepopulated Hacker
        // News submission page and close the extension
        chrome.tabs.update({ url: url });
        button.innerHTML = 'Loading...';
        setTimeout(function() {
            window.close();
        }, 500);

    });

}
