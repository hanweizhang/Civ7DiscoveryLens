import LensManager from '/core/ui/lenses/lens-manager.js';
import { InterfaceMode } from '/core/ui/interface-modes/interface-modes.js';

function shouldApplyLens(type) {
    const unitDef = GameInfo.Units.lookup(type);
    return unitDef?.UnitMovementClass == "UNIT_MOVEMENT_CLASS_RECON"
        || unitDef?.UnitMovementClass == "UNIT_MOVEMENT_CLASS_NAVAL";
}
function onUnitSelectionChanged(data) {
    if (data == null) {
        return;
    }
    // Perform action after other listeners get executed.
    setTimeout(() => {
        if (data.selected && InterfaceMode.isInInterfaceMode('INTERFACEMODE_UNIT_SELECTED')) {
            const unit = Units.get(data.unit);
            if (unit && shouldApplyLens(unit.type)) {
                LensManager.setActiveLens('mod-discovery-lens');
            }
        }
    });
}
engine.on('UnitSelectionChanged', onUnitSelectionChanged);