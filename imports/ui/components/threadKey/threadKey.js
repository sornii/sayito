import {Template} from "meteor/templating";

import './threadKey.html';
import '../threadModal/threadModal';

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
                transition: 'fade up',
                closable: false,
                detachable: false,
                onApprove: function () {
                  return false;
                }
            })
            .modal('show');
    }
});