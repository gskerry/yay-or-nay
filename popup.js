
function dothestuff(){

    chrome.storage.sync.get(null, function(data) {
        document.getElementById('theUrl').textContent = JSON.stringify(data);
        // message('Settings saved');
    });

    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    //     var tab = tabs[0];
    //     var url = tab.url;
    //     document.getElementById('theUrl').textContent = url;
    // })
}

dothestuff();
