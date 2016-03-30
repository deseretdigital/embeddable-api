module.exports = function() {
    this.fetch = function(requestParams) {
        var promise = Promise.resolve();
        if(requestParams.uri === 'throw') {
            return promise.then(function() {
                throw 'An error occurred';
            });
        } else if(requestParams.uri === 'returnsError') {
            return promise.then(function() {
                return {
                    error: 'This did not work'
                }
            });
        } else if(requestParams.uri === 'noData') {
            return promise.then(function() {
                return null;
            });
        } else if(requestParams.uri === 'testUri') {
            return promise.then(function() {
                return {};
            });
        }
        return promise.then(function() {
            return {};
        });
    };
    this.render = function() {
        return 'html';
    }
};
