import { ContensisClient, Group, GroupListOptions, IGroupOperations, User } from '../models';
import { IHttpClient, PagedList, UrlBuilder, MapperFn, ClientParams } from 'contensis-core-api';

let listMappers: { [key: string]: MapperFn } = {
    pageIndex: (value: number, options: GroupListOptions, params: ClientParams) => (options && options.pageOptions && options.pageOptions.pageIndex) || (params.pageIndex),
    pageSize: (value: number, options: GroupListOptions, params: ClientParams) => (options && options.pageOptions && options.pageOptions.pageSize) || (params.pageSize),
    order: (value: string[]) => (value && value.length > 0) ? value : null,
};

export class GroupOperations implements IGroupOperations {

    constructor(private httpClient: IHttpClient, private contensisClient: ContensisClient) {
        if (!this.httpClient || !this.contensisClient) {
            throw new Error('The class GroupOperations was not initialised correctly.');
        }
    }

    getById(groupId: string): Promise<Group> {
        if (!groupId) {
            throw new Error('A valid group id value needs to be specified.');
        }

        return this.getGroup(groupId);
    }

    getByName(groupName: string): Promise<Group> {
        if (!groupName) {
            throw new Error('A valid group name value needs to be specified.');
        }

        return this.getGroup(groupName);
    }

    list(options?: GroupListOptions): Promise<PagedList<Group>> {
        let url = UrlBuilder.create('/api/management/security/groups',
            !options ? {} : { q: null, pageIndex: null, pageSize: null, order: null })
            .addOptions(options)
            .setParams(this.contensisClient.getParams())
            .addMappers(listMappers)
            .toUrl();

        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request<PagedList<Group>>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }

    create(group: Group): Promise<Group> {
        if (!group) {
            throw new Error('A valid group needs to be specified.');
        }

        let url = UrlBuilder.create('/api/management/security/groups',
            {})
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request<Group>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'POST',
                body: JSON.stringify(group)
            });
        });
    }

    update(group: Group): Promise<Group> {
        if (!group) {
            throw new Error('A valid group needs to be specified.');
        }

        if (!group.id) {
            throw new Error('A valid group id value needs to be specified.');
        }

        let url = UrlBuilder.create('/api/management/security/groups/:id',
            {})
            .addOptions(group.id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request<Group>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'PUT',
                body: JSON.stringify(group)
            });
        });
    }

    delete(id: string): Promise<void> {
        if (!id) {
            throw new Error('A valid id needs to be specified.');
        }

        let url = UrlBuilder.create('/api/management/security/groups/:id',
            {})
            .addOptions(id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request<void>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'DELETE'
            });
        });
    }

    addUser(groupId: string, userId: string): Promise<void> {
        if (!groupId) {
            throw new Error('A valid group id needs to be specified.');
        }

        if (!userId) {
            throw new Error('A valid user id needs to be specified.');
        }

        let url = UrlBuilder.create('/api/management/security/groups/:groupId/users/:userId',
            {})
            .addOptions(groupId, 'groupId')
            .addOptions(userId, 'userId')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request<void>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'PUT'
            });
        });
    }

    removeUser(groupId: string, userId: string): Promise<void> {
        if (!groupId) {
            throw new Error('A valid group id needs to be specified.');
        }

        if (!userId) {
            throw new Error('A valid user id needs to be specified.');
        }

        let url = UrlBuilder.create('/api/management/security/groups/:groupId/users/:userId',
            {})
            .addOptions(groupId, 'groupId')
            .addOptions(userId, 'userId')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request<void>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'DELETE'
            });
        });
    }

    hasUser(groupId: string, userId: string): Promise<boolean> {
        if (!groupId) {
            throw new Error('A valid group id needs to be specified.');
        }

        if (!userId) {
            throw new Error('A valid users id needs to be specified.');
        }

        let url = UrlBuilder.create('/api/management/security/groups/:groupId/users/:userId',
            {})
            .addOptions(groupId, 'groupId')
            .addOptions(userId, 'userId')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request<void>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'HEAD'
            }).then(() => true, () => false);
        });
    }

    addChildGroup(groupId: string, childGroupId: string): Promise<void> {
        if (!groupId) {
            throw new Error('A valid group id needs to be specified.');
        }

        if (!childGroupId) {
            throw new Error('A valid child group id needs to be specified.');
        }

        let url = UrlBuilder.create('/api/management/security/groups/:groupId/childGroups/:childGroupId',
            {})
            .addOptions(groupId, 'groupId')
            .addOptions(childGroupId, 'childGroupId')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request<void>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'PUT'
            });
        });
    }

    removeChildGroup(groupId: string, childGroupId: string): Promise<void> {
        if (!groupId) {
            throw new Error('A valid group id needs to be specified.');
        }

        if (!childGroupId) {
            throw new Error('A valid child group id needs to be specified.');
        }

        let url = UrlBuilder.create('/api/management/security/groups/:groupId/childGroups/:childGroupId',
            {})
            .addOptions(groupId, 'groupId')
            .addOptions(childGroupId, 'childGroupId')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request<void>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'DELETE'
            });
        });
    }

    getUsersByGroupId(groupId: string): Promise<PagedList<User>> {
        if (!groupId) {
            throw new Error('A valid group id value needs to be specified.');
        }

        return this.getUsersInGroup(groupId);
    }
    getUsersByGroupName(groupName: string): Promise<PagedList<User>> {
        if (!groupName) {
            throw new Error('A valid group name value needs to be specified.');
        }

        return this.getUsersInGroup(groupName);
    }

    getChildGroupsByGroupId(groupId: string): Promise<PagedList<Group>> {
        if (!groupId) {
            throw new Error('A valid group id value needs to be specified.');
        }

        return this.getChildGroups(groupId);
    }
    getChildGroupsByGroupName(groupName: string): Promise<PagedList<Group>> {
        if (!groupName) {
            throw new Error('A valid group name value needs to be specified.');
        }

        return this.getChildGroups(groupName);
    }

    private getGroup(idOrName: string) {
        let url = UrlBuilder.create('/api/management/security/groups/:idOrName', {})
            .addOptions(idOrName, 'idOrName')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request<Group>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }

    private getUsersInGroup(idOrName: string) {
        let url = UrlBuilder.create('/api/management/security/groups/:idOrName/users', {})
            .addOptions(idOrName, 'idOrName')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request<PagedList<User>>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }

    private getChildGroups(idOrName: string) {
        let url = UrlBuilder.create('/api/management/security/groups/:idOrName/groups', {})
            .addOptions(idOrName, 'idOrName')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request<PagedList<Group>>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
}