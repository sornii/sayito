import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import $ from 'jquery';

import TrendingTagsFilter from '../../../api/trendingTags/filters';
import { TrendingTags } from '../../../api/trendingTags/trendingTags';

import './messageInput.html';

Template.messageInput.onCreated(function messageInputOnCreated() {
  this.autorun(() => {
    const params = {
      thread: Session.get('name'),
      password: Session.get('password'),
    };

    this.subscribe('ranking', { ...params });
  });
});

Template.messageInput.onRendered(() => {
  $(document).ready(() => {
    $('.ui.dropdown').dropdown();
  });
});

Template.messageInput.helpers({
  ranking() {
    return TrendingTags.find({}, TrendingTagsFilter.common());
  },
});

Template.messageInput.events({

  'submit .sayito.form': function sendMessage(event) {
    event.preventDefault();

    const $sayitoForm = $('.sayito-input');
    const text = $sayitoForm.val();
    $sayitoForm.val('');

    const $sayitoInputLabel = $('#sayito-input-label');
    try {
      const params = {
        thread: Session.get('name'),
        password: Session.get('password'),
      };
      Meteor.call('messages.insert', { text, ...params });
      $sayitoInputLabel.transition('hide fade');
    } catch (err) {
      $sayitoInputLabel.text(err.reason || err);
      $sayitoInputLabel.transition('show fade');
    }
  },

});
