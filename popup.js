
// function initstuff(){
//     chrome.storage.sync.set({'yays': [], 'nays':[]}, function(){
//         message('storage init.')
//     })
// }
//
// initstuff();

function dothestuff(){

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var tab = tabs[0];
        var url = tab.url;
        document.getElementById('theUrl').textContent = url;
    })

    chrome.storage.sync.get('yays', function(data) {
        document.getElementById('yays').textContent = JSON.stringify(data.yays);
    });

    chrome.storage.sync.get('nays', function(data) {
        document.getElementById('nays').textContent = JSON.stringify(data.nays);
    });

}

dothestuff();
