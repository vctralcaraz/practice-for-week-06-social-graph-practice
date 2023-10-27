// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    // Your code here

    this.currentID++;  // adjust currentID

    // create a user object and add to this.users as an ID key
    let user = { "id": this.currentID, "name": name};
    this.users[this.currentID] = user;

    // create following object and add to this.follows as an ID key
    let following = new Set();
    this.follows[this.currentID] = following;

    return user.id;  // return user id
  }

  getUser(userID) {
    // Your code here

    // if the user exists, return the user object
    if(this.users[userID]) return this.users[userID];

    // if the user does not exist, return null
    return null;
  }

  follow(userID1, userID2) {
    // Your code here

    // if both userIDs exits, we can move on to the next step
    if(this.users[userID1] && this.users[userID2]) {
      if(!this.follows[userID1].has(userID2)) {  // if user 1 does not already follow user 2
        this.follows[userID1].add(userID2);  // add user 2 to the list of follows by user 1
        return true;  // return true as in complete
      }

      return false;
    }

    return false;
  }

  getFollows(userID) {
    // Your code here

    return this.follows[userID];
  }

  getFollowers(userID) {
    // Your code here

    let followers = new Set();  // initialize a new set

    for(let id in this.follows) {  // for all keys in this.follows
      if(this.follows[id].has(userID)) followers.add(Number(id));  // if they are following, add to new set
    }

    return followers;  // return the followers set
  }

  getRecommendedFollows(userID, degrees) {
    // Your code here

    // create a queue and enqueue a path to the starting node
    const queue = [[userID]];

    // creat a set to store visited nodes
    const visited = new Set([userID]);

    const friends = [];

    // while the queue is not empty
    while(queue.length > 0) {
      // dequeue firth path
      let currentPath = queue.shift();

      // grab teh last node of the path
      let lastNode = currentPath[currentPath.length - 1];

      if(2 < currentPath.length && currentPath.length - 2 <= degrees) {
        friends.push(lastNode);
      }

      let neighbors = this._getNeighbors(lastNode)

      neighbors.forEach(el => {
        if(!visited.has(el)) {
          visited.add(el);
          queue.push(currentPath.concat(el));
        }
      });
    }
    
    return friends;
  }

  _getNeighbors(node) {
    return this.follows[node];
  }
}

module.exports = SocialNetwork;