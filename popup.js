
var url;
var yays;
var nays;

function seedstuff(){
    chrome.storage.local.set({'yays': [], 'nays':[]}, function(){
        yays = [];
        nays = [];
        refreshStatus();
    })
}

function bytecount(){
    chrome.storage.local.getBytesInUse(null, function(bytesInUse){
        document.getElementById('count').textContent = bytesInUse;
    })
}

function tag2array(tagName){
    return Array.prototype.slice.call(document.getElementsByTagName(tagName))
}

function class2array(className){
    return Array.prototype.slice.call(document.getElementsByClassName(className))
}

function lockbutt(){
    class2array("yaynay").map(function(e){
        e.setAttribute("disabled", null);
    })
}

function clearbutt(){
    class2array("yaynay").map(function(e){
        e.removeAttribute("disabled");
        e.style.backgroundColor = "transparent";
    })
    document.getElementById('confirmReset').style.visibility = "hidden";
}

function runQueries(cb){

    chrome.storage.local.get('yays', function(data) {
        yays = data.yays;
    });

    chrome.storage.local.get('nays', function(data) {
        nays = data.nays;
    });

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var tab = tabs[0];
        url = tab.url;
        document.getElementById('theUrl').textContent = url;
        cb()
    })
}

function refreshStatus(){
    if(yays.indexOf(url) != -1){
        lockbutt()
        document.getElementById('yaybutton').style.backgroundColor = "green";
    } else if(nays.indexOf(url) != -1){
        lockbutt()
        document.getElementById('naybutton').style.backgroundColor = "red";
    } else {
        clearbutt()
    }
    bytecount();
}

function sayYay(){
    yays.push(url);
    chrome.storage.local.set({'yays': yays}, function() {

    });
    refreshStatus()
}

function sayNay(){
    nays.push(url);
    chrome.storage.local.set({'nays': nays}, function() {

    });
    refreshStatus()
}

function resetStorage(){
    chrome.storage.local.clear(function() {
        seedstuff();
    });
}

function confirmReset(){
    document.getElementById('confirmReset').style.visibility = "visible";
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('yaybutton').addEventListener('click', sayYay);
    document.getElementById('naybutton').addEventListener('click', sayNay);
    document.getElementById('resetbutton').addEventListener('click', confirmReset);
    document.getElementById('confirmReset').addEventListener('click', resetStorage);
    runQueries(refreshStatus);
});
