// CHARGEMENT MODELE
AFRAME.registerComponent('model_loaded', {
    init: function() {
        var el = this.el;
        el.addEventListener('model-loaded', () => {
            console.log(">>>> modele chargé "+el.id);
        });
        el.addEventListener('model-error', () => {
              console.log(">>>> modele erreur"+el.id);
            });
    }
});
// SHADOW MATERIAL : 1 parametre opacite
AFRAME.registerComponent('shadow-material', {
    schema: {
        opacite: {type: 'number', default: 0.5}
    },
    init: function(){
        let el = this.el;
        let mesh = el.getObject3D('mesh');
        // console.log(mesh);
        if (!mesh){return;}
        mesh.material = new THREE.ShadowMaterial();
        mesh.material.opacity = this.data.opacite;
    }
});