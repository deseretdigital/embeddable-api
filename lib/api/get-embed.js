const Embed = require('embedable');

module.exports = function (req, res) {
    const embed = new Embed();
    const uri = req.query.uri;
    if (!uri) {
        res.status(400);
        res.send('URI must be included (?uri=...)');
        return Promise.resolve();
    }
    return embed.fetch({
        uri,
    }).then((data) => {
        if (!data) {
            throw 'No data was returned';
        }
        if (data.error) {
            throw data.error;
        }
        const response = {
            data,
            rendered: embed.render(data, { as: 'auto' })
        };
        res.send(response);
    }).catch((err) => {
        res.status(400);
        res.send(err);
    });
};
