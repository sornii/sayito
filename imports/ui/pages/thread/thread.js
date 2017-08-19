import {Template} from 'meteor/templating';
import {Session} from 'meteor/session'
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveDict} from 'meteor/reactive-dict';

import {_} from 'meteor/underscore';
import {$} from 'meteor/jquery';

import {Threads} from '../../../api/threads/threads';
import ThreadPasswords from '../../../utils/thread-passwords';

import '../../components/messageInput/messageInput';
import '../../components/messageList/messageList';
import '../../components/threadPassword/threadPassword';

import './thread.html';

Template.thread.onCreated(function threadOnCreated() {
    const name = FlowRouter.getParam('name');

    Session.set('name', name);
    Session.set('password', ThreadPasswords.retrievePassword(name));

    Tracker.autorun(() => {
        const name = Session.get('name');
        const password = Session.get('password');
        this.subscribe('threads', {name, password});
    })
});

Template.thread.onDestroyed(function threadOnDestroyed() {
    Session.set('name', undefined);
    Session.set('password', undefined);
});

Template.thread.onRendered(function threadOnRendered() {
    this.autorun(() => {
        if (Session.get('password') === undefined ||
            (this.subscriptionsReady() && Threads.find({}).count() === 0)) {

            $('#password-thread-modal')
                .modal({
                    detachable: false
                })
                .modal('show');
        }
    });
});

Template.thread.events({
});

Template.thread.helpers({
});