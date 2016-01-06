# gulp-doxxuker [![Build Status](https://travis-ci.org/DaveKin/gulp-doxxuker.svg?branch=master)](https://travis-ci.org/DaveKin/gulp-doxxuker)

> My astounding gulp plugin


## Install

```
$ npm install --save-dev gulp-doxxuker
```


## Usage

```js
var gulp = require('gulp');
var doxxuker = require('gulp-doxxuker');

gulp.task('default', function () {
	return gulp.src('src/file.ext')
		.pipe(doxxuker())
		.pipe(gulp.dest('dist'));
});
```


## API

### doxxuker(options)

#### options

##### foo

Type: `boolean`  
Default: `false`

Lorem ipsum.


## License

MIT © [Dave Kinsella](https://github.com/DaveKin)
