import './threadModal.html';

import {Template} from "meteor/templating";

import {insert as insertThread} from '../../../api/threads/methods';

Template.threadModal.onCreated(function () {
});

Template.threadModal.events({
    'click #thread-start' (event) {
        event.preventDefault();
    },

    'submit #thread-form' (event) {
        event.preventDefault();
    }
});