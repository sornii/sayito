import {Template} from "meteor/templating";
import {FlowRouter} from "meteor/kadira:flow-router";
import {ActiveRoute} from "meteor/zimme:active-route";
import {_} from "meteor/underscore";
import {$} from "meteor/jquery";
import {TrendingTags} from "../../../api/trendingTags/trendingTags.js";
import {commonFilter as trendingTagsFilter} from "../../../api/trendingTags/filters.js";
import {insert} from "../../../api/messages/methods.js";
import "../../components/messageList/messageList.js";
import "../../components/loading/loading.js";
import "../../components/dummy/dummy.js";
import "./home.html";

Template.home.onRendered(function homeOnRendered() {
    $(document).ready(() => {
        $('.ui.dropdown').dropdown();
    });
});

Template.home.onCreated(function homeOnCreated() {

    this.autorun(() => {

        const tagRoute = ActiveRoute.name('tag');

        if (tagRoute) {
            this.subscribe('messagesByTag', FlowRouter.getParam('tag'));
        } else {
            this.subscribe('messages');
        }

        this.subscribe('ranking');

    });
});

Template.home.helpers({
    ranking() {
        return TrendingTags.find({}, trendingTagsFilter);
    }
});

Template.home.events({

    'submit .sayito.form' (event) {
        event.preventDefault();

        const $sayitoForm = $(".sayito-input");
        const text = $sayitoForm.val();
        $sayitoForm.val("");

        var $sayitoInputLabel = $('#sayito-input-label');
        try {
            insert.call({text});
            $sayitoInputLabel.transition('hide fade');
        } catch (err) {
            $sayitoInputLabel.text(err.reason || err);
            $sayitoInputLabel.transition('show fade');
        }
    }

});