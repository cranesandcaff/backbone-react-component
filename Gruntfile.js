'use strict';
exports = module.exports = function (grunt) {
  grunt.initConfig({
    clean: {
      doc: ['.tmp', '.grunt']
    },
    uglify: {
      options: {
        compress: true
      },
      build: {
        files: {
          'dist/backbone-react-component-min.js': ['lib/component.js']
        }
      }
    },
    copy: {
      build: {
        files: [
          {src: ['lib/component.js'], dest: 'dist/backbone-react-component.js'}
        ]
      },
      doc: {
        files: [
          {cwd: 'docs', src: ['**', '!component.html', '!diagrams/**', '!diagrams'], dest: '.tmp', expand: true},
          {src: ['docs/component.html'], dest: '.tmp/index.html'}
        ]
      }
    },
    docco: {
      doc: {
        src: ['lib/component.js'],
        options: {
          layout: 'parallel'
        }
      }
    },
    'gh-pages': {
      doc: {
        options: {
          base: '.tmp'
        },
        src: ['**']
      }
    },
    jasmine: {
      dev: {
        src: ['lib/**/*.js'],
        options: {
          specs: 'test/specs/**/*.js',
          vendor: [
            'test/helpers/polyfills.js',
            'bower_components/underscore/underscore.js',
            'bower_components/backbone/backbone.js',
            'bower_components/react/react.js'
          ]
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-docco');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['copy:build', 'uglify:build']);
  grunt.registerTask('doc', ['docco:doc']);
  grunt.registerTask('publish-doc', ['clean:doc', 'doc', 'copy:doc', 'gh-pages:doc', 'clean:doc']);
  grunt.registerTask('test', ['jasmine:dev']);
};