import './threadKey.html';

import {Template} from "meteor/templating";

import '../threadModal/threadModal';

Template.threadKey.events({
    'click button' (event) {
        event.preventDefault();

        $('#thread-modal')
            .modal({
                detachable: false
            })
            .modal('show');
    }
});