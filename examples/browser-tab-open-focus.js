#!/usr/bin/env gjs

/*
   This example shows how to make i3wm automatically switch to a browser that
   has opened a new tab by using the new ipc "title change" event. This event
   will be available in the next released version (after 4.7.2).

   If you have a webpage open that changes the title without any user
   interaction (rare, but possible), you may need to do some additional
   filtering so it does not switch focus unexpectedly.

   https://faq.i3wm.org/question/3434/switch-to-workspace-where-a-link-was-opened-in-firefox/
*/

const i3ipc = imports.gi.i3ipc;

let conn = new i3ipc.Connection;

let browser_re = /- Vimperator$|- Firefox$|- Chromium$/

conn.on('window::title', function(conn, e) {
    if (browser_re.test(e.container.name)) {
        e.container.command('focus');
    }
});

conn.main();
