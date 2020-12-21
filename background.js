let list = []

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // console.log("inside on updated " + changeInfo, tab);
    list.map((key) => {
        if (tab.url.includes(key) && tab.status == "complete") {
            chrome.tabs.remove(tabId);
        }
    })
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type == "sendDetails") {
        sendResponse(list);
    } else if (request.type == "add") {
        list.push(request.add);
        closeTabs();
    } else {
        let newList = list.filter((item) => {
            return item != request.remove;
        })
        list = newList;
    }
});

closeTabs = () => {
    chrome.tabs.query({}, function (tabs) {
        tabs.map((tab) => {
            list.map((key) => {
                if (tab.url.includes(key)) {
                    chrome.tabs.remove(tab.id,function(e){
                        console.log(e);
                    });
                }
            })
        })
    });
}
