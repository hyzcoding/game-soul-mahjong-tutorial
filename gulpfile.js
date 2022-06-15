const gulp = require("gulp");
//转译JavaScript
gulp.task("webpack", () => {
    const webpack = require("webpack-stream");
    const config = require("./webpack.config");
    gulp.src("./src/**/*.js")
        .pipe(webpack(config))
        .pipe(gulp.dest("../src/"))
});

gulp.task("watch", function () {
    gulp.watch("./src/**/*.js", ['webpack']);
});

gulp.task("default", ["webpack", 'watch']);