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

    this.autorun(() => {
        const thread = FlowRouter.getParam(this.nameParam);
        this.state.set(this.passwordState, threadPasswords.retrievePassword(thread));
    });

    Tracker.autorun(() => {
        const thread = FlowRouter.getParam(this.nameParam);
        const password = this.state.get(this.passwordState);
        this.subscribe('threads', {password, name: thread});
    })
});

Template.thread.onRendered(function threadOnRendered() {
    if (Threads.count({}) === 0) {
        $('#password-thread-modal')
            .modal({
                detachable: false
            })
            .modal('show');
    }
});

Template.thread.events({});

Template.thread.helpers({
    changePassword() {
        const instance = Template.instance();

        return (password) => {
            threadPasswords.savePassword(FlowRouter.getParam(instance.nameParam), password);
            instance.state.set(instance.passwordState, password);
        }
    },

    inputThreadParams() {
        const instance = Template.instance();

        return {
            get thread() {
                return FlowRouter.getParam(instance.nameParam);
            },
            get password() {
                return instance.state.get(instance.passwordState);
            }
        }
    },

    subscriptionNameParams() {
        const instance = Template.instance();

        return {
            name: 'messagesByThread',
            params: {
                get thread() {
                    return FlowRouter.getParam(instance.nameParam);
                },
                get password() {
                    return instance.state.get(instance.passwordState);
                }
            },
        };
    }
});