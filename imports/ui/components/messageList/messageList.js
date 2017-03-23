import {Template} from "meteor/templating";
import {Messages} from "../../../api/messages/messages.js";
import {commonFilter as messagesFilter} from "../../../api/messages/filters";
import "./messageList.html";

Template.messageList.helpers({

    messages () {
        return Messages.find({}, messagesFilter);
    }

});