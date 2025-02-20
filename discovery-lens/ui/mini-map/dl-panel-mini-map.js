// Hook up to original panel-mini-map component. Inspired by @craimasjien.

export class DL_PanelMiniMapDecorator {

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

Controls.decorate('panel-mini-map', (component) => new DL_PanelMiniMapDecorator(component));