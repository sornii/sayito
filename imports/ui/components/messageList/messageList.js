import {Template} from "meteor/templating";
import {Messages} from "../../../api/messages/messages.js";

import "./messageList.html";

Template.messageList.helpers({

    messages () {
        return Messages.find({}, {sort: {createdAt: -1}});
    }

});