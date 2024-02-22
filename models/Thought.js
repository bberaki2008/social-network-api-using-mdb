const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      minLength: 1,
      maxLength: 280,
      required: true,
    },   //use a getter method to format the timestamp
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // Use a getter method to format the timestamp on query
//  function createdAt (val) {
//   if (!val) return val;
//   return (val.getMonth() + 1) + "/" + val.getDate() + "/" + val.getFullYear();
// }
    username: {
      type:String,
      required: true,
    },
    reactions: [Reaction], 
  },
  {
    toJSON: {
      virtuals: true, //check
      getters: true, //check
    },
    id: false,
  }
);

// Create a virtual property `reactionCount` that gets the amount of reactions per thought
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
