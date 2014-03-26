let GLib = imports.gi.GLib;
let i3ipc;

function _init() {
    i3ipc = this;

    Object.defineProperty(i3ipc.Con.prototype, "nodes", {
        get: function() { return this.get_nodes(); }
    });

    i3ipc.Connection.prototype.main = function() {
        let main_loop = new GLib.MainLoop(null, false);
        this.connect("ipc_shutdown", function() {
            main_loop.quit();
        });
        main_loop.run();
    };

    // These overrides are a lot faster and should give the same result:

    i3ipc.Connection.prototype.command = function(payload) {
        let reply = this.message(i3ipc.MessageType.COMMAND, payload);
        return JSON.parse(reply);
    };

    i3ipc.Connection.prototype.get_outputs = function() {
        let reply = this.message(i3ipc.MessageType.GET_OUTPUTS, "");
        return JSON.parse(reply);
    };

    i3ipc.Connection.prototype.get_workspaces = function() {
        let reply = this.message(i3ipc.MessageType.GET_WORKSPACES, "");
        return JSON.parse(reply);
    };

    i3ipc.Connection.prototype.get_bar_config = function(id) {
        let reply = this.message(i3ipc.MessageType.GET_BAR_CONFIG, id);
        return JSON.parse(reply);
    };

    i3ipc.Connection.prototype.get_version = function() {
        let reply = this.message(i3ipc.MessageType.GET_VERSION, "");
        return JSON.parse(reply);
    };
}
