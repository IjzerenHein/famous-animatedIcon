/* 
 * Copyright (c) 2014 Gloey Apps
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 * @author: Hein Rutjes (IjzerenHein)
 * @license MIT
 * @copyright Gloey Apps, 2014
 */

/*jslint browser:true, nomen:true, vars:true, plusplus:true*/
/*global define*/

define(function (require, exports, module) {
    'use strict';
    
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var Timer = require('famous/utilities/Timer');
    var AnimatedIcon = require('famous-animatedicon');
    
    // create the main context
    var mainContext = Engine.createContext();

    // Create hamrow
    var modifier = new Modifier({
        align: [0.5, 0.5],
        origin: [0.5, 0.5],
        size: [32, 32],
        transform: Transform.scale(4, 4, 1)
    });
    var renderNode = mainContext.add(modifier);
    
    // Add background
    var back = new Surface({
        classes: ['back']
    });
    renderNode.add(back);

    // Add animation
    var icon = new AnimatedIcon();
    renderNode.add(icon);
    
    var stopAutoToggle = false;
    function toggleShape() {
        var shape = (icon.getShape() + 1) % Object.keys(AnimatedIcon.Shape).length;
        icon.setShape(shape);
        if (!stopAutoToggle) {
            Timer.setTimeout(toggleShape, 2000);
        }
    }
    
    back.on('click', function () {
        stopAutoToggle = true;
        toggleShape();
    });
    
    toggleShape();
});
