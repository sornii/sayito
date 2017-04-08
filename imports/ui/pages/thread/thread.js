import {Template} from 'meteor/templating';


Template.thread.onCreated(function () {

});

Template.thread.events({

});

Template.thread.helpers({
    subscriptionNameParams() {
        return {
            name: 'messagesByThread',
            params: {
                get tag () {
                    return FlowRouter.getParam('tag');
                }
            },
        };
    }
});