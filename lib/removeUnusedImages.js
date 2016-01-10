'use strict';
var definedNotNull = require('./definedNotNull');

module.exports = removeUnusedImages;

function removeUnusedImages(gltf, stats) {
    var usedImageIds = {};
    var textures = gltf.textures;

    // Build hash of used images by iterating through textures
    if (definedNotNull(textures)) {
        for (var textureId in textures) {
            if (textures.hasOwnProperty(textureId)) {
                var id = textures[textureId].source;
                usedImageIds[id] = true;
            }
        }
    }

    // Iterate through images and remove those that are not in the hash
    var numberOfImagesRemoved = 0;
    var images = gltf.images;
    if (definedNotNull(images)) {
        var usedImages = {};

        for (var imageId in images) {
            if (images.hasOwnProperty(imageId)) {
                // If this image is in the hash, then keep it in the glTF asset
                if (definedNotNull(usedImageIds[imageId])) {
                    usedImages[imageId] = images[imageId];
                } else {
                    ++numberOfImagesRemoved;
                }
            }
        }

        if (definedNotNull(stats)) {
            stats.numberOfImagesRemoved += numberOfImagesRemoved;
        }

        gltf.images = usedImages;
    }

// TODO: remove orphan uris

    return gltf;
}