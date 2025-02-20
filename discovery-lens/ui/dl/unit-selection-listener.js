import LensManager from '/core/ui/lenses/lens-manager.js';
import { InterfaceMode } from '/core/ui/interface-modes/interface-modes.js';

function isScout(type) {
    const unitDef = GameInfo.Units.lookup(type);
    if (unitDef) {
        if (unitDef.UnitType == "UNIT_SCOUT") {
            return true;
        } else {
            // Check for replacements
            const replaceDef = GameInfo.UnitReplaces.lookup(type);
            if (replaceDef != null && replaceDef.ReplacesUnitType == "UNIT_SCOUT") {
                return true;
            }
        }
    }
    return false;
}
function onUnitSelectionChanged(data) {
    if (data == null) {
        return;
    }
    // Perform action after other listeners get executed.
    setTimeout(() => {
        if (data.selected && InterfaceMode.isInInterfaceMode('INTERFACEMODE_UNIT_SELECTED')) {
            const unit = Units.get(data.unit);
            if (unit && isScout(unit.type)) {
                LensManager.setActiveLens('mod-discovery-lens');
            }
        }
    });
}
engine.on('UnitSelectionChanged', onUnitSelectionChanged);