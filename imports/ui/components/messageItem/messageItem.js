import "../messageThumbsup/messageThumbsup.js";
import "./messageItem.html";
import {Template} from "meteor/templating";
import {Tracker} from "meteor/tracker";
import {moment} from "meteor/momentjs:moment";

Template.messageItem.onCreated(function messageItemOnCreated() {

    this.howLong = new ReactiveVar();

    //TODO: TESTES PARA ATUALIZAR A MENSAGEM A CADA SEGUNDO/MINUTO

    this.autorun(() => {
        this.howLong.set(moment(this.data.message.createdAt).fromNow());
    });
});

Template.messageItem.helpers({
    howLong () {
        return Template.instance().howLong.get();
    }
});