import {Template} from "meteor/templating";
import "./messageText.js";
import "./messageThumbsup.js";
import "./message.html";

Template.message.helpers({
    renderLink() {
        return true;
    }
});