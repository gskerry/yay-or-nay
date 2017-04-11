
function initstuff(){
    chrome.storage.sync.set({'yays': [], 'nays':[]}, function(){
        message('storage init.')
    })
}

initstuff();

// function dothestuff(){
//
//     chrome.storage.sync.get(null, function(data) {
//         document.getElementById('yays').textContent = JSON.stringify(data);
//         // message('Settings saved');
//     });
//
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
//         var tab = tabs[0];
//         var url = tab.url;
//         document.getElementById('theUrl').textContent = url;
//         // chrome.storage.sync.set(, function(data) {
//     })
// }
//
// dothestuff();
