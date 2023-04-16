export async function whichPage(pageNumber) {
    await chrome.storage.local.set({myVariable: pageNumber}, function() {});

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            files: ["navigateToTheWord.js"]
        }, function() {
            console.log('Script executed successfully');
        });
    });
}