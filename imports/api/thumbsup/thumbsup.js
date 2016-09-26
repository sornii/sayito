import {Ground} from "meteor/ground:db";

export const Thumbsup = new Ground.Collection('Thumbsup', {connection: null});

Thumbsup.deny({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    }
});
