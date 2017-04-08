import './threadModal.html';

import {Template} from "meteor/templating";

import {insert as insertThread} from '../../../api/threads/methods';

Template.threadModal.onCreated(function () {
});

Template.threadModal.events({
    'click #thread-start' () {
        const threadForm = $('#thread-form');
        try {
            insertThread.call(threadForm.form('get values'));
            threadForm.form('clear');
        } catch (err) {
            alert(err);
        }
    }
});