/*
 *  Biomorph.js
 *  Copyright (c) 2010 Cameron McKay.  All rights reserved.
 */
(function($){

window.bio = window.bio || {};
var root = window.bio;

var base = root.gene = function(spec)
{
    var that,
        val = spec.val || 0,
        delta = spec.delta || 1,
        min = spec.min || Number.NEGATIVE_INFINITY,
        max = spec.max || Number.POSITIVE_INFINITY;

    that = {
        clone: function() {
            return base($.extend({}, spec, {val: val}));
        },

        mutate: function() {
            var sign = Number.randomInt(0, 1) * 2 - 1;            
            val = Math.min(Math.max(min, val + sign * delta), max);
            
            return that;
        },

        val: function() {
            return val;
        }
    };

    return that;
}

})(jQuery);


