import {Template} from "meteor/templating";
import {Session} from "meteor/session";

import {TrendingTags} from "../../../api/trendingTags/trendingTags.js";
import {TrendingTagsFilter} from "../../../api/trendingTags/filters.js";
import {insert as messageInsert} from "../../../api/messages/methods.js";

import $ from "jquery";

import "./messageInput.html";

Template.messageInput.onCreated(function messageInputOnCreated() {
    this.autorun(() => {

        const params = {
            name: Session.get('name'),
            password: Session.get('password')
        };

        this.subscribe('ranking', {... params});
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
            const params = {
                name: Session.get('name'),
                password: Session.get('password')
            };
            messageInsert.call({text, ...params});
            $sayitoInputLabel.transition('hide fade');
        } catch (err) {
            $sayitoInputLabel.text(err.reason || err);
            $sayitoInputLabel.transition('show fade');
        }
    }

});