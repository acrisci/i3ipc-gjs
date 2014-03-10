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
}
