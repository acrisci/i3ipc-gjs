#!/usr/bin/env gjs

/*
   This example shows how to renumber your workspaces so they are consolidated
   into a harmonious linear order starting from 1 automatically when a
   workspace is closed. For instance, if you have open workspaces 1, 2, 4 they
   will be renumbered to 1, 2, 3 respectively when you move out of the
   workspace with no containers.

   https://faq.i3wm.org/question/3579/auto-sort-workspace-number/
*/

const i3ipc = imports.gi.i3ipc;

let conn = new i3ipc.Connection;

conn.on('workspace::empty', function(conn, e) {
    let workspaces = conn.get_workspaces().filter(function(ws) {
        return !isNaN(parseInt(ws.name));
    }).sort(function(a, b) {
        return parseInt(a.name) - parseInt(b.name);
    });

    workspaces.forEach(function(ws, i) {
        let new_name = ws.name.replace(parseInt(ws.name).toString(), (i + 1).toString());
        conn.command('rename workspace "' + ws.name + '" to "' + new_name + '"');
    });
});

conn.main();
