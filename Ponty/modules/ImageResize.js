"use strict";
var sharp = require('sharp');
function ImageResize(callback, physicalPath, context) {
    let transform = sharp(physicalPath)
        .resize(50, 50);
    if (context.metadata["image_url"].indexOf(".gif") > 0)
        transform = transform.png();
    transform.pipe(callback.stream);
}
exports.ImageResize = ImageResize;
//# sourceMappingURL=ImageResize.js.map