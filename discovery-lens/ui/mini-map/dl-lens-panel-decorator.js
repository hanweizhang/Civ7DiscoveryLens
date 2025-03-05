
export class DL_LensPanelDecorator {

    constructor(component) {
        this.component = component;
    }

    beforeAttach() {
    }

    afterAttach() {
        this.component.createLensButton("LOC_DISCOVERY", "mod-discovery-lens", "lens-group");
    }

    beforeDetach() {
    }

    afterDetach() {
    }
}

Controls.decorate('lens-panel', (component) => new DL_LensPanelDecorator(component));