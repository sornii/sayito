import {Template} from "meteor/templating";

import './threadPassword.html';

Template.threadPassword.onCreated(function () {
});

Template.threadPassword.events({
    'click #thread-view' () {
        const instance = Template.instance();

        const threadForm = $('#password-thread-modal');
        const password = threadForm.form('get values').password;

        instance.data.changePassword(password);
    },

    'submit #password-thread-form' (event) {

        event.preventDefault();

    }
});