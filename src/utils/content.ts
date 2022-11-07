// Webview content accepts some html content and wraps it inside
// a web page with no margin or padding, and with scroll disabled
// Useful for notes or ticket content
export const webviewContent = (content: string): string => {
  return `<html>
    <head>
      <style rel="stylesheet" type="text/css">
        body, html, div, p, strong {
            margin: 0px !important;
            padding: 0px !important;
        }
        #height-calculator {
            position: absolute;
            margin: 0px !important;
            padding: 0px !important;
            top: 0;
            left: 0;
        }
      </style>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    </head>
    <body><div id="height-calculator">${content}</div></body>
    <script>
      setTimeout(function() { 
        var calculator = document.getElementById("height-calculator");
        document.title = calculator.clientHeight;
        window.ReactNativeWebView.postMessage(calculator.clientHeight);
      }, 500);
      true;
    </script>
  </html>`
}
