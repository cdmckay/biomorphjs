/*
 *  Webble
 *  Copyright (c) 2010 Couchware Inc.  All rights reserved.
 */
(function(){

Object.create = function(o)
{
    var F = function() {};
    F.prototype = o;
    return new F();
};

})();
