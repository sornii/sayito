import {Meteor} from "meteor/meteor";
import {Threads} from "../threads";

Meteor.publish('threads', function ({name, password}) {
    return Threads.find({name, password});
});