# i3ipc-gjs

An improved JavaScript library to control [i3wm](http://i3wm.org).

## NOTICE

This library will be merged into the main project, [i3ipc-GLib](https://github.com/acrisci/i3ipc-glib) soon in the v1.0.0 release of that project.

## About

i3's interprocess communication (or [ipc](http://i3wm.org/docs/ipc.html)) is the interface i3wm uses to receive [commands](http://i3wm.org/docs/userguide.html#_list_of_commands) from client applications such as `i3-msg`. It also features a publish/subscribe mechanism for notifying interested parties of window manager events.

i3ipc-gjs is a JavaScript library for controlling the window manager. This project is intended to be useful for general scripting, and for applications that interact with the window manager like status line generators, notification daemons, and pagers.

If you have an idea for a script to extend i3wm, you can add your script to the examples directory or [post a script request](https://github.com/acrisci/i3ipc-gjs/issues) on the project issue tracker.

## Documentation

The latest documentation can be found [here](http://dubstepdish.com/i3ipc-glib). i3ipc-gjs is a [GObject introspection](https://developer.gnome.org/gobject/stable/) library (kind of like [gtk](https://developer.gnome.org/)).

## Installation

i3ipc-gjs requires [i3ipc-GLib](https://github.com/acrisci/i3ipc-glib) and [Gjs](https://wiki.gnome.org/action/show/Projects/Gjs).

Then simply do:

```shell
./autogen.sh
sudo make install
```

Or get someone to host a package for your distro.

## Example

```JavaScript
#!/usr/bin/env gjs

const i3ipc = imports.gi.i3ipc;

// Create the Connection object that can be used to send commands and subscribe
// to events.
let conn = new i3ipc.Connection;

// Query the ipc for outputs. The result is a list that represents the parsed
// reply of a command like `i3-msg -t get_outputs`.
let outputs = conn.get_outputs();

print('Active outputs:');

outputs.forEach(function(o, i) {
    if (o.active)
        print(o.name);
});

// Send a command to be executed synchronously.
conn.command('focus left');

// Define a callback to be called when you switch workspaces.
let on_workspace = function(self, e) {
    // The first parameter is the connection to the ipc and the second is an object
    // with the data of the event sent from i3.
    if (e.current) {
        print('Windows on this workspace:');
        e.current.descendents().forEach(function(w) {
            print(w.name);
        });
    }
};

// Subscribe to the workspace event
conn.on('workspace', on_workspace);

// Start the main loop and wait for events to come in.
conn.main();
```

## Contributing

We should do what we can to make this library as JavaScript-like as good tastes allows. New features should be implemented on the main project at [i3ipc-GLib](https://github.com/acrisci/i3ipc-glib).

## License

This work is available under the GNU General Public License (See COPYING).

Copyright © 2014, Tony Crisci

All rights reserved.
