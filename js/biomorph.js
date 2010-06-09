/*
 *  Biomorph.js
 *  Copyright (c) 2010 Cameron McKay.  All rights reserved.
 */
(function($){

var renderCreature = function(spec) {
    var length = spec.length || 0,
        stems = spec.stems || [],
        dir = spec.dir || 0,
        newDir = ((dir % 8) + 8) % 8,
        oldPos = spec.oldPos || {x: 0, y: 0},
        newPos = {
            x: oldPos.x + length * stems[newDir].x,
            y: oldPos.y + length * stems[newDir].y
        },        
        segments = [], a = [], b = [];

    segments.push({start: oldPos, finish: newPos});

    if (length > 1) {
        a = renderCreature($.extend({}, spec, {
            oldPos: newPos,
            length: length - 1,
            dir: dir + 1
        }));
        b = renderCreature($.extend({}, spec, {
            oldPos: newPos,
            length: length - 1,
            dir: dir - 1
        }));        
    }

    return segments.concat(a).concat(b);
};

var drawCreature = function(context, segments) {
        
    segments.forEach(function(segment) {
        var start = segment.start, finish = segment.finish;
        context.beginPath();
        context.moveTo(start.x, -start.y);
        context.quadraticCurveTo(
        start.x + Math.signum(start.x), -start.y - Math.signum(start.y),
        finish.x, -finish.y);
        context.closePath();
        context.stroke();
    });        
    
};

var randomCreature = function() {
    var ret = [];
    for (var i = 0; i < 7; i++) {
        ret.push(bio.gene({val: Number.randomInt(-4, 4)}));
    }
    ret.push(bio.gene({val: Number.randomInt(2, 12), min: 2, max:12})); // length
    ret.push(bio.gene({val: Number.randomInt(1, 2), min: 1, max: 2}));  // line weight
    ret.push(bio.gene({val: Number.randomInt(0, 250), min:0, max: 250, delta: 50})); // red
    ret.push(bio.gene({val: Number.randomInt(0, 250), min:0, max: 250, delta: 50})); // green
    ret.push(bio.gene({val: Number.randomInt(0, 250), min:0, max: 250, delta: 50})); // blue
//    ret.push(bio.gene({val: Number.randomInt(0, 250), min:0, max: 250, delta: 50}));
//    ret.push(bio.gene({val: Number.randomInt(0, 250), min:0, max: 250, delta: 50}));
//    ret.push(bio.gene({val: Number.randomInt(0, 250), min:0, max: 250, delta: 50}));
    return ret;
};

var mutateCreature = function(genes, index) {
    var mutated = genes.slice(0).map(function(gene) { return gene.clone() });
    mutated[index].mutate();
    return mutated;
};

var calculateStems = function(genes) {
    return [
        {x: 0, y: genes[0].val()},
        {x: genes[1].val(), y: genes[2].val()},
        {x: genes[3].val(), y: 0},
        {x: genes[4].val(), y: -genes[5].val()},
        {x: 0, y: -genes[6].val()},
        {x: -genes[4].val(), y: -genes[5].val()},
        {x: -genes[3].val(), y: 0},
        {x: -genes[1].val(), y: genes[2].val()}
    ];
};

var calculateBounds = function(segments) {
    var min = { x: 0, y: 0 };
    var max = { x: 0, y: 0 };
    segments.forEach(function(segment) {
        var start = segment.start, finish = segment.finish;
        min.x = Math.min(start.x, finish.x, min.x);
        min.y = Math.min(start.y, finish.y, min.y);
        max.x = Math.max(start.x, finish.x, max.x);
        max.y = Math.max(start.y, finish.y, max.y);
    });
    return {min: min, max: max };
};

var createOffspring = function(parent) {

    var indices = [];
    for (var i = 0; i < parent.length; i++) {
        indices.push(i);
    }

    var children = [];
    indices.shuffle().slice(0, 8).forEach(function(index) {
        children.push(mutateCreature(parent, index));
    });

    [ parent ].concat(children).forEach(function(genes, index) {
        var segments = renderCreature({
            length: genes[7].val(),
            stems: calculateStems(genes),
            dir: 0,
            oldPos: {x: 0, y: 0}
        });

        var bounds = calculateBounds(segments),
            width = Math.max(Math.abs(bounds.min.x), bounds.max.x) * 2,
            height = Math.max(Math.abs(bounds.min.y), bounds.max.y) * 2,
            factor = 120 / Math.max(width, height),
            scale = {x: factor, y: factor};

        var cell = $("#cell-" + index);
        cell.parent().data("genes", genes);
        
        var context = cell[0].getContext('2d');
        context.save();
        context.clearRect(0, 0, 150, 150);
        context.translate(75, 75);        
        context.scale(scale.x, scale.y);
        context.strokeStyle = "rgb(" + genes[9].val() + ", " + genes[10].val() + ", " + genes[11].val() + ")";
        //console.log(context.strokeStyle);
        context.lineWidth = genes[8].val() / factor;
        context.lineJoin = "miter";
        context.lineCap = "square";
        drawCreature(context, segments, scale);                
        context.restore();
    });

}

$(function() {

    //var parent = randomCreature();
    var parent = [
        bio.gene({val: 1}),
        bio.gene({val: 1}),
        bio.gene({val: 1}),
        bio.gene({val: 1}),
        bio.gene({val: 1}),
        bio.gene({val: 1}),
        bio.gene({val: 1}),
        bio.gene({val: 5}),
        bio.gene({val: Number.randomInt(1, 2), min: 1, max: 2}),  // line weight
        bio.gene({val: Number.randomInt(0, 250), min:0, max: 250, delta: 50}), // red
        bio.gene({val: Number.randomInt(0, 250), min:0, max: 250, delta: 50}), // green
        bio.gene({val: Number.randomInt(0, 250), min:0, max: 250, delta: 50}) // blue
    ];
    createOffspring(parent);

    $('div.cell').click(function() {
        createOffspring($(this).data("genes"));
    });
    
})

})(jQuery);

