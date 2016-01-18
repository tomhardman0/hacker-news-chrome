var button = document.querySelector('.clickToPost');

button.onclick = function() {

    var title = document.querySelector('.titleToPost').value;

    chrome.tabs.query({ currentWindow: true, active: true }, function(tab) {

        var toPost = encodeURIComponent(tab[0].url);
        title = title === '' ? tab[0].title : title;
        title = encodeURIComponent(title);

        var url = 'http://news.ycombinator.com/submitlink?u=' + toPost + '&t=' + title;

        chrome.tabs.update({ url: url });

    });

}
