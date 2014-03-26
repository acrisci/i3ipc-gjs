#!/usr/bin/env gjs

/*
   This example shows how to implement a "hidden workspace" using the
   scratchpad. The workspace should "disapear" from i3bar when you switch
   away.

   Unfortunately, it cannot handle complex workspace layouts, and will make
   your scratchpad unusable for other things.
   
   https://faq.i3wm.org/question/3558/invisible-workspaces-or-scratchpad-for-entire-workspaces/
*/

const i3ipc = imports.gi.i3ipc;

let conn = new i3ipc.Connection;

const HIDDEN_WS = "5";
let scratchpad_len = 0;

conn.on('workspace::focus', function(conn, e) {
    if (e.current.name === HIDDEN_WS) {
        for (let i = 0; i < scratchpad_len; i += 1)
            conn.command('scratchpad show, floating disable');
        
        scratchpad_len = 0;
    } else if (e.old.name === HIDDEN_WS) {
        e.old.command_children('move scratchpad');

        scratchpad_len = e.old.nodes.length;
    }
});

conn.main();
