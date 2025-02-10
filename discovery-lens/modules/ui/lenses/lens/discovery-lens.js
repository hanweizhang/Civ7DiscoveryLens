/**
 * @file discovery-lens
 * @copyright wltk
 * @description Lens shown to highlight discoveries.
 */
import LensManager from '/core/ui/lenses/lens-manager.js';
class DiscoveryLens {
    constructor() {
        this.activeLayers = new Set([
            'fxs-hexgrid-layer',
            'fxs-resource-layer',
            'fxs-culture-borders-layer',
            'mod-discovery-layer'
        ]);
        this.allowedLayers = new Set([
            'fxs-yields-layer'
        ]);
    }
}
LensManager.registerLens('mod-discovery-lens', new DiscoveryLens());
