var exec = require('child_process').exec;

function puts(error, stdout, stderr) {
    console.log(stdout);
}

function WebpackShellPlugin(options) {
    var defaultOptions = {
        onBuildEnd: []
    };
    this.options = Object.assign(defaultOptions, options);
}

WebpackShellPlugin.prototype.apply = function(compiler) {
    const options = this.options;
    compiler.plugin("emit", (compilation, callback) => {
        if(options.onBuildEnd.length){
            // console.log("Executing post-build scripts");
            // options.onBuildEnd.forEach(script => exec(script, puts));
            options.onBuildEnd.forEach(call=>{
                call();
            });
        }
        callback();
    });
};

module.exports = WebpackShellPlugin;



