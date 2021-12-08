const mongoose = require("mongoose");

const circlesSchema = new mongoose.Schema({
    projects_id: {
        type: Number,
        // required: true
        // required: ()=> {
        //     if(!this.projects_id)
        //     return;
        // },
    },
    circles_id: {
        type: String
    },
    feedback: {
        type: String,
        // required: ()=> {
        //     if(!this.feedback)
        //     return;
        // },
    },
    date: {
        type: String,
    },
    circleIdx: {
        type: Number
    }
});

module.exports = mongoose.model("circles", circlesSchema);
