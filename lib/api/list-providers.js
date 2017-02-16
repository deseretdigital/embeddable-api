const Embed = require('ddm-embeddable');

module.exports = function (req, res) {
    const embed = new Embed();
    res.send({ providers: Object.keys(embed.providers) });
};
