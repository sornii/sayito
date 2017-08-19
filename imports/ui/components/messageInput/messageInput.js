import {Template} from "meteor/templating";

import {TrendingTags} from "../../../api/trendingTags/trendingTags.js";
import {TrendingTagsFilter} from "../../../api/trendingTags/filters.js";
import {insert as messageInsert} from "../../../api/messages/methods.js";

import _ from "underscore";
import $ from "jquery";

import "./messageInput.html";

Template.messageInput.onCreated(function messageInputOnCreated() {
    this.autorun(() => {
        this.subscribe('ranking', this.data.inputThreadParams);
    });
});

Template.messageInput.onRendered(function messageInputOnRendered() {
    $(document).ready(() => {
        $('.ui.dropdown').dropdown();
    });
});

Template.messageInput.helpers({
    ranking() {
        return TrendingTags.find({}, TrendingTagsFilter.common());
    }
});

Template.messageInput.events({

    'submit .sayito.form' (event) {
        const instance = Template.instance();
        event.preventDefault();

        const $sayitoForm = $(".sayito-input");
        const text = $sayitoForm.val();
        $sayitoForm.val("");

        const $sayitoInputLabel = $('#sayito-input-label');
        try {
            let message = {text};
            if (instance.data.inputThreadParams) {
                message = _.extend({}, message, instance.data.inputThreadParams);
            }
            messageInsert.call(message);
            $sayitoInputLabel.transition('hide fade');
        } catch (err) {
            $sayitoInputLabel.text(err.reason || err);
            $sayitoInputLabel.transition('show fade');
        }
    }

});