import {Template} from "meteor/templating";
import {Session} from 'meteor/session'

import ThreadPasswords from '../../../utils/thread-passwords';

import './threadPassword.html';

Template.threadPassword.onCreated(function () {
});

Template.threadPassword.events({
    'click #thread-view' () {
        const threadForm = $('#password-thread-modal');
        const password = threadForm.form('get values').password;

        Session.set('password', password);
        ThreadPasswords.savePassword(Session.get('name'), password);
    },

    'submit #password-thread-form' (event) {

        event.preventDefault();

    }
});