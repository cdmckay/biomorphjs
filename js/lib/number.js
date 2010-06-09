/*
 *  Webble
 *  Copyright (c) 2010 Couchware Inc.  All rights reserved.
 */
(function(){

/**
 * Returns a random integer between min and max inclusive.
 */
Number.randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Returns a random float between min and max inclusive.
 */
Number.randomFloat = function(min, max) {
    return Math.random() * (max - min + 1) + min;
};

})();
