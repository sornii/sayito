import {Template} from "meteor/templating";
import "./messageText.html";

Template.messageText.helpers({
    formattedText () {
        const regex = /\B#(\w*[A-Za-z_]+\w*)/g;

        const text = this.text;
        let match = regex.exec(text);

        let message = text;

        while (match != null) {
            const hashtag = match[0];
            const param = match[1];

            const ahref = '<a href="/hashtag/' + param + '">' + hashtag + '</a>';
            message = message.replace(hashtag, ahref);

            match = regex.exec(text);
        }

        return message;
    }
});