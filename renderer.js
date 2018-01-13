/**
 * Example usage of jQuery Terminal in Electron app
 * Copyright (c) 2018 Jakub Jankewicz <http://jcubic.pl/me>
 * Released under MIT license
 */
/* global require */

const {ipcRenderer} = require('electron');

require('devtron').install();

var $ = require('jquery');

require('jquery.terminal')($);

$('body').terminal(function(command) {
    if (command.match(/^\s*exit\*$/)) {
        ipcRenderer.send('terminal', {
            method: 'exit',
            args: []
        });
    } else if (command !== '') {
        try {
            var result = window.eval(command);
            if (result !== undefined) {
                this.echo(new String(result));
            }
        } catch(e) {
            this.error(new String(e));
        }
    }
}, {
    exit: false,
    greetings: [
        // ascii art generated by figlet
        '   ______        __',
        '  / __/ /__ ____/ /________  ___',
        ' / _// / -_) __/ __/ __/ _ \\/ _ \\',
        '/___/_/\\__/\\__/\\__/_/  \\___/_//_/',
        '',
        'Copyright (C) 2018 Jakub Jankiewicz <http://jcubic.pl/me>',
        ''
    ].join('\n'),
    name: 'electron',
    prompt: '[[;#D72424;]js]> '
});
