let $;

require('jsdom').env('', (err, window) => {
    $ = require('jquery')(window);
});

module.exports = function (html) {
    if (!$) { // will be defined on server startup
        return html;
    }
    const embed = $(`<div>${html}</div>`);
    const iframe = embed.find('iframe');
    if (embed.hasClass('embed-embed') && iframe.length === 1) {
        embed.css('position', 'relative');
        embed.css('height', 0);
        embed.css('overflow', 'hidden');

        iframe.css('position', 'absolute');
        iframe.css('top', 0);
        iframe.css('left', 0);
        iframe.css('height', '100%');
        iframe.css('width', '100%');
    }
    embed.html(iframe.prop('outerHTML'));
    return embed.prop('innerHTML');
};
