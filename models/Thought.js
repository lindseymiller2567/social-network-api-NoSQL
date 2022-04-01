const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: 'Must enter a thought.',
        trim: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
        // add getter method to format date 
    },
    username: {
        type: String,
        required: 'Must enter a username'
    },
    // reactions: [reactionSchema]
},
    {
        toJSON: {
            virtuals: true,
            // getters: true
        },
        id: false
    }
);

// get total reaction count
// thoughtSchema.virtual('reactionCount').get(function () {
//     return this.reactions.length;
// })

// create the Thought model using the thoughtSchema
const Thought = model('Thought', thoughtSchema);

// export the Thought model
module.exports = Thought;