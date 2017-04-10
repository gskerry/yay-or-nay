
function dothestuff(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var tab = tabs[0];
        var url = tab.url;
        document.getElementById('theUrl').textContent = url;
    })
}

dothestuff();
