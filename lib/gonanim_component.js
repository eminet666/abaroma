var delai = 500;
AFRAME.registerComponent('goanim', {
    schema: {
        next: { type: 'string', default: '' },
        stop: { type: 'string', default: '' },                
        timescale: { type: 'number', default: 4 },
        loop: { type: 'boolean', default: false },
    },             
    init: function () {
        var el = this.el;
        var id = el.id;
        if (this.data.next) {
            var next = this.data.next;
            var next_array = next.split(',').map(element => element.trim());
            var timescale = this.data.timescale; 
        }
        if (this.data.loop) {
            var loop = this.data.loop;   
        }
            
        if (this.data.stop) {
            console.log("ici");
            var stop = this.data.stop;                 
            var stop_array = stop.split(',').map(element => element.trim());
            console.log("stop : " + stop);
        }                

        el.addEventListener('animation-loop', () => {
            // arrete l'anim de l'entity appelante
            if(!loop) el.setAttribute("animation-mixer", "timeScale: 0;");
            // lance les anims appelées
            if (this.data.next){
                for (let i = 0; i < next_array.length; i++) {
                    //console.log("start : " + next_array[i]);
                    startAnim(next_array[i]);
                }
            }
            // arrête les applis demandées
            if (this.data.stop) {
                for (let i = 0; i < stop_array.length; i++) {
                    //console.log("stop : " + stop_array[i]);
                    stopAnim(stop_array[i]);
                }
            }                    

        });

        el.addEventListener('restart', () => {
            //console.log("emit reçu :"+id);  
            el.setAttribute("animation-mixer", "timeScale: "+timescale );
        });                

        el.addEventListener('stopnow', () => {
            //console.log("emit reçu :"+id);  
            el.setAttribute("animation-mixer", "timeScale: 0");
        });  


    }
}); 

function startAnim(anim) {
    setTimeout(function (param) {
        document.getElementById(anim).emit('restart');
        //console.log("emit restart : " + anim);
    }.bind(null, anim), delai);
}
function stopAnim(anim) {
    setTimeout(function (param) {
        document.getElementById(anim).emit('stopnow');
        //console.log("emit stopnow : " + anim);
    }.bind(null, anim), delai);
} 