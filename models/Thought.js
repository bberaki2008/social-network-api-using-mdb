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

    username: {
      type:String,
      required: true,
    },
    reactions: [Reaction], 
  },
  {
    toJSON: {
      virtuals: true, 
      getters: true, 
    },
    id: false,
  }
);

// Create a virtual property `reactionCount` that gets the amount of reactions per thought
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

thoughtSchema.virtual('formatedDate').get(function(){
  if (!this.createdAt) return this.createdAt;
  return (this.createdAt.getMonth() + 1) + "/" + this.createdAt.getDate() + "/" + this.createdAt.getFullYear();

})

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
