#!/usr/bin/env gjs
// borders-only-if-more-than-one-window.js
// requires `i3ipc-gjs`: https://github.com/acrisci/i3ipc-gjs
// Author: Kipras Melnikovas (kipras.org) <kipras@kipras.org> 2019

const i3ipc = imports.gi.i3ipc;

let conn = new i3ipc.Connection();

let workspaces = conn.get_workspaces();
print("workspaces", JSON.stringify(workspaces));

const border_width = 2; // pixels

const update_workspace_borders = (self, event) => {
	let window = self.get_tree().find_focused(); // not really needed
	let workspace = window.workspace();

	let howManyWindows = workspace.nodes.length;
	print("update_workspace_borders -> howManyWindows", howManyWindows);

	// NOTE
	//
	// this implementation is somewhy buggy when using
	// split (horizontal|vertical)
	//
	// it still works if you want to check if there's either 1 OR more,
	// but checking for an exact number of windows might be buggy.
	//

	// add borders
	if (howManyWindows > 1) {
		self.command(`border pixel ${border_width}`);
		workspace.nodes.forEach((node) => {
			node.command(`border pixel ${border_width}`);
		});
	}

	// remove borders
	// workspace.nodes.forEach(...) is not needed because `self` is the only node/window left.
	else if (howManyWindows === 1) {
		self.command("border none");
	}
};

conn.on("window::new", update_workspace_borders);
conn.on("window::close", update_workspace_borders);

// moving window to another workspace etc.
conn.on("workspace", update_workspace_borders);

conn.main();
