import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/app-body.js';
import '../../ui/pages/home.js';
import '../../ui/pages/said.js';
import '../../ui/components/message.js';
import 'meteor/percolate:momentum';

FlowRouter.route('/', {
    name: 'home',
    action: () => BlazeLayout.render('App_body', {content: 'home'}),
});

FlowRouter.route('/hashtag/:tag', {
    name: 'tag',
    action: () => BlazeLayout.render('App_body', {content: 'home'}),
});

FlowRouter.route('/said/:id', {
    name: 'said',
    action: () => BlazeLayout.render('App_body', {content: 'said'}),
});

FlowRouter.route('/thumbsup', {
    name: 'thumbsup',
    action: () => BlazeLayout.render('App_body', {content: 'home'}),
});