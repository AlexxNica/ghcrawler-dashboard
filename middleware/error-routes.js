// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/*eslint no-console: ["error", { allow: ["warn"] }] */

module.exports = function configureErrorRoutes(app, initializationError) {
  if (initializationError) {
    console.warn('Initialization Error Present: All app requests will fail!');

    // For convienience, failed initialization should appear
    // for any request. Should evaluate whether to hide for
    // production scenarios or if there is a risk of the
    // error message leaking sensitive data.
    app.use((req, res, next) => {
      var error = new Error('Application initialization error');
      error.detailed = initializationError.message || null;
      error.innerError = initializationError;
      return next(error);
    });
  }

  app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    err.skipLog = true;
    next(err);
  });
  app.use(require('./errorHandler'));
};
