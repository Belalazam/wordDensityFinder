/*global chrome*/

const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');
pdfjsLib.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/legacy/build/pdf.worker.entry.js');

var dict = {};
var pageWithWordDensity = {};
export  async function findInPdfPage(word) {
    dict = {}
    pageWithWordDensity = {}
    for(let i = 0;i < word.length; i++){
        dict[word[i]] = true;
        const temp = word[i]
        const firstChar = temp.charAt(0);
        const restOfWord = temp.substring(1);
        const isUppercase = firstChar === firstChar.toUpperCase();
        const modifiedChar = (!isUppercase) ? firstChar.toUpperCase() : firstChar.toLowerCase();
        dict[modifiedChar + restOfWord] = true;
    }
    const tab =  await chrome.tabs.query({ active: true, currentWindow: true });
    const currentUrl = await tab[0].url

    const pdfData = await fetch(currentUrl).then((res) => res.arrayBuffer());
    const pdfDocument = await pdfjsLib.getDocument({ data: pdfData }).promise;
      var tempDict = {};
      for (var pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) { 
        tempDict = Object.assign({}, dict); 
        var counter = 0;
        var page =await pdfDocument.getPage(pageNum);
        var content = await page.getTextContent();
        var text =   content.items.map(item => item.str).join('');
        var temp =  text.split(" ");

        for (var i = 0; i < temp.length; i++) {
          if (tempDict[temp[i]]) {
            tempDict[temp[i]] = false;
            counter += 1;
          }
        }
        pageWithWordDensity[pageNum] = counter;
      }

      const sortedDict = 
        Object.entries(pageWithWordDensity)
          .sort(([, a], [, b]) => b - a)
      return sortedDict
}

