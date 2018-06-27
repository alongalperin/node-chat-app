const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
    let users;

    beforeEach(() => {

        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Jen',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Berg',
            room: 'Node Course'
        }]

    });

    it('should add new user', () => {
        let users = new Users();
        let user = {
            id: '123',
            name: 'Andrew',
            room: 'the office fans'
        }
        let resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should return users for Node course', () => {
        let userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Mike', 'Berg']);
    });

    it('should return users for React course', () => {
        let userList = users.getUserList('React Course');

        expect(userList).toEqual(['Jen']);
    });

    it('should remove a user', () => {
        let userId = '2';
        let removedUser = users.removeUser(userId);

        expect(removedUser.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        // id that is not a part of the users array
        let removedUser = users.removeUser('666');

        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        let userId = '2';
        let user = users.getUser('2');

        expect(user.id).toBe(userId);
    });

    it('should NOT find user', () => {
        let userId = 666;
        let user = users.getUser(userId);

        expect(user).toNotExist();    
    });

});