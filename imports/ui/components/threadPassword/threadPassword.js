import './threadModal.html';

import {Template} from "meteor/templating";

Template.threadModal.onCreated(function () {

    this.subscribe()

});

Template.threadModal.events({
    'click #thread-view' () {
        const threadForm = $('#password-thread-modal');
        threadForm.form('get values');
    }
});