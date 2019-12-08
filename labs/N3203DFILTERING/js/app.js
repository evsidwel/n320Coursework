var canvas = document.getElementById("renderCanvas");
var rgCost = document.getElementById("rgCost");
var infoBox = document.getElementById("infoBox");
var filterButtons = document.querySelectorAll(".filterNav");
var camera, scene, data, selectedPieces;
var selectedType = "all";

// START APPLICATION SETUP
fetch("data/furniture.json", {method:'get'})
    .then(response => response.json())
    .then((jsonData)=>{
        //json representation of the data
        // console.log(jsonData);
        data = jsonData;

        // load in all the models
        data.furniture.forEach((piece, idx)=>{
            var p = BABYLON.SceneLoader.ImportMesh(
                "", "./models/house/", piece.asset, scene,
                (meshes) => {
                    var containerNode = new BABYLON.TransformNode("root");
                    piece.asset = containerNode;
                    piece.asset.dataID = idx;

                    meshes.forEach((mesh)=>{
                        mesh.parent = containerNode;
                    })
                    TweenMax.to(piece.asset.position, 10, {y:4});
                }
            )
        })        
    })

// END APPLICATION SETUP

// START ENGINE SETUP
var engine = new BABYLON.Engine(canvas, true);

scene = createScene();
engine.runRenderLoop(function(){
    scene.render();
})

function createScene(){
    scene = new BABYLON.Scene(engine);

    // add a camera to the scene
    camera = new BABYLON.ArcRotateCamera(
        "c", Math.PI / 2, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene
    );

    // add light to the scene
    var light = new BABYLON.DirectionalLight(
        "l", new BABYLON.Vector3(0, -.5, 1.0), scene
    );

    // var bed = BABYLON.SceneLoader.Append(
    //     "./models/house/", 
    //     "bathroomSink.obj", 
    //     scene
    //     );

    return scene;
}
// END ENGINE SETUP

// START APPLICATION FUNCTION
function selectType(event){

    // Remember what was selected.
    selectedType = event.target.getAttribute("data-type");

    // Reset selected class
    filterButtons.forEach((button)=>{
        button.classList.remove("selected")
    });

    // Add the selected class to the item that was clicked
    event.target.classList.add("selected");

}

function showAvailable(){

    // Get the slider cost value.
    var amount = Number(rgCost.value);

    // Filter selected pieces.
    selectedPieces = data.furniture.filter((piece)=>{
        
        // Only on price if all
        if(selectedType == "all" ){
            return piece.price < amount;
        } else { // Price && type
            return ((piece.price < amount) && (piece.type == selectedType));
        }
    })

    // Hide all pieces.
    data.furniture.forEach((piece)=>{

        TweenLite.to(piece.asset.position, .7, {y:5, onComplete: showFiltered})

    })
}

function showFiltered(){
    selectedPieces.forEach((piece, idx)=>{

        TweenLite.to(piece.asset.position, .7, {y:0, x: idx})

    })
}

window.addEventListener("click", function(){

    var pickResult = scene.pick(scene.pointerX, scene.pointerY);

    var selectedObject = pickResult.pickedMesh;
    
    // Lazy check
    if(selectedObject){

        // Get ID of the object.
        var dataId = selectedObject.parent.dataID;

        // Pull the rest of object info
        var itemInfo = data.furniture[dataId];

        infoBox.innerHTML = `${itemInfo.style} ${itemInfo.type} : $${itemInfo.price}`;

    }
})