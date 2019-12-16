const users = [];

const addUser = (user) => {
    name = user.name.trim().toLowerCase();
    room = user.room.trim().toLowerCase();

    const userExist = users.find(usr => usr.name === name && usr.room === room );

    if(userExist){
        return {error: 'User already exists !!', user:null};
    }

    users.push(user);

    return {error: null, user};
}

const removeUser = id => {
    let index = users.findIndex(user => user.id === id);

    if (index !== -1 ){
        return users.splice(index, 1)[0];
    }
}

const getUser = id => users.find(user => user.id === id);

const getUserInRoom = room => users.filter( user => user.room == room);

module.exports = {addUser, removeUser, getUser, getUserInRoom};