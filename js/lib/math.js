/*
 *  Webble
 *  Copyright (c) 2010 Couchware Inc.  All rights reserved.
 */
(function(){

Math.signum = function(n)
{
    if (n === 0) return n;
    if (n > 0) return +1;
    if (n < 0) return -1;
};

})();