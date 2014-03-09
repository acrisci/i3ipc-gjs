# i3ipc-gjs

An improved JavaScript library to control [i3wm](http://i3wm.org).

## About

i3's interprocess communication (or [ipc](http://i3wm.org/docs/ipc.html)) is the interface i3wm uses to receive [commands](http://i3wm.org/docs/userguide.html#_list_of_commands) from client applications such as `i3-msg`. It also features a publish/subscribe mechanism for notifying interested parties of window manager events.

i3ipc-gjs is a JavaScript library for controlling the window manager. This project is intended to be useful for general scripting, and for applications that interact with the window manager like status line generators, notification daemons, and pagers.

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

**Caveat:** there currently seems to be a bug in Gjs that is preventing some of the ipc replies from working correctly. Accessing a string property may crash your script. I don't believe the issue is with the ipc library. Events and window trees should be working fine.

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
        print("Output " + i + "");
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
