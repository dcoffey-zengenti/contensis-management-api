"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Contensis = require("../index");
const specs_utils_spec_1 = require("../specs-utils.spec");
// import { toQuery } from 'contensis-core-api';
const cross_fetch_1 = require("cross-fetch");
const contensis_core_api_1 = require("contensis-core-api");
const FreeTextSearchOperatorType_1 = require("contensis-core-api/lib/models/search/FreeTextSearchOperatorType");
const Zengenti = { Contensis };
const global = window || this;
global.fetch = cross_fetch_1.default;
describe('Entry Operations', () => {
    describe('Get entry', () => {
        beforeEach(() => {
            specs_utils_spec_1.setDefaultSpy(global, {
                title: 'Entry1'
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('by id', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let entry = await client.entries.get('1');
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/entries/1?language=en-US&versionStatus=published',
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(entry).not.toBeNull();
            expect(entry['title']).toEqual('Entry1');
        });
        it('with options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let entry = await client.entries.get({
                id: '1',
                versionStatus: 'latest',
                version: '2.1',
                language: 'en-GB'
            });
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/entries/1?language=en-GB&version=2.1',
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(entry).not.toBeNull();
            expect(entry['title']).toEqual('Entry1');
        });
    });
    describe('List entries', () => {
        beforeEach(() => {
            specs_utils_spec_1.setDefaultSpy(global, {
                pageIndex: 0,
                pageSize: 25,
                totalCount: 2,
                items: [{
                        title: 'entry1'
                    },
                    {
                        title: 'entry2'
                    }
                ]
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('with no content type and default options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let entries = await client.entries.list();
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/entries?language=en-US&pageIndex=0&pageSize=25&versionStatus=published',
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(entries).not.toBeNull();
            expect(entries.items.length).toEqual(2);
            expect(entries.items[1].title).toEqual('entry2');
        });
        it('with no content type and specific options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let entries = await client.entries.list({
                versionStatus: 'latest',
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['title'],
                language: 'fr-FR',
            });
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/entries?language=fr-FR&order=title&pageIndex=1&pageSize=50',
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(entries).not.toBeNull();
            expect(entries.items.length).toEqual(2);
            expect(entries.items[1].title).toEqual('entry2');
        });
        it('with content type and default options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let entries = await client.entries.list('movie');
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/contenttypes/movie/entries?language=en-US&pageIndex=0&pageSize=25&versionStatus=published',
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(entries).not.toBeNull();
            expect(entries.items.length).toEqual(2);
            expect(entries.items[1].title).toEqual('entry2');
        });
        it('with content type and specific options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let entries = await client.entries.list({
                contentTypeId: 'movie',
                versionStatus: 'latest',
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['title'],
                language: 'fr-FR',
            });
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/contenttypes/movie/entries?language=fr-FR&order=title&pageIndex=1&pageSize=50',
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(entries).not.toBeNull();
            expect(entries.items.length).toEqual(2);
            expect(entries.items[1].title).toEqual('entry2');
        });
    });
    describe('Get entry usage', () => {
        beforeEach(() => {
            specs_utils_spec_1.setDefaultSpy(global, {
                pageIndex: 0,
                pageSize: 25,
                totalCount: 2,
                items: [{
                        title: 'entry1'
                    },
                    {
                        title: 'entry2'
                    }
                ]
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('by id', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let entries = await client.entries.getUsage('1');
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/entries/1/usage?language=en-US&pageIndex=0&pageSize=25&versionStatus=published',
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(entries).not.toBeNull();
            expect(entries.items.length).toEqual(2);
            expect(entries.items[1].title).toEqual('entry2');
        });
        it('with options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let entries = await client.entries.getUsage({
                id: '1',
                versionStatus: 'latest',
                pageOptions: { pageIndex: 1, pageSize: 50 },
                language: 'fr-FR',
            });
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/entries/1/usage?language=fr-FR&pageIndex=1&pageSize=50',
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(entries).not.toBeNull();
            expect(entries.items.length).toEqual(2);
            expect(entries.items[1].title).toEqual('entry2');
        });
    });
    describe('Search entries', () => {
        beforeEach(() => {
            specs_utils_spec_1.setDefaultSpy(global, {
                pageIndex: 0,
                pageSize: 25,
                totalCount: 2,
                items: [{
                        title: 'entry1'
                    },
                    {
                        title: 'entry2'
                    }
                ]
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('with query as Object', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let orderBy = [{
                    asc: 'name'
                }, {
                    desc: 'brewTypeCount'
                }];
            let where = [{
                    field: 'brewTypeCount',
                    greaterThan: 5
                }, {
                    field: 'Origin',
                    in: ['Peru', 'Columbia']
                }];
            let query = {
                pageIndex: 1,
                pageSize: 50,
                orderBy,
                where
            };
            let entries = await client.entries.search(query);
            let expectedQueryString = contensis_core_api_1.toQuery(Object.assign({}, query, { orderBy: JSON.stringify(orderBy), where: JSON.stringify(where) }));
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/projects/myProject/entries/search${expectedQueryString}`,
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(entries).not.toBeNull();
            expect(entries.items.length).toEqual(2);
            expect(entries.items[1].title).toEqual('entry2');
        });
        it('with query as the default Query instance ', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let query = new Contensis.Query();
            let entries = await client.entries.search(query);
            let expectedQueryString = contensis_core_api_1.toQuery({
                pageIndex: 0,
                pageSize: 20,
                where: JSON.stringify([])
            });
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/projects/myProject/entries/search${expectedQueryString}`,
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(entries).not.toBeNull();
            expect(entries.items.length).toEqual(2);
            expect(entries.items[1].title).toEqual('entry2');
        });
        it('with query as a specific Query instance ', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let query = new Contensis.Query(Contensis.Op.startsWith('authorName', 'W'));
            query.orderBy = Contensis.OrderBy.asc('authorName');
            query.pageIndex = 1;
            query.pageSize = 50;
            let entries = await client.entries.search(query);
            let expectedQueryString = contensis_core_api_1.toQuery({
                pageIndex: 1,
                pageSize: 50,
                orderBy: JSON.stringify([{
                        asc: 'authorName'
                    }]),
                where: JSON.stringify([{
                        field: 'authorName',
                        startsWith: 'W'
                    }])
            });
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/projects/myProject/entries/search${expectedQueryString}`,
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(entries).not.toBeNull();
            expect(entries.items.length).toEqual(2);
            expect(entries.items[1].title).toEqual('entry2');
        });
        it('with query as Object for distanceWithin operator', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let orderBy = [{
                    asc: 'authorName'
                }];
            let where = [{
                    field: 'authorLocation',
                    distanceWithin: {
                        lat: 52.377,
                        lon: -2.749,
                        distance: '10mi'
                    }
                }];
            let query = {
                pageIndex: 1,
                pageSize: 50,
                orderBy,
                where
            };
            let entries = await client.entries.search(query);
            let expectedQueryString = contensis_core_api_1.toQuery(Object.assign({}, query, { orderBy: JSON.stringify(orderBy), where: JSON.stringify(where) }));
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/projects/myProject/entries/search${expectedQueryString}`,
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(entries).not.toBeNull();
            expect(entries.items.length).toEqual(2);
            expect(entries.items[1].title).toEqual('entry2');
        });
        it('with query as Query instance distanceWithin operator', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let query = new Contensis.Query(Contensis.Op.distanceWithin('authorLocation', 52.377, -2.749, '10mi'));
            query.orderBy = Contensis.OrderBy.asc('authorName');
            query.pageIndex = 1;
            query.pageSize = 50;
            let entries = await client.entries.search(query);
            let expectedQueryString = contensis_core_api_1.toQuery({
                pageIndex: 1,
                pageSize: 50,
                orderBy: JSON.stringify([{
                        asc: 'authorName'
                    }]),
                where: JSON.stringify([{
                        field: 'authorLocation',
                        distanceWithin: {
                            lat: 52.377,
                            lon: -2.749,
                            distance: '10mi'
                        }
                    }])
            });
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/projects/myProject/entries/search${expectedQueryString}`,
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(entries).not.toBeNull();
            expect(entries.items.length).toEqual(2);
            expect(entries.items[1].title).toEqual('entry2');
        });
        it('with query as Object for freeText non-fuzzy  operator', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let orderBy = [{
                    asc: 'authorName'
                }];
            let where = [{
                    field: 'authorLocation',
                    freeText: {
                        term: 'term1'
                    }
                }];
            let query = {
                pageIndex: 1,
                pageSize: 50,
                orderBy,
                where
            };
            let entries = await client.entries.search(query);
            let expectedQueryString = contensis_core_api_1.toQuery(Object.assign({}, query, { orderBy: JSON.stringify(orderBy), where: JSON.stringify(where) }));
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/projects/myProject/entries/search${expectedQueryString}`,
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(entries).not.toBeNull();
            expect(entries.items.length).toEqual(2);
            expect(entries.items[1].title).toEqual('entry2');
        });
        it('with query as Object for freeText fuzzy operator', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let orderBy = [{
                    asc: 'authorName'
                }];
            let where = [{
                    field: 'authorLocation',
                    freeText: {
                        term: 'term1',
                        fuzzy: true,
                        operator: 'or'
                    }
                }];
            let query = {
                pageIndex: 1,
                pageSize: 50,
                orderBy,
                where
            };
            let entries = await client.entries.search(query);
            let expectedQueryString = contensis_core_api_1.toQuery(Object.assign({}, query, { orderBy: JSON.stringify(orderBy), where: JSON.stringify(where) }));
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/projects/myProject/entries/search${expectedQueryString}`,
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(entries).not.toBeNull();
            expect(entries.items.length).toEqual(2);
            expect(entries.items[1].title).toEqual('entry2');
        });
        it('with query as Query instance for freeText non-fuzzy operator', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let query = new Contensis.Query(Contensis.Op.freeText('authorLocation', 'term1'));
            query.orderBy = Contensis.OrderBy.asc('authorName');
            query.pageIndex = 1;
            query.pageSize = 50;
            let entries = await client.entries.search(query);
            let expectedQueryString = contensis_core_api_1.toQuery({
                pageIndex: 1,
                pageSize: 50,
                orderBy: JSON.stringify([{
                        asc: 'authorName'
                    }]),
                where: JSON.stringify([{
                        field: 'authorLocation',
                        freeText: {
                            term: 'term1',
                            fuzzy: false,
                            operator: FreeTextSearchOperatorType_1.FreeTextSearchOperatorTypeEnum.And
                        }
                    }])
            });
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/projects/myProject/entries/search${expectedQueryString}`,
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(entries).not.toBeNull();
            expect(entries.items.length).toEqual(2);
            expect(entries.items[1].title).toEqual('entry2');
        });
        it('with query as Query instance for freeText fuzzy operator', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let query = new Contensis.Query(Contensis.Op.freeText('authorLocation', 'term1', true, FreeTextSearchOperatorType_1.FreeTextSearchOperatorTypeEnum.Or));
            query.orderBy = Contensis.OrderBy.asc('authorName');
            query.pageIndex = 1;
            query.pageSize = 50;
            let entries = await client.entries.search(query);
            let expectedQueryString = contensis_core_api_1.toQuery({
                pageIndex: 1,
                pageSize: 50,
                orderBy: JSON.stringify([{
                        asc: 'authorName'
                    }]),
                where: JSON.stringify([{
                        field: 'authorLocation',
                        freeText: {
                            term: 'term1',
                            fuzzy: true,
                            operator: FreeTextSearchOperatorType_1.FreeTextSearchOperatorTypeEnum.Or
                        }
                    }])
            });
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/projects/myProject/entries/search${expectedQueryString}`,
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(entries).not.toBeNull();
            expect(entries.items.length).toEqual(2);
            expect(entries.items[1].title).toEqual('entry2');
        });
        it('with query as a ZenqlQuery instance ', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let zenqlQuery = new Contensis.ZenqlQuery('sys.version.modified > -30d');
            zenqlQuery.pageIndex = 1;
            zenqlQuery.pageSize = 50;
            let entries = await client.entries.search(zenqlQuery);
            let expectedQueryString = contensis_core_api_1.toQuery({
                pageIndex: 1,
                pageSize: 50,
                zenql: zenqlQuery.zenql
            });
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/projects/myProject/entries${expectedQueryString}`,
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(entries).not.toBeNull();
            expect(entries.items.length).toEqual(2);
            expect(entries.items[1].title).toEqual('entry2');
        });
        it('with query as a ZenqlQuery instance with all options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let zenqlQuery = new Contensis.ZenqlQuery('sys.version.modified > -30d');
            zenqlQuery.pageIndex = 1;
            zenqlQuery.pageSize = 50;
            zenqlQuery.includeArchived = true;
            zenqlQuery.includeDeleted = true;
            let entries = await client.entries.search(zenqlQuery);
            let expectedQueryString = contensis_core_api_1.toQuery({
                pageIndex: 1,
                pageSize: 50,
                zenql: zenqlQuery.zenql,
                includeArchived: true,
                includeDeleted: true
            });
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/projects/myProject/entries${expectedQueryString}`,
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(entries).not.toBeNull();
            expect(entries.items.length).toEqual(2);
            expect(entries.items[1].title).toEqual('entry2');
        });
        it('with query as a ZenqlQuery string ', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let zenqlQueryString = 'sys.version.modified > -30d';
            let entries = await client.entries.search(zenqlQueryString);
            let expectedQueryString = contensis_core_api_1.toQuery({
                pageIndex: 0,
                pageSize: 20,
                zenql: zenqlQueryString
            });
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/projects/myProject/entries${expectedQueryString}`,
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(entries).not.toBeNull();
            expect(entries.items.length).toEqual(2);
            expect(entries.items[1].title).toEqual('entry2');
        });
    });
    describe('Search entries in IE browser', () => {
        beforeEach(() => {
            specs_utils_spec_1.setDefaultSpy(global, {
                pageIndex: 0,
                pageSize: 25,
                totalCount: 2,
                items: [{
                        title: 'entry1'
                    },
                    {
                        title: 'entry2'
                    }
                ]
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
            global.document.documentMode = 11;
        });
        it('with query as Object and url length = 2083', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let orderBy = [{
                    asc: 'authorName'
                }];
            // use string with length = 1863
            let where = [{
                    field: 'authorName',
                    // tslint:disable-next-line:max-line-length
                    startsWith: 'n123XX8OFpCGJg0OJXfKRRoOk69tWiEfnqi2y5eElXQP1ZjTo0MsozSnWSJqdAvXefl0wmmELbyRArciCS4heXVw9XvYGqKsHM0X4eOxWpP8Otz8OoRApVGiPWeL6nzxblSDcP58qh8wkgUGWPHg21WGrgduYXpvFDdKnAwF1z6YKBMv7sOaVTHowp6mpzndOqUn6caURbF3Ob4ybumG1vl8BEvfwRjpjpAuULobQLN9pt31BoosToBWLdvrkDhSeNPLzltvMIBVGOVn97zWvdsuAg4wxznEz8rLvLK48hLdN4BJ3eWYkfhfk8TbUkDt82ZQwXCmdTpqP6ODPKRc4qkglAabHjUBwOzz9QCwxp7xeupfPWgDQlHCYHsKQ5X7xsWa5hl7RWpQXoajFhZoHomyvJxN9Q3kTccqeiVjzWN6BitsqCN8Kp4NJE7qFOzXSFn01NUv1Yqb8LpoxZ0lMcy1aWtOtdOtnjBLncS6iFR4IVuogl2Z8eJ7aDCdubM7OODjwtQqUSqnZGmsraC8WTxsmXDLIsTz4w2paulihOl2jaxtIRCO4TKGUX9m5MOHa1YPqJYQ8ettJj120uek2fk8bMAg9ykT0TDsmfzy33yfc6rz0nuBK40FGLJefNsYF7iTbLS5QAKiErSlRmTTCtGNK8pVxDpbNOoovXS4KcpSGmVxSotUvhBKDHuQy5ise8RQgCKyD67Z8FiAboqgo0nUe7nNNdL6Gmwesa5JISPVxkcgcWddYvX28TsjE5aLGZX7B8luxlQpRZ0xXBhkyCVobWPTu1W2ZltbpxcK8tdkrYaOGZXpGOTfeXChw11eccepN3MsJDBaghvfeSUgu6sEcpwy3kORPIYxhVaC1UI4r6xRRu8aXMDDTQQW7JhPIXKfQgoEbjxSVp9nHMCQDZpqBK0Z8bejfjnavlTS90ZNVPuDrqL0XEWcbg6d5ARJUl6VWWLJzktH5Jp1WuQoPrl5lb0mXm5bhW61EXK2LLmGPCafkksGsDjSqOOgD5eIttQvwuA1b9Czbs7Zzlub3sbHJ00e0hsoZwx2cJVWbP5PBRDwGtcj25fnY0s8FcSO59669R7gShdTR5jfWtk5VKKnTimosZ4bRscGL8if1Wx0Mvapbl3AubcOJm03HngzgHgjLUpM1UrPAyCn8kxwdx6ROw9e02ssMgAkoh9B9mecXFgl9TqxlG5jSbXQtvNiLWzSUnqeugCXcl2O6fhpnKCNpIW6PoAI1mbwBK5qxumQMKqKix964TOiCWfWUNnOBkcXVPVzzqPA1yLNn87KgVuODm9VpZnnoHSbnAzeLGb7vTZb1ITOP8MNnAPWrvlqvypjMtkLLtZg2r7nGEHLMD76ELxzKC3Zg269m3EW47wPKam9HuWMGjqnD0BghH5zlnRRxHVNgg5JZI5URcgGa6LfXh4zymO2xqSql1YAltvO7lHaIEnF2edze6KvEFJj1smsn57AWsEqs85zYg6MxkctOcQ0lxqv6s9y7Z7pcWbU0k8pmccUm3EDUideWwDnoftuUwIGVfnJrpZn7ihhVzEOB8ojbuGrO41mHZNa8tSlXz6cfg2LXRrRgWRFBMdkswg73HmVaDuvbF2LkwFjoPweHuh62uQb88gOg2Hbbip9212Mnx9gzed81bIRS5yvODYk50LJ7o9zkv3WPGIekAnMJgDVCBsekNxnR3XR0jMCLZx4t73Hm93vb7T8uzyylrbJz2BWyk1EpZ22uynFyIitDpAYHe483oeYwhfKfJPdKjaYsYZAM1ZKdfwK5o0vaRW3X5nlLHfe4QWcMZOAhCq8GVbQkUFcdPSqeZ2nOuPUzwAGGONpIBXm7FOITI9WPibTjCL'
                }];
            let query = {
                pageIndex: 1,
                pageSize: 50,
                orderBy,
                where
            };
            let entries = await client.entries.search(query);
            let expectedQueryString = contensis_core_api_1.toQuery(Object.assign({}, query, { orderBy: JSON.stringify(orderBy), where: JSON.stringify(where) }));
            let url = `http://my-website.com/api/management/projects/myProject/entries/search${expectedQueryString}`;
            expect(url.length).toEqual(2083);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                url,
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(entries).not.toBeNull();
            expect(entries.items.length).toEqual(2);
            expect(entries.items[1].title).toEqual('entry2');
        });
        it('with query as Object and url length > 2083', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let orderBy = [{
                    asc: 'authorName'
                }];
            // use string with length = 1864
            let where = [{
                    field: 'authorName',
                    // tslint:disable-next-line:max-line-length
                    startsWith: 'n1234XX8OFpCGJg0OJXfKRRoOk69tWiEfnqi2y5eElXQP1ZjTo0MsozSnWSJqdAvXefl0wmmELbyRArciCS4heXVw9XvYGqKsHM0X4eOxWpP8Otz8OoRApVGiPWeL6nzxblSDcP58qh8wkgUGWPHg21WGrgduYXpvFDdKnAwF1z6YKBMv7sOaVTHowp6mpzndOqUn6caURbF3Ob4ybumG1vl8BEvfwRjpjpAuULobQLN9pt31BoosToBWLdvrkDhSeNPLzltvMIBVGOVn97zWvdsuAg4wxznEz8rLvLK48hLdN4BJ3eWYkfhfk8TbUkDt82ZQwXCmdTpqP6ODPKRc4qkglAabHjUBwOzz9QCwxp7xeupfPWgDQlHCYHsKQ5X7xsWa5hl7RWpQXoajFhZoHomyvJxN9Q3kTccqeiVjzWN6BitsqCN8Kp4NJE7qFOzXSFn01NUv1Yqb8LpoxZ0lMcy1aWtOtdOtnjBLncS6iFR4IVuogl2Z8eJ7aDCdubM7OODjwtQqUSqnZGmsraC8WTxsmXDLIsTz4w2paulihOl2jaxtIRCO4TKGUX9m5MOHa1YPqJYQ8ettJj120uek2fk8bMAg9ykT0TDsmfzy33yfc6rz0nuBK40FGLJefNsYF7iTbLS5QAKiErSlRmTTCtGNK8pVxDpbNOoovXS4KcpSGmVxSotUvhBKDHuQy5ise8RQgCKyD67Z8FiAboqgo0nUe7nNNdL6Gmwesa5JISPVxkcgcWddYvX28TsjE5aLGZX7B8luxlQpRZ0xXBhkyCVobWPTu1W2ZltbpxcK8tdkrYaOGZXpGOTfeXChw11eccepN3MsJDBaghvfeSUgu6sEcpwy3kORPIYxhVaC1UI4r6xRRu8aXMDDTQQW7JhPIXKfQgoEbjxSVp9nHMCQDZpqBK0Z8bejfjnavlTS90ZNVPuDrqL0XEWcbg6d5ARJUl6VWWLJzktH5Jp1WuQoPrl5lb0mXm5bhW61EXK2LLmGPCafkksGsDjSqOOgD5eIttQvwuA1b9Czbs7Zzlub3sbHJ00e0hsoZwx2cJVWbP5PBRDwGtcj25fnY0s8FcSO59669R7gShdTR5jfWtk5VKKnTimosZ4bRscGL8if1Wx0Mvapbl3AubcOJm03HngzgHgjLUpM1UrPAyCn8kxwdx6ROw9e02ssMgAkoh9B9mecXFgl9TqxlG5jSbXQtvNiLWzSUnqeugCXcl2O6fhpnKCNpIW6PoAI1mbwBK5qxumQMKqKix964TOiCWfWUNnOBkcXVPVzzqPA1yLNn87KgVuODm9VpZnnoHSbnAzeLGb7vTZb1ITOP8MNnAPWrvlqvypjMtkLLtZg2r7nGEHLMD76ELxzKC3Zg269m3EW47wPKam9HuWMGjqnD0BghH5zlnRRxHVNgg5JZI5URcgGa6LfXh4zymO2xqSql1YAltvO7lHaIEnF2edze6KvEFJj1smsn57AWsEqs85zYg6MxkctOcQ0lxqv6s9y7Z7pcWbU0k8pmccUm3EDUideWwDnoftuUwIGVfnJrpZn7ihhVzEOB8ojbuGrO41mHZNa8tSlXz6cfg2LXRrRgWRFBMdkswg73HmVaDuvbF2LkwFjoPweHuh62uQb88gOg2Hbbip9212Mnx9gzed81bIRS5yvODYk50LJ7o9zkv3WPGIekAnMJgDVCBsekNxnR3XR0jMCLZx4t73Hm93vb7T8uzyylrbJz2BWyk1EpZ22uynFyIitDpAYHe483oeYwhfKfJPdKjaYsYZAM1ZKdfwK5o0vaRW3X5nlLHfe4QWcMZOAhCq8GVbQkUFcdPSqeZ2nOuPUzwAGGONpIBXm7FOITI9WPibTjCL'
                }];
            let query = {
                pageIndex: 1,
                pageSize: 50,
                orderBy,
                where
            };
            let entries = await client.entries.search(query);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/projects/myProject/entries/search`,
                specs_utils_spec_1.getDefaultFetchRequest('POST', false, JSON.stringify(query))
            ]);
            expect(entries).not.toBeNull();
            expect(entries.items.length).toEqual(2);
            expect(entries.items[1].title).toEqual('entry2');
        });
        it('with query as Query instance and url length = 2083', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            // use string with length = 1863
            // tslint:disable-next-line:max-line-length
            const startsWithText = 'n123XX8OFpCGJg0OJXfKRRoOk69tWiEfnqi2y5eElXQP1ZjTo0MsozSnWSJqdAvXefl0wmmELbyRArciCS4heXVw9XvYGqKsHM0X4eOxWpP8Otz8OoRApVGiPWeL6nzxblSDcP58qh8wkgUGWPHg21WGrgduYXpvFDdKnAwF1z6YKBMv7sOaVTHowp6mpzndOqUn6caURbF3Ob4ybumG1vl8BEvfwRjpjpAuULobQLN9pt31BoosToBWLdvrkDhSeNPLzltvMIBVGOVn97zWvdsuAg4wxznEz8rLvLK48hLdN4BJ3eWYkfhfk8TbUkDt82ZQwXCmdTpqP6ODPKRc4qkglAabHjUBwOzz9QCwxp7xeupfPWgDQlHCYHsKQ5X7xsWa5hl7RWpQXoajFhZoHomyvJxN9Q3kTccqeiVjzWN6BitsqCN8Kp4NJE7qFOzXSFn01NUv1Yqb8LpoxZ0lMcy1aWtOtdOtnjBLncS6iFR4IVuogl2Z8eJ7aDCdubM7OODjwtQqUSqnZGmsraC8WTxsmXDLIsTz4w2paulihOl2jaxtIRCO4TKGUX9m5MOHa1YPqJYQ8ettJj120uek2fk8bMAg9ykT0TDsmfzy33yfc6rz0nuBK40FGLJefNsYF7iTbLS5QAKiErSlRmTTCtGNK8pVxDpbNOoovXS4KcpSGmVxSotUvhBKDHuQy5ise8RQgCKyD67Z8FiAboqgo0nUe7nNNdL6Gmwesa5JISPVxkcgcWddYvX28TsjE5aLGZX7B8luxlQpRZ0xXBhkyCVobWPTu1W2ZltbpxcK8tdkrYaOGZXpGOTfeXChw11eccepN3MsJDBaghvfeSUgu6sEcpwy3kORPIYxhVaC1UI4r6xRRu8aXMDDTQQW7JhPIXKfQgoEbjxSVp9nHMCQDZpqBK0Z8bejfjnavlTS90ZNVPuDrqL0XEWcbg6d5ARJUl6VWWLJzktH5Jp1WuQoPrl5lb0mXm5bhW61EXK2LLmGPCafkksGsDjSqOOgD5eIttQvwuA1b9Czbs7Zzlub3sbHJ00e0hsoZwx2cJVWbP5PBRDwGtcj25fnY0s8FcSO59669R7gShdTR5jfWtk5VKKnTimosZ4bRscGL8if1Wx0Mvapbl3AubcOJm03HngzgHgjLUpM1UrPAyCn8kxwdx6ROw9e02ssMgAkoh9B9mecXFgl9TqxlG5jSbXQtvNiLWzSUnqeugCXcl2O6fhpnKCNpIW6PoAI1mbwBK5qxumQMKqKix964TOiCWfWUNnOBkcXVPVzzqPA1yLNn87KgVuODm9VpZnnoHSbnAzeLGb7vTZb1ITOP8MNnAPWrvlqvypjMtkLLtZg2r7nGEHLMD76ELxzKC3Zg269m3EW47wPKam9HuWMGjqnD0BghH5zlnRRxHVNgg5JZI5URcgGa6LfXh4zymO2xqSql1YAltvO7lHaIEnF2edze6KvEFJj1smsn57AWsEqs85zYg6MxkctOcQ0lxqv6s9y7Z7pcWbU0k8pmccUm3EDUideWwDnoftuUwIGVfnJrpZn7ihhVzEOB8ojbuGrO41mHZNa8tSlXz6cfg2LXRrRgWRFBMdkswg73HmVaDuvbF2LkwFjoPweHuh62uQb88gOg2Hbbip9212Mnx9gzed81bIRS5yvODYk50LJ7o9zkv3WPGIekAnMJgDVCBsekNxnR3XR0jMCLZx4t73Hm93vb7T8uzyylrbJz2BWyk1EpZ22uynFyIitDpAYHe483oeYwhfKfJPdKjaYsYZAM1ZKdfwK5o0vaRW3X5nlLHfe4QWcMZOAhCq8GVbQkUFcdPSqeZ2nOuPUzwAGGONpIBXm7FOITI9WPibTjCL';
            let query = new Contensis.Query(Contensis.Op.startsWith('authorName', startsWithText));
            query.orderBy = Contensis.OrderBy.asc('authorName');
            query.pageIndex = 1;
            query.pageSize = 50;
            let entries = await client.entries.search(query);
            let expectedQueryString = contensis_core_api_1.toQuery({
                pageIndex: 1,
                pageSize: 50,
                orderBy: JSON.stringify([{
                        asc: 'authorName'
                    }]),
                where: JSON.stringify([{
                        field: 'authorName',
                        startsWith: startsWithText
                    }])
            });
            let url = `http://my-website.com/api/management/projects/myProject/entries/search${expectedQueryString}`;
            expect(url.length).toEqual(2083);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                url,
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(entries).not.toBeNull();
            expect(entries.items.length).toEqual(2);
            expect(entries.items[1].title).toEqual('entry2');
        });
        it('with query as Query instance and url length > 2083', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            // use string with length = 1864
            // tslint:disable-next-line:max-line-length
            const startsWithText = 'n1234XX8OFpCGJg0OJXfKRRoOk69tWiEfnqi2y5eElXQP1ZjTo0MsozSnWSJqdAvXefl0wmmELbyRArciCS4heXVw9XvYGqKsHM0X4eOxWpP8Otz8OoRApVGiPWeL6nzxblSDcP58qh8wkgUGWPHg21WGrgduYXpvFDdKnAwF1z6YKBMv7sOaVTHowp6mpzndOqUn6caURbF3Ob4ybumG1vl8BEvfwRjpjpAuULobQLN9pt31BoosToBWLdvrkDhSeNPLzltvMIBVGOVn97zWvdsuAg4wxznEz8rLvLK48hLdN4BJ3eWYkfhfk8TbUkDt82ZQwXCmdTpqP6ODPKRc4qkglAabHjUBwOzz9QCwxp7xeupfPWgDQlHCYHsKQ5X7xsWa5hl7RWpQXoajFhZoHomyvJxN9Q3kTccqeiVjzWN6BitsqCN8Kp4NJE7qFOzXSFn01NUv1Yqb8LpoxZ0lMcy1aWtOtdOtnjBLncS6iFR4IVuogl2Z8eJ7aDCdubM7OODjwtQqUSqnZGmsraC8WTxsmXDLIsTz4w2paulihOl2jaxtIRCO4TKGUX9m5MOHa1YPqJYQ8ettJj120uek2fk8bMAg9ykT0TDsmfzy33yfc6rz0nuBK40FGLJefNsYF7iTbLS5QAKiErSlRmTTCtGNK8pVxDpbNOoovXS4KcpSGmVxSotUvhBKDHuQy5ise8RQgCKyD67Z8FiAboqgo0nUe7nNNdL6Gmwesa5JISPVxkcgcWddYvX28TsjE5aLGZX7B8luxlQpRZ0xXBhkyCVobWPTu1W2ZltbpxcK8tdkrYaOGZXpGOTfeXChw11eccepN3MsJDBaghvfeSUgu6sEcpwy3kORPIYxhVaC1UI4r6xRRu8aXMDDTQQW7JhPIXKfQgoEbjxSVp9nHMCQDZpqBK0Z8bejfjnavlTS90ZNVPuDrqL0XEWcbg6d5ARJUl6VWWLJzktH5Jp1WuQoPrl5lb0mXm5bhW61EXK2LLmGPCafkksGsDjSqOOgD5eIttQvwuA1b9Czbs7Zzlub3sbHJ00e0hsoZwx2cJVWbP5PBRDwGtcj25fnY0s8FcSO59669R7gShdTR5jfWtk5VKKnTimosZ4bRscGL8if1Wx0Mvapbl3AubcOJm03HngzgHgjLUpM1UrPAyCn8kxwdx6ROw9e02ssMgAkoh9B9mecXFgl9TqxlG5jSbXQtvNiLWzSUnqeugCXcl2O6fhpnKCNpIW6PoAI1mbwBK5qxumQMKqKix964TOiCWfWUNnOBkcXVPVzzqPA1yLNn87KgVuODm9VpZnnoHSbnAzeLGb7vTZb1ITOP8MNnAPWrvlqvypjMtkLLtZg2r7nGEHLMD76ELxzKC3Zg269m3EW47wPKam9HuWMGjqnD0BghH5zlnRRxHVNgg5JZI5URcgGa6LfXh4zymO2xqSql1YAltvO7lHaIEnF2edze6KvEFJj1smsn57AWsEqs85zYg6MxkctOcQ0lxqv6s9y7Z7pcWbU0k8pmccUm3EDUideWwDnoftuUwIGVfnJrpZn7ihhVzEOB8ojbuGrO41mHZNa8tSlXz6cfg2LXRrRgWRFBMdkswg73HmVaDuvbF2LkwFjoPweHuh62uQb88gOg2Hbbip9212Mnx9gzed81bIRS5yvODYk50LJ7o9zkv3WPGIekAnMJgDVCBsekNxnR3XR0jMCLZx4t73Hm93vb7T8uzyylrbJz2BWyk1EpZ22uynFyIitDpAYHe483oeYwhfKfJPdKjaYsYZAM1ZKdfwK5o0vaRW3X5nlLHfe4QWcMZOAhCq8GVbQkUFcdPSqeZ2nOuPUzwAGGONpIBXm7FOITI9WPibTjCL';
            let query = new Contensis.Query(Contensis.Op.startsWith('authorName', startsWithText));
            query.orderBy = Contensis.OrderBy.asc('authorName');
            query.pageIndex = 1;
            query.pageSize = 50;
            let entries = await client.entries.search(query);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/projects/myProject/entries/search`,
                specs_utils_spec_1.getDefaultFetchRequest('POST', false, JSON.stringify(query))
            ]);
            expect(entries).not.toBeNull();
            expect(entries.items.length).toEqual(2);
            expect(entries.items[1].title).toEqual('entry2');
        });
    });
});
