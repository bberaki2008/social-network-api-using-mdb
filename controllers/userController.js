const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user and associated apps
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User and associated apps deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

   //Update user
   updateUser(req, res){
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

    // Add a Friend
 addFriend(req, res) {
    User.create(req.body)
      .then((user) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { friends: user._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'friend created, but found no user with that ID',
            })
          : res.json({message: 'Created friend 🎉'})
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
    // Remove friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.friendId },
      { $pull: { friends: req.params.friendId} },
      { runValidators: true, new: true }
    )
      .then((friend) =>
        !friend
          ? res.status(404).json({ message: 'No friend with this id!' })
          : res.json(friend)
      )
      .catch((err) => res.status(500).json(err));
  },
};


