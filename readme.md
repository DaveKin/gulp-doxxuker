# gulp-doxxuker 

Parse DocBlock annotations from all types of files and compile a single JSON data file.

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


## License

MIT © [Dave Kinsella](https://github.com/DaveKin)
