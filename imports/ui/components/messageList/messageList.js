import {Template} from "meteor/templating";
import {Messages} from "../../../api/messages/messages.js";
import {MessagesFilter} from "../../../api/messages/filters";
import "./messageList.html";

Template.messageList.helpers({

    messages () {
        return Messages.find({}, MessagesFilter.common());
    }

});