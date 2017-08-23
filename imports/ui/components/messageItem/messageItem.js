import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import moment from 'moment';

import '../messageThumbsup/messageThumbsup';
import './messageItem.html';

Template.messageItem.onCreated(function messageItemOnCreated() {
  const howLong = 'howLong';

  this.calculateHowLong = () =>
    moment(this.data.message.createdAt).fromNow();

  this.state = new ReactiveDict();
  this.state.setDefault({
    [howLong]: this.calculateHowLong(),
  });

  this.getHowLong = () =>
    this.state.get(howLong);

  this.setHowLong = howLongValue =>
    this.state.set(howLong, howLongValue);

  this.defineHowLong = () =>
    this.setHowLong(this.calculateHowLong());

  this.interval = setInterval(this.defineHowLong, 60 * 1000);
});

Template.messageItem.onDestroyed(function messageItemOnDestroyed() {
  clearInterval(this.interval);
});

Template.messageItem.helpers({
  howLong() {
    const instance = Template.instance();
    return instance.getHowLong();
  },
});
