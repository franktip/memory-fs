var Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path');


// add each .test.js file in (a subdirectory of) f to Mocha's list of test files
function addFiles(f){
  var stats = fs.statSync(f);
  if (stats.isDirectory()){
    //console.log("*** directory ");
    var files = fs.readdirSync(f);
    files.forEach(function(file){
      //console.log("*** file: " + file);
      addFiles(path.join(f, file));
    });

  } else {
    if (f.endsWith('.js')){
      //console.log("*** file: " + f);
      mocha.addFile(f);
    }
  }
}

// Instantiate a Mocha instance.
var mocha = new Mocha();

//var testDir = 'packages/parser-delimiter/lib'
addFiles('test');


// Run the tests.
mocha.run(function(failures) {
  process.exitCode = failures ? 1 : 0;  // exit with non-zero status if there were failures
});
