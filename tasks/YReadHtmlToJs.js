/*
 * YReadHtmlToJs
 * https://github.com/Yixi/grunt-YHtmlToJs
 *
 * Copyright (c) 2013 Yixi
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    var Path = require('path');
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('YReadHtmlToJs', 'read the html block to js string variable', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      url:"",
      separator: ';\n'
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
              return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.

      var RE_FLAG = new RegExp("<%=\\s*YHTJ:(.*?)\\s*%>",'g'),
          RE_BLOCKEND = new RegExp("<!--\\s*endYHTJ\\s*-->");
      var result = RE_FLAG.exec(src),
          blockReplace,blockPath,blockResult={};

      while(result!=null){
        blockReplace = result[0];
        blockPath = result[1];
        if(blockPath && !blockResult[blockReplace]){
            var block = blockPath.split(":");
            var tempPath = Path.join(options.url,block[0]);
            if(grunt.file.exists(tempPath)){
                var content = grunt.file.read(tempPath);
                var reBlockBuild = new RegExp("<!--\\s*YHTJ:"+block[1]+"\\s*-->(.*?)<!--\\s*endYHTJ\\s*-->","m");
                var blockContent = content.replace(/^\s*|\n/mg,"").match(reBlockBuild);
                if(blockContent){
                    blockResult[blockReplace] = blockContent[1];
                }
            }
        }
        result = RE_FLAG.exec(src);
      }

      for(var key in blockResult){
        var re = new RegExp(key,'g');
        src = src.replace(re,blockResult[key]);
      }




      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
