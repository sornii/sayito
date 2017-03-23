import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/app-body.js';

//pages
import '../../ui/pages/home/home.js';
import '../../ui/pages/said/said.js';

//componentes
import '../../ui/components/messageItem/messageItem.js';
import '../../ui/components/messageThumbsup/messageThumbsup.js';
import '../../ui/components/sayitoHeader/sayitoHeader.js';

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