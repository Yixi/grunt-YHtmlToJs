# YReadHtmlToJs

> read the html block to js string variable

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install y-html-2-js --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('y-html-2-js');
```

## The "YReadHtmlToJs" task

### Overview
In your project's Gruntfile, add a section named `YReadHtmlToJs` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  YReadHtmlToJs: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.url
Type: `String`
Default value: `''`

set the template HTML base location

#### options.separator
Type: `String`
Default value: `;\n`


### Usage Examples

In javascrpt:

```javascript
var HTML_TEMPLATE = '<%= YHTJ:/template/item.html:note %>'
```
In `/template/item.html` file:

```html
<!--YHTJ:note-->
<div class="note">
	<div class="title">{title}</div>
</div>
<!--endYHTJ-->
```

when run `y-html-2-js` task , will find the block `<%= YHTJ:xxxx:xx %>` of javascript file, then will find the `note` block of `/template/item.html` file.

so will build like this:

```javascript
var HTML_TEMPLATE = '<div class="note"><div class="title">{title}</div></div>'
```



## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
