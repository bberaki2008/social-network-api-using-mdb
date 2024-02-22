const { Schema, Types } = require('mongoose');

// Schema to create reaction
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      maxLength: 280,
      required: true,
    }, 
    username:{
        type: String,
        required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },

  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Use a getter method to format the timestamp on query
//  function createdAt (val) {
//   if (!val) return val;
//   return (val.getMonth() + 1) + "/" + val.getDate() + "/" + val.getFullYear();
// }

module.exports = reactionSchema;

