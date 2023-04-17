/*global chrome*/

const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');
pdfjsLib.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/legacy/build/pdf.worker.entry.js');

function handlePdf() {
  var pageNum = 1;
  chrome.storage.local.get('myVariable', function(data) {
    pageNum = parseInt(data.myVariable);
  });
  var url = window.location.href;
  if (url.endsWith('.pdf')) {
    pdfjsLib.getDocument(url).promise.then(function(pdf) {
      var pageNumber = pageNum;
      var container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.overflow = 'auto';
      container.style.height = '100vh';
      container.style.width = '100%';
      document.body.innerHTML = '';
      document.body.appendChild(container);

      function renderPage() {
        pdf.getPage(pageNumber).then(function(page) {
          var scale = 2; // increase scale factor to improve clarity
          var viewport = page.getViewport({scale: scale});
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          canvas.height = viewport.height * 2; // increase canvas size to match viewport
          canvas.width = viewport.width * 2;
          container.appendChild(canvas);
          page.render({canvasContext: ctx, viewport: viewport})
        });
      }

      renderPage();
    });
  }
}

handlePdf();
window.addEventListener('popstate', handlePdf);
