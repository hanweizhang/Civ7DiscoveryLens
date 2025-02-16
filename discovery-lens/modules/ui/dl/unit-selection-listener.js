import LensManager from '/core/ui/lenses/lens-manager.js';
import { InterfaceMode, InterfaceModeChangedEventName } from '/core/ui/interface-modes/interface-modes.js';

function isScout(type) {
    const unitDef = GameInfo.Units.lookup(type);
    if (unitDef) {
        if (unitDef.UnitType == "UNIT_SCOUT") {
            return true;
        } else {
            // Check for replacements
            const replaceDef = GameInfo.UnitReplaces.lookup(unit.type);
            if (replaceDef != null && replaceDef.ReplacesUnitType == "UNIT_SCOUT") {
                return true;
            }
        }
    }
    return false;
}
function onInterfaceModeChanged() {
    if (InterfaceMode.isInInterfaceMode('INTERFACEMODE_UNIT_SELECTED')) {
        const unitId = UI.Player.getHeadSelectedUnit();
        if (unitId) {
            const unit = Units.get(unitId);
            if (unit && isScout(unit.type)) {
                LensManager.setActiveLens('mod-discovery-lens');
            }
        }
    }
}
// Not listening to "UnitSelectionChanged" event because interface-mode-unit-selected.js's listener will be
// registered after the interface is changed. Hence it's setUnitLens method will reset the lens to default.
window.addEventListener(InterfaceModeChangedEventName, onInterfaceModeChanged);
