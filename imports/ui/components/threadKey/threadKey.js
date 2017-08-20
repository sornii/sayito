import { Template } from 'meteor/templating';

import $ from 'jquery';

import './threadKey.html';
import '../threadModal/threadModal';

Template.threadModal.onRendered(() => {
  /*  This is broking mobile experience
   $('.key.button.sayito')
   .popup({
   delay: {
   show: 150,
   hide: 0
   },
   addTouchEvents: false
   }); */
});

Template.threadKey.events({
  'click button': function (event) {
    event.preventDefault();

    $('#thread-modal')
      .modal({
        transition: 'fade up',
        closable: false,
        detachable: false,
        onApprove() {
          return false;
        },
      })
      .modal('show');
  },
});
