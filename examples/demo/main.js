/**
 * This Source Code is licensed under the MIT license. If a copy of the
 * MIT-license was not distributed with this file, You can obtain one at:
 * http://opensource.org/licenses/mit-license.html.
 *
 * @author: Hein Rutjes (IjzerenHein)
 * @license MIT
 * @copyright Gloey Apps, 2014
 */

/*jslint browser:true, nomen:true, vars:true, plusplus:true*/
/*global define*/

define(function(require, exports, module) {

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

    back.on('click', function() {
        stopAutoToggle = true;
        toggleShape();
    });

    toggleShape();
});
