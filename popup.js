
function seedstuff(){
    chrome.storage.local.set({'yays': [], 'nays':[]}, function(){
        message('storage seeded.')
    })
}

// seedstuff();

function bytecount(){
    chrome.storage.local.getBytesInUse(null, function(bytesInUse){
        document.getElementById('count').textContent = bytesInUse;
    })
}

function initstuff(){
    chrome.storage.onChanged.addListener(function (changes, areaName){
        document.getElementById('changes').textContent = changes;
        document.getElementById('changes').textContent = areaName;
        bytecount();
    })
}

initstuff();

var url;
var yays;
var nays;

function dothestuff(){

    chrome.storage.local.get('yays', function(data) {
        yays = data.yays;
        document.getElementById('yays').textContent = JSON.stringify(yays);
    });

    chrome.storage.local.get('nays', function(data) {
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

function sayYay(){
    yays.push(url);
    chrome.storage.local.set({'yays': yays}, function() {
        // alert('The Yays Have it. Saved.')
    });
}

function sayNay(){
    nays.push(url);
    chrome.storage.local.set({'nays': nays}, function() {
        // alert('The Nays Have it. Saved.')
    });
}

function clear(){
    chrome.storage.local.clear(function() {
        alert('local storage WIPED.')
        seedstuff();
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('yaybutton').addEventListener('click', sayYay);
    document.getElementById('naybutton').addEventListener('click', sayNay);
    document.getElementById('clearbutton').addEventListener('click', clear);
    dothestuff();
    bytecount();
});
