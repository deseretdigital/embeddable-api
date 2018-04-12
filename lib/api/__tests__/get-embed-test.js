'use strict';

// I did this because I was experiencing a similar problem to the author of https://github.com/facebook/jest/issues/230
// His workaround worked
jest.setMock('./../../utils/responsive-embeds', require.requireActual('./../../__mocks__/responsive-embeds'));
jest.setMock('../get-embed', require.requireActual('../get-embed'));

const getEmbed = require('./../get-embed');

describe('getEmbed', () => {
    let res;
    describe('exception behavior', () => {
        beforeEach(() => {
            res = {
                send: jest.fn(),
                status: jest.fn(),
            };
        });
        it('throws an exception on no URL sent', () => {
            getEmbed({ query: {}}, res);

            expect(res.send).toBeCalledWith('URI must be included (?uri=...)');
            expect(res.status).toBeCalledWith(400);
        });
    });
    describe('correct behavior', () => {
        beforeEach(() => {
            res = {
                send: jest.fn(),
                status: jest.fn(),
            };
        });
        it('with a YouTube URL', (done) => {
            const result = getEmbed({ query: {
                uri: 'https://www.youtube.com/watch?v=cJr99fNMzj0'
            }}, res);
            result.then((...args) => {
                expect(res.send).toBeCalledWith(expect.any(Object));
                const calledWith = res.send.mock.calls[0];
                expect(calledWith[0]).toHaveProperty('data.data.title');
                expect(calledWith[0]).toHaveProperty('rendered');
                console.log(calledWith[0].rendered);
                done();
            });
        });
    });
});
