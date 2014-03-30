#!/usr/bin/env gjs

/*
   This example shows how to implement an "n-dimensional" workspace layout,
   where it is possible to navigate through your workspaces by not only the
   "next" and "previous" ones, but also to go "up" and "down" at an arbitrary
   velocity. This is done by generalizing the scalar workspace numbers to
   be interpreted as vectors.

   Usage:
   # Move to the next workspace
   ./n-dimensional-ws-layout.js next
   # Move to the workspace "above" this one
   ./n-dimensional-ws-layout.js up
   # Move two workspaces back (i.e., from 5 to 3)
   ./n-dimensional-ws-layout.js -2
   # Move three workspaces forward and four workspaces down
   ./n-dimensional-ws-layout.js 3,-4

   https://faq.i3wm.org/question/3591/how-to-arrange-workspaces-in-a-bidimensional-manner/
*/

const i3ipc = imports.gi.i3ipc;

let conn = new i3ipc.Connection;

// Add to this number if you want more workspace dimensions (we could figure
// this out from all the workspace names, but I doubt that would be useful to
// anyone at this time).
let MAX_DIMENSIONS = 3;

// Add to this object if you want more workspace aliases.
let movement_aliases = {
    next:       '1',
    previous:   '-1',
    up:         '0,1',
    down:       '0,-1'
};

// Check for aliases
let movement_arg = movement_aliases[ARGV[0]] || ARGV[0] || '';

// Turns a vector string into a vector array
let to_vector = function(str) {
    if (str.indexOf(':') !== -1) {
        str = str.slice(0, str.indexOf(':'));
    }

    return str.split(',').map(function(el) {
        return parseInt(el) || 0;
    });
};

// Adds two vectors in the ordinary way
let add_vectors = function(a, b) {
    let retval = [];
    for (let i = 0; i < MAX_DIMENSIONS; i += 1) {
        retval[i] = (a[i] || 0) + (b[i] || 0);
    }

    return retval;
};

// Checks two vectors for equality in the normal way
let test_vector_equals = function(a, b) {
    for (let i = 0; i < MAX_DIMENSIONS; i += 1) {
        if ((a[i] || 0) !== (b[i] || 0)) {
            return false;
        }
    }

    return true;
};

let workspaces = conn.get_workspaces();

let focused_ws = workspaces.filter(function(ws) {
    return ws.focused;
}).shift();

// This is the vector where we should end up
let next_ws_vector = add_vectors(to_vector(movement_arg), to_vector(focused_ws.name));

let found_next_ws = false;

// Check if the workspace where we want to go already exists and go there if it
// does
workspaces.every(function(ws) {
    if (test_vector_equals(to_vector(ws.name), next_ws_vector)) {
        conn.command('workspace "' + ws.name + '"');
        found_next_ws = true;
        return false;
    }

    return true;
});

// If the workspace where we want to go does not exist, make a new one
if (!found_next_ws) {
    // Pop off the zeros on the end of the array
    while (next_ws_vector.length && !next_ws_vector[next_ws_vector.length - 1]) {
        next_ws_vector.pop();
    }

    conn.command('workspace "' + next_ws_vector.join() + '"');
}
