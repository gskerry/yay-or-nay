
// function initstuff(){
//     chrome.storage.sync.set({'yays': [], 'nays':[]}, function(){
//         message('storage init.')
//     })
// }
//
// initstuff();

var url;
var yays;
var nays;

function dothestuff(){

    chrome.storage.sync.get('yays', function(data) {
        yays = data.yays;
        document.getElementById('yays').textContent = JSON.stringify(yays);
    });

    chrome.storage.sync.get('nays', function(data) {
        nays = data.nays;
        document.getElementById('nays').textContent = JSON.stringify(nays);
    });

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var tab = tabs[0];
        url = tab.url;
        document.getElementById('theUrl').textContent = url;
        if(yays.indexOf(url) != -1){
            document.getElementById('status').textContent = "Yay"
        } else if(nays.indexOf(url) != -1){
            document.getElementById('status').textContent = "Nay"
        } else {
            document.getElementById('status').textContent = "What say you?"
        }
    })

}

dothestuff();

function sayYay(){
    yays.push(url);
    chrome.storage.sync.set({'yays': yays}, function() {
        alert('The Yays Have it. Saved.')
    });
}
