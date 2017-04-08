import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';

//layouts
import '../../ui/layouts/app-body.js';

//pages
import '../../ui/pages/home/home.js';
import '../../ui/pages/said/said.js';
import '../../ui/pages/tag/tag.js';
import '../../ui/pages/teste/teste.js';

//componentes
import '../../ui/components/dummy/dummy.js';
import '../../ui/components/loading/loading.js';
import '../../ui/components/messageInput/messageInput.js';
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
    action: () => BlazeLayout.render('App_body', {content: 'tag'}),
});

FlowRouter.route('/said/:id', {
    name: 'said',
    action: () => BlazeLayout.render('App_body', {content: 'said'}),
});

FlowRouter.route('/thread/:name', {
    name: 'thread',
    action: () => BlazeLayout.render('App_body', {content: 'thread'})
});

FlowRouter.route('/teste', {
    name: 'teste',
    action: () => BlazeLayout.render('App_body', {content: 'teste'})
});