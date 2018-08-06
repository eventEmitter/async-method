'use strict';

const type = require('ee-types');


module.exports = function(method) {
    return function(...args) {
        
        // if the last argument is a function, we're working with callbacks
        if (type.function(args[args.length -1])) {
            method(...args);
        } else {
            return new Promise((resolve, reject) => {
                args.push((err, arg) => {
                    if (err) reject(err);
                    else resolve(arg);
                });

                method(...args);
            });
        }
    }
}
