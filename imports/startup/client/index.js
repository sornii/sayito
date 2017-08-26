import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { TAPi18n } from 'meteor/tap:i18n';

import rg4js from 'raygun4js';
import moment from 'moment';

import AnnonUtil from './annon-util';
import ThreadPasswords from '../../utils/thread-passwords';
import SayitoLanguage from '../../utils/sayito-language';

import './routes';
import './annon';

Meteor.startup(() => {
  rg4js('enableCrashReporting', true);
  rg4js('apiKey', 'Sah7EBMKsi8rNnTMEmiJjA==');

  const annonId = AnnonUtil.annonId();

  Meteor.loginAsAnnon(annonId);

  TAPi18n.setLanguage(SayitoLanguage.retrieveLanguage());
  moment.locale(SayitoLanguage.retrieveLanguage());

  Session.set('passwords', ThreadPasswords.retrieveAllPasswords());

  Template.registerHelper('undefinedOr', (first) => {
    if (typeof first === 'undefined') {
      return true;
    }
    return !!first;
  });

  Template.registerHelper('stringify', first => JSON.stringify(first));
});
