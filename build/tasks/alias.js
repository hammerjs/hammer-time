module.exports = function( grunt ) {
grunt.registerTask( "default", [ "jshint", "jscs" ] );

//grunt.registerTask( "compare-size", [ "" ] );
grunt.registerTask( "build", [ "default", "uglify", "compare_size" ] );
};
