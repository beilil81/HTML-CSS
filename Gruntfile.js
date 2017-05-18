module.exports = function(grunt) {
grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),

		// configuration des tâches grunt
		concat: {
			dist: {
				src: [
					'javascript/*.js'
				],
				dest: 'js/production.js'
			}
		},
		uglify: {
			build: {
				src: 'js/production.js',
				dest: 'js/production.min.js'
			}
		},
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'images/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'img/'
				}]
			}
		},
		sass: {
			dist: {
				options: 'compressed'
			},
			files: {
				expand: false,
				dest: 'css/global.css',
				src: 'css/starter.scss'
			}
		},
		watch: {
			scripts: {
				files: ['javascript/*.js'],
				tasks: ['concat','uglify']
			},
			css: {
				files: ['css/*.scss'],
				tasks: ['sass'],
				options: {
					spawn: false
				}
			}
		}

	});

// lister les plugin que l'on va utiliser 
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-watch');

// Les tâches sont enregistrées ici
grunt.registerTask('default', ['concat','uglify','imagemin','sass','watch']);

};