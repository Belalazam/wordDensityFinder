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
      var numPages = pdf.numPages;
      var container = document.createElement('div');
      container.style.overflow = 'auto';
      container.style.height = '100%';
      container.style.width = '100%';
      document.body.innerHTML = '';
      document.body.appendChild(container);

      function renderPage() {
        pdf.getPage(pageNumber).then(function(page) {
          var scale = 1.5;
          var viewport = page.getViewport({scale: scale});
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          container.appendChild(canvas);
          page.render({canvasContext: ctx, viewport: viewport}).promise.then(function() {
            pageNumber++;
            if (pageNumber <= numPages) {
              renderPage();
            }
          });
        });
      }

      renderPage();
    });
  }
}

handlePdf();
window.addEventListener('popstate', handlePdf);
