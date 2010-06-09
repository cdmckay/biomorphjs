/*
 *  Webble
 *  Copyright (c) 2010 Couchware Inc.  All rights reserved.
 */
(function(){

// From JavaScript: The Good Parts.
Array.matrix = function(m, n, initial)
{
    var a, i, j, mat = [];
    for (i = 0; i < m; i++)
    {
        a = [];
        for (j = 0; j < n; j++)
        {
            a[j] = initial;
        }
        mat[i] = a;
    }
    return mat;
};

/**
 * Returns an array that has all duplicates objects removed.
 */
Array.prototype.unique = function()
{
    var ret = [];
    for (var i = 0; i < this.length; i++)
    {
        var elt = this[i];
        if (!ret.some(function(val) {return val === elt}))
            ret.push(elt);
    }
    return ret;
}

/**
 *  Returns true if, and only if, length is 0.
 */
Array.prototype.isEmpty = function()
{
    return this.length === 0;
}

Array.prototype.intersect = function(that)
{
    var ret = [];
    var xs = this.unique();
    var ys = that.unique();
    xs.forEach(function(x){
        if (ys.some(function(y) {return x === y;}))
            ret.push(x);
    });
    return ret;
}

Array.prototype.complement = function(that)
{
    var ret = [];
    var xs = this.unique();
    var ys = that.unique();
    xs.forEach(function(x){
        if (!ys.some(function(y) {return x === y;}))
            ret.push(x);
    });
    return ret;
}

/**
 * Get a random element from the array.
 *
 * @param min Set a minimum index.
 * @param max Set a maximum index.
 */
Array.prototype.random = function(min, max)
{
    var mn = min || 0;
    var mx = max || this.length - 1;
    var index = Number.randomInt(mn, mx);
    return this[index];
};

/**
 * Remove the first occurance of the passed element form the array.
 *
 * @param o The object to remove from the array.
 */
Array.prototype.remove = function(o)
{
    var removed;
    for (var i = 0; i < this.length; i++) {
        if (this[i] === o) {
            removed = this.splice(i, 1);
            break;
        }
    }
    return removed;
};

/**
 * Shuffle the array.
 */
Array.prototype.shuffle = function()
{
    for (var i = this.length - 1; i > 0; i--) {
        var index = Number.randomInt(0, i);
        this.swap(index, i);
    }

    return this;
};

/**
 * Exchanges the elements at two positions in the array.
 *
 * @param a
 * @param b
 */
Array.prototype.swap = function(a, b)
{
    var swap = this[a];
    this[a] = this[b];
    this[b] = swap;

    return this;
};

/**
 * Transposes a given array.
 *
 * @id Array.prototype.transpose
 * @author Shamasis Bhattacharya
 * @type Array
 * @return The Transposed Array
 * @compat=ALL
 */
Array.prototype.transpose = function()
{
    // Calculate the width and height of the Array
    var a = this,
    w = a.length ? a.length : 0,
    h = a[0] instanceof Array ? a[0].length : 0;

    // In case it is a zero matrix, no transpose routine is needed.
    if (h === 0 || w === 0)
    {
        return [];
    }

    /**
     * @var {Number} i Counter
     * @var {Number} j Counter
     * @var {Array} t Is the array where transposed data is stored.
     */
    var i, j, t = [];

    // Loop through every item in the outer array (height)
    for (i = 0; i < h; i++)
    {
        // Insert a new row (array)
        t[i] = [];

        // Loop through every item per item in outer array (width)
        for (j = 0; j < w; j++)
        {
            // Save transposed data.
            t[i][j] = a[j][i];
        }
    }

    return t;
};

// From MDC.
if (!Array.prototype.filter)
{
    Array.prototype.filter = function(fun /*, thisp*/)
    {
        var len = this.length >>> 0;
        if (typeof fun != "function")
            throw new TypeError();

        var res = [];
        var thisp = arguments[1];
        for (var i = 0; i < len; i++)
        {
            if (i in this)
            {
                var val = this[i]; // in case fun mutates this
                if (fun.call(thisp, val, i, this))
                    res.push(val);
            }
        }

        return res;
    };
}

// From MDC.
if (!Array.prototype.forEach)
{
    Array.prototype.forEach = function(fun /*, thisp*/)
    {
        var len = this.length >>> 0;
        if (typeof fun != "function")
            throw new TypeError();

        var thisp = arguments[1];
        for (var i = 0; i < len; i++)
        {
            if (i in this)
                fun.call(thisp, this[i], i, this);
        }
    };
}

// From MDC.
if (!Array.prototype.map)
{
    Array.prototype.map = function(fun /*, thisp*/)
    {
        var len = this.length >>> 0;
        if (typeof fun != "function")
            throw new TypeError();

        var res = new Array(len);
        var thisp = arguments[1];
        for (var i = 0; i < len; i++)
        {
            if (i in this)
                res[i] = fun.call(thisp, this[i], i, this);
        }

        return res;
    };
}

// From MDC.
if (!Array.prototype.reduce)
{
    Array.prototype.reduce = function(fun /*, initial*/)
    {
        var len = this.length >>> 0;
        if (typeof fun != "function")
            throw new TypeError();

        // No value to return if no initial value and an empty array.
        if (len == 0 && arguments.length == 1)
            throw new TypeError();

        var i = 0;
        if (arguments.length >= 2)
        {
            var rv = arguments[1];
        }
        else
        {
            do
            {
                if (i in this)
                {
                    var rv = this[i++];
                    break;
                }

                // If array contains no values, no initial value to return.
                if (++i >= len)
                    throw new TypeError();
            }
            while (true);
        }

        for (; i < len; i++)
        {
            if (i in this)
                rv = fun.call(null, rv, this[i], i, this);
        }

        return rv;
    };
}

// MDC
if (!Array.prototype.some)
{
  Array.prototype.some = function(fun /*, thisp*/)
  {
    var i = 0,
        len = this.length >>> 0;

    if (typeof fun != "function")
      throw new TypeError();

    var thisp = arguments[1];
    for (; i < len; i++)
    {
      if (i in this &&
          fun.call(thisp, this[i], i, this))
        return true;
    }

    return false;
  };
}

})();
