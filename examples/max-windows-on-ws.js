#!/usr/bin/env gjs

/*
   This example shows how to define a maximum number of windows per workspace.
   If a window is opened and the workspace has more than the defined number of
   maximum children containers, the new window will open on the next available
   workspace.

   https://faq.i3wm.org/question/3551/i-want-every-n-th-window-appear-on-next-empty-workspace/
*/

const i3ipc = imports.gi.i3ipc

let conn = new i3ipc.Connection;

const MAX_WINDOWS = 3;

conn.on('window::new', function(conn, e) {
    let win = conn.get_tree().find_focused();
    let ws = win.workspace();

    if (ws.nodes.length > MAX_WINDOWS) {
        win.command('move to workspace next, focus');
    }
});

conn.main();
