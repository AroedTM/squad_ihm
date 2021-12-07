
class raquette {

    posx;
    posy;
    width;
    height;

    constructor(posx,posy,width,height)
    {
        this.posx = posx;
        this.posy = posy;
        this.width = width;
        this.height = height;
    }


    initialize()
    {
        const geometry = new THREE.BoxGeometry(this.width,this.height,1);

        const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
    }

    



    alert_box(){
        alert("hello");
    }
}

