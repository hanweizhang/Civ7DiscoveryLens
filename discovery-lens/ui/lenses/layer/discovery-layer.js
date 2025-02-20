/**
 * @file discovery-layer
 * @copyright wltk
 * @description Lens layer to highlight discoveries.
 */
import LensManager from '/core/ui/lenses/lens-manager.js';
// From appeal-layer.js
const HexToFloat4 = (hex, alpha = 1) => {
    const r = (hex >> 16) & 0xff;
    const g = (hex >> 8) & 0xff;
    const b = hex & 0xff;
    return { x: r / 255, y: g / 255, z: b / 255, w: Math.min(1, Math.max(0, alpha)) };
};
const DISCOVERY_COLOR = HexToFloat4(0x24D618, .6);
class DiscoveryLensLayer {
    constructor() {
        this.discoveryOverlayGroup = WorldUI.createOverlayGroup("DiscoveryOverlayGroup", 1);
        this.discoveryOverlay = this.discoveryOverlayGroup.addPlotOverlay();
        this.discoveryPlots = [];
    }
    clearOverlay() {
        this.discoveryOverlayGroup.clearAll();
        this.discoveryOverlay.clear();
        this.discoveryPlots = [];
    }
    initLayer() {
    }
    applyLayer() {
        this.clearOverlay();
        const width = GameplayMap.getGridWidth();
        const height = GameplayMap.getGridHeight();
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                if (this.hasDiscovery(x, y)) {
                    this.discoveryPlots.push({x, y});
                }
            }
        }
        this.discoveryOverlay.addPlots(this.discoveryPlots, { fillColor: DISCOVERY_COLOR });
    }
    removeLayer() {
        this.clearOverlay();
    }
    hasDiscovery(plotX, plotY) {
        const isHidden = GameplayMap.getRevealedState(GameContext.localPlayerID, plotX, plotY) == RevealedStates.HIDDEN;
        if (isHidden) {
            return false;
        }
        const constructibles = MapConstructibles.getHiddenFilteredConstructibles(plotX, plotY);
        if (constructibles.length == 0) {
            return false;
        }
        // Discovery can only be the "only" constructible on a plot?
        const instance = Constructibles.getByComponentID(constructibles[0]);
        if (instance) {
            const info = GameInfo.Constructibles.lookup(instance.type);
            return info != null && info.Discovery;
        }
        return false;
    }
    
}
LensManager.registerLensLayer('mod-discovery-layer', new DiscoveryLensLayer());
