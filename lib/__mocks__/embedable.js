module.exports = function () {
    this.fetch = function (requestParams) {
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
        }
        return promise.then(() => {
            return {};
        });
    };
    this.render = function () {
        return 'html';
    };
};
