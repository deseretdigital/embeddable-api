const Embed = require('ddm-embeddable');
const responsiveEmbeds = require('./../utils/responsive-embeds.js');

module.exports = function (req, res) {
    const embed = new Embed();
    const uri = req.query.uri;
    const noProtocol = req.query.noProtocol;
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
            rendered: responsiveEmbeds(
                embed.render(data, { as: 'auto' })
            )
        };
        if (noProtocol) {
            response.rendered = response.rendered.replace(/src="https?:\/\//g, 'src="//');
        }
        res.send(response);
    }).catch((err) => {
        res.status(400);
        res.send(err);
    });
};
