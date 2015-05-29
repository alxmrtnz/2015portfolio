module.exports = function (grunt) {
	grunt.initConfig({
		watch: {
			options: {
				livereload: true,
				dateFormat: function(time) {
					grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
					grunt.log.writeln('Waiting for more changes...');
				}
			},
			handlebars: {
				files: ['handlebars/**/*.hbs'],
				tasks: ['handlebars']
			},
			sass: {
				files: ['scss/**/*.scss'],
				tasks: ['sass']
			},
			uglify: {
				files: ['js/**/*.js'],
				tasks: ['uglify']
			}
		},
		sass: {
			build: {
				options: {
					unixNewlines: true,
					style: 'compressed'
				},
				files: {
					'build/css/marketing.css': 'scss/marketing.scss',
					'build/css/app.min.css': 'scss/app.scss',
					'build/css/estimates/reset.min.css': 'scss/reset.scss'
				},
				sourcemap: true
			}
		},
		handlebars: {
			compile: {
				options: {
					namespace: "JST",
					processName: function (filePath) {
						return filePath.replace(/handlebars\//, '').replace(/\.hbs$/, '');
					}
				},
				files: {
					"build/app.templates.min.js": ["handlebars/**/*.hbs"]
				}
			}
		},
		uglify: {
			options: {
				sourceMap: true
			},
			build: {
				files: {
					'build/js/app.min.js': [
						'js/*.js',
						'js/**/*.js',
						'!js/marketing.js',
						'!js/login.js'
					],

					'build/js/marketing.min.js': [
						'js/marketing.js'
					],

					'build/js/login.min.js': 'js/login.js',

					'build/js/lib.min.js': [
						'lib/underscore.js',
						'lib.json2.js',
						'lib/moment.js',
						'lib/handlebars.js',
						'lib/backbone.js',
						'lib/backbone.babysitter.js',
						'lib/backbone.wreqr.js',
						'lib/backbone.marionette.js'
					]
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', [
		'sass',
		'handlebars',
		'uglify',
		'watch'
	]);
};