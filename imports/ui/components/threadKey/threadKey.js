import {Template} from "meteor/templating";

import './threadKey.html';
import '../threadModal/threadModal';

import {insert as insertThread} from '../../../api/threads/methods';

import $ from 'jquery';

Template.threadModal.onRendered(function () {
/*  This is broking mobile experience
    $('.key.button.sayito')
        .popup({
            delay: {
                show: 150,
                hide: 0
            },
            addTouchEvents: false
        });*/
});

Template.threadKey.events({
    'click button' (event) {
        event.preventDefault();

        $('#thread-modal')
            .modal({
                detachable: false,
                onApprove: function () {
                    const threadForm = $('#thread-form');
                    const formValues = threadForm.form('get values');

                    insertThread.call(formValues, (err, res) => {
                        if (err) {
                            //TODO: show errors on modal
                        } else {
                            FlowRouter.go('thread', {name: formValues.name});
                        }
                    });

                    return false;
                }
            })
            .modal('show');
    }
});