'use strict';

// I did this because I was experiencing a similar problem to the author of https://github.com/facebook/jest/issues/230
// His workaround worked
jest.setMock('./../../utils/responsive-embeds', require.requireActual('./../../__mocks__/responsive-embeds'));
jest.setMock('../parse-embeds', require.requireActual('../parse-embeds'));

const parseEmbeds = require('../parse-embeds');

describe('parseEmbeds', () => {
    let res;
    describe('exception behavior', () => {
        beforeEach(() => {
            res = {
                send: jest.fn(),
                status: jest.fn(),
            };
        });
        it('throws an exception on no body sent', () => {
            parseEmbeds({ body: {}}, res);

            expect(res.send).toBeCalledWith('Body must be included (POST DATA body=...)');
            expect(res.status).toBeCalledWith(400);
        });
        it('throws an exception if an error occurs', () => {
            return parseEmbeds({
                body: {
                    body: 'throw\nhttp://throwerror.com\n'
                },
            }, res).then(() => {
                expect(res.send.mock.calls[0]).toEqual(['An error occurred']);
                expect(res.status).toBeCalledWith(400);
            });
        });
        it('throws an exception on no data returned', () => {
            return parseEmbeds({ body: { body: 'noData\nhttp://nodata.com\n' }}, res).then(() => {
                expect(res.send).toBeCalledWith('No data was returned');
                expect(res.status).toBeCalledWith(400);
            });
        });
        it('throws an exception if an error is returned', () => {
            return parseEmbeds({
                body: {
                    body: 'returnsError\nhttp://returnserror.com\n'
                },
            }, res).then(() => {
                expect(res.send).toBeCalledWith('This did not work');
                expect(res.status).toBeCalledWith(400);
            });
        });
    });
    describe('correct behavior', () => {
        it('returns unmodified body with no urls', () => {
            return parseEmbeds({
                body: {
                    body: 'There are no urls to be found.\nNope none at all'
                },
            }, res).then(() => {
                expect(res.send).toBeCalledWith('There are no urls to be found.\nNope none at all');
            });
        });
        it('returns modified body with urls', () => {
            return parseEmbeds({
                body: {
                    body: 'One url to change.\nhttp://changeme.com'
                },
            }, res).then(() => {
                expect(res.send).toBeCalledWith('One url to change.\n<div>embed</div>');
          });
        });
    });
});
