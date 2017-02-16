const Embed = require('ddm-embeddable');
const responsiveEmbeds = require('./../utils/responsive-embeds.js');

module.exports = function (req, res) {
    const embed = new Embed();
    const body = req.body.body;
    const noProtocol = req.body.noProtocol;
    if (!body) {
        res.status(400);
        res.send('Body must be included (POST DATA body=...)');
        return Promise.resolve();
    }

    const actions = [];
    const lines = body.split('\n');
    lines.forEach((line, index) => {
        if (line.trim().match(/^([A-Za-z]{3,9}):\/\/([-;:&=\+\$,\w]+@{1})?([-A-Za-z0-9\.]+)+:?(\d+)?((\/[-\+~%\/\.\w]+)?\??([-\+=&;%@\.\w]+)?#?([\w]+)?)?$/)) {
            actions.push(new Promise((resolve, reject) => {
                return embed.fetch(line.trim())
                .then((data) => {
                    if (!data) {
                        throw 'No data was returned';
                    }
                    if (data.error) {
                        throw data.error;
                    }
                    lines[index] = responsiveEmbeds(
                        embed.render(data, { as: 'auto' }).replace(/src="https?:\/\//g, 'src="//')
                    );
                    if (noProtocol) {
                        lines[index] = lines[index].replace(/src="https?:\/\//g, 'src="//');
                    }
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
            }));
        }
    });

    return Promise.all(actions)
    .then(() => {
        res.send(lines.join('\n'));
    })
    .catch((err) => {
        res.status(400);
        res.send(err);
    });
};
