import {Template} from "meteor/templating";
import {TrendingTags} from "../../../api/trendingTags/trendingTags.js";
import {TrendingTagsFilter} from "../../../api/trendingTags/filters.js";
import {insert as messageInsert} from "../../../api/messages/methods.js";

import "./messageInput.html";

Template.messageInput.onCreated(function messageInputOnCreated() {
    this.autorun(() => {
        this.subscribe('ranking');
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
        event.preventDefault();

        const $sayitoForm = $(".sayito-input");
        const text = $sayitoForm.val();
        $sayitoForm.val("");

        const $sayitoInputLabel = $('#sayito-input-label');
        try {
            messageInsert.call({text});
            $sayitoInputLabel.transition('hide fade');
        } catch (err) {
            $sayitoInputLabel.text(err.reason || err);
            $sayitoInputLabel.transition('show fade');
        }
    }

});