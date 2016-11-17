var Compiler = require("./compiler.ios");

console.log(Compiler);
var compiler = new Compiler('ios', process.env.TARGET, console);
compiler.cleanDirectory();
compiler.build();
compiler.zip();

if (process.env.PHONE) {
  compiler.phoneInstall();
}