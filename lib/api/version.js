const Embed = require('ddm-embeddable');
const responsiveEmbeds = require('./../utils/responsive-embeds.js');

module.exports = function (req, res) {
    res.send({
        version: 'v1'
    });
};
