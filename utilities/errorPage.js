function sendError(req,msg) {
    return `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link rel="stylesheet" href="/css/error.css">
              <link rel="shortcut icon" href="/src/favicon_io/favicon.ico" type="image/x-icon">
              <title>Error-Not Found</title>
          </head>
          <body>
              <div class="error">
                  <div class="error-message">
                       ${msg}
                  </div>
              </div> 
          </body>
          </html>
          `;
  }

  module.exports.sendError = sendError;
  