'use strict';

jest.dontMock('../get-embed');
jest.mock('embedable');

const getEmbed = require('../get-embed');

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
        pit('throws an exception if an error occurs', () => {
            return getEmbed({
                query: {
                    uri: 'throw'
                },
            }, res).then(() => {
                expect(res.send.mock.calls[0]).toEqual(['An error occurred']);
                expect(res.status).toBeCalledWith(400);
            });
        });
        pit('throws an exception on no data returned', () => {
            return getEmbed({ query: { uri: 'noData' }}, res).then(() => {
                expect(res.send).toBeCalledWith('No data was returned');
                expect(res.status).toBeCalledWith(400);
            });
        });
        pit('throws an exception if an error is returned', () => {
            return getEmbed({
                query: {
                    uri: 'returnsError'
                },
            }, res).then(() => {
                expect(res.send).toBeCalledWith('This did not work');
                expect(res.status).toBeCalledWith(400);
            });
        });
    });
    describe('correct behavior', () => {
        pit('calls render and returns formatted object', () => {
            return getEmbed({
                query: {
                    uri: 'testUri'
                },
            }, res).then(() => {
                expect(res.send).toBeCalledWith({data: {}, rendered: 'html'});
            });
        });
    });
});