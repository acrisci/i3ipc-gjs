#!/usr/bin/env gjs

/*
   This example shows how to renumber your workspaces so they are consolidated
   into a harmonious linear order starting from 1. For instance, if you have
   open workspaces 2, 5, 6, 7, 9 they will be renumbered to 1, 2, 3, 4, 5
   respectively.

   https://faq.i3wm.org/question/3595/how-can-i-renumber-workspaces/
*/

const i3ipc = imports.gi.i3ipc;

let conn = new i3ipc.Connection;

let workspaces = conn.get_workspaces()
    .filter(function(ws) {
        return !isNaN(parseInt(ws.name));
    }).sort(function(a, b) {
        return parseInt(a.name) - parseInt(b.name);
    });

workspaces.forEach(function(ws, i) {
    let new_name = ws.name.replace(parseInt(ws.name).toString(), (i + 1).toString());
    conn.command('rename workspace "' + ws.name + '" to "' + new_name + '"');
});
