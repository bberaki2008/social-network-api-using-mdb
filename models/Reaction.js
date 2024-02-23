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

reactionSchema.virtual('formatedDate').get(function(){
  if (!this.createdAt) return this.createdAt;
  return (this.createdAt.getMonth() + 1) + "/" + this.createdAt.getDate() + "/" + this.createdAt.getFullYear();

})


module.exports = reactionSchema;

