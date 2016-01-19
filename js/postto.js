var button = document.querySelector('.js-click');
var form = document.querySelector('.js-form');

form.onsubmit = function(e) {

    e.preventDefault();
    var title = document.querySelector('.js-title').value;

    chrome.tabs.query({ currentWindow: true, active: true }, function(tab) {

        var toPost = encodeURIComponent(tab[0].url);
        title = title === '' ? tab[0].title : title;
        title = encodeURIComponent(title);

        var url = 'http://news.ycombinator.com/submitlink?u=' + toPost + '&t=' + title;

        chrome.tabs.update({ url: url });
        button.innerHTML = 'Loading...';
        setTimeout(function() {
            window.close();
        }, 500);

    });

}
