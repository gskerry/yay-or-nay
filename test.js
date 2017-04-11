function test(){
    chrome.storage.local.get(null, function(data){
        console.log("chrome.local: ", data);
        document.getElementById('status').textContent = JSON.stringify(data);
    })
}

test();
