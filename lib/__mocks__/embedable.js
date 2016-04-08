module.exports = function () {
    this.fetch = function (requestParams) {
        this.renderHtml = 'html';
        const promise = Promise.resolve();
        if (requestParams.uri === 'throw') {
            return promise.then(() => {
                throw 'An error occurred';
            });
        } else if (requestParams.uri === 'returnsError') {
            return promise.then(() => {
                return {
                    error: 'This did not work'
                };
            });
        } else if (requestParams.uri === 'noData') {
            return promise.then(() => {
                return null;
            });
        } else if (requestParams.uri === 'testUri') {
            return promise.then(() => {
                return {};
            });
        // when parsing the body we always pass a url so we had to use urls for test comparators.
        } else if (requestParams === 'http://throwerror.com') {
            throw 'An error occurred';
        } else if (requestParams === 'http://nodata.com') {
            return promise.then(() => {
                return null;
            });
        } else if (requestParams === 'http://returnserror.com') {
            return promise.then(() => {
                return {
                    error: 'This did not work'
                };
            });
        } else if (requestParams === 'http://changeme.com') {
            this.renderHtml = '<div>embed</div>';
            return promise.then(() => {
                return {};
            });
        }
        return promise.then(() => {
            return {};
        });
    };
    this.render = function () {
        return this.renderHtml;
    };
};
