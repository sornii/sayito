import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveDict} from 'meteor/reactive-dict';

import {_} from 'meteor/underscore';
import {$} from 'meteor/jquery';

import {Threads} from '../../../api/threads/threads';
import {threadPasswords} from '../../../utils/thread-passwords';

import '../../components/messageInput/messageInput';
import '../../components/messageList/messageList';
import '../../components/threadPassword/threadPassword';

import './thread.html';

Template.thread.onCreated(function threadOnCreated() {
    this.nameParam = 'name';
    this.passwordState = 'password';

    this.state = new ReactiveDict();
    this.state.setDefault({
        [this.passwordState]: null
    });

    this.getNameParam = () =>
        FlowRouter.getParam(this.nameParam);

    this.getPasswordState = () =>
        this.state.get(this.passwordState);

    this.setPasswordState = (password) =>
        this.state.set(this.passwordState, password);

    const instance = this;

    this.getParams = () => {
        return {
            thread: instance.getNameParam,
            password: instance.getPasswordState
        };
    };

    Tracker.autorun(() => {
        this.setPasswordState(threadPasswords.retrievePassword(this.getNameParam()));
    });

    Tracker.autorun(() => {
        const thread = this.getNameParam();
        const password = this.getPasswordState();
        this.subscribe('threads', {password, name: thread});
    })
});

Template.thread.onRendered(function threadOnRendered() {
    this.autorun(() => {
        if (this.getPasswordState() === undefined ||
            (this.subscriptionsReady() && Threads.find({}).count() === 0)) {
            $('#password-thread-modal')
                .modal({
                    detachable: false
                })
                .modal('show');
        }
    });
});

Template.thread.events({});

Template.thread.helpers({
    changePassword() {
        const instance = Template.instance();

        return (password) => {
            threadPasswords.savePassword(instance.getNameParam(), password);
            instance.setPasswordState(password);
        }
    },

    inputThreadParams() {
        const instance = Template.instance();
        return instance.getParams();
    },

    subscriptionNameParams() {
        const instance = Template.instance();

        return {
            name: 'messagesByThread',
            params: {
                ... instance.getParams()
            },
        };
    }
});