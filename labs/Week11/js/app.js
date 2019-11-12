var canvas = document.getElementById("renderCanvas"); // Get the canvas element
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

// Declare variables to be used.
var camera,
  cone,
  box,
  torus,
  hemisphericLight,
  directionalLight,
  blueMat,
  whiteMat;
var selectedMesh = null;

var scene = createScene(); //Call the createScene function

function createScene() {
  // Create the scene space
  var scene = new BABYLON.Scene(engine);

  // Add a camera to the scene.
  camera = new BABYLON.ArcRotateCamera(
    "Camera",
    Math.PI / 2,
    Math.PI / 4,
    4,
    BABYLON.Vector3.Zero(),
    scene
  );
  // Attach camera to the canvas.
  camera.attachControl(canvas, true);

  // Define hemispheric light and add to the scene.
  hemisphericLight = new BABYLON.HemisphericLight(
    "HemiLight",
    new BABYLON.Vector3(1, 1, 0),
    scene
  );
  // Define directional light and add to the scene.
  directionalLight = new BABYLON.DirectionalLight(
    "dir01",
    new BABYLON.Vector3(0, -0.5, 1.0),
    scene
  );

  // Add meshes to the scene.
  cone = BABYLON.MeshBuilder.CreateCylinder(
    "cone",
    { diameterTop: 0, tessellation: 4 },
    scene
  );
  box = BABYLON.MeshBuilder.CreateBox("box", { height: 1 }, scene);
  torus = BABYLON.MeshBuilder.CreateTorus("torus", { thickness: 0.3 }, scene);

  // Offset meshes horizontally
  box.position.x = 1.5;
  torus.position.x = -1.5;

  // sphere.addChild(lesserSphere);

  // Define blueMat
  blueMat = new BABYLON.StandardMaterial("ground", scene);
  blueMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
  blueMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
  blueMat.emissiveColor = BABYLON.Color3.Blue();

  // Define whiteMat
  whiteMat = new BABYLON.StandardMaterial("ground", scene);

  //Define GreenMat
  greenMat = new BABYLON.StandardMaterial("ground", scene);
  greenMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
  greenMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
  greenMat.emissiveColor = BABYLON.Color3.Green();

  return scene;
}

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function() {
  //sphere.rotate(BABYLON.Axis.Y, .01, BABYLON.Space.WORLD);
  scene.render();
});

function checkUp() {
  console.log(selectedMesh.rotation.x);
  if (
    cone.rotation.x == box.rotation.x &&
    box.rotation.x == torus.rotation.x &&
    torus.rotation.x == cone.rotation.x
  ) {
    cone.material = greenMat;
    box.material = greenMat;
    torus.material = greenMat;
  }
}

window.addEventListener("keydown", event => {
  if (selectedMesh) {
    if (event.keyCode == 87) {
      TweenLite.to(selectedMesh.rotation, 1, {
        // 20 degrees = .349066 radians
        x: "+=0.349066",
        onComplete: checkUp
      });
    }
    if (event.keyCode == 83) {
      TweenLite.to(selectedMesh.rotation, 1, {
        x: "-=0.349066",
        onComplete: checkUp
      });
    }
  }
});

window.addEventListener("click", function() {
  // Color Changing
  // Sets variable "pickResult" to the object that was clicked in the scene.
  var pickResult = scene.pick(scene.pointerX, scene.pointerY);

  // If there is already a mesh selected, set that to white
  if (selectedMesh) {
    selectedMesh.material = whiteMat;
  }

  // Set the clicked material to blue
  pickResult.pickedMesh.material = blueMat;

  // Fill the selectedMesh variable with the clicked mesh.
  selectedMesh = pickResult.pickedMesh;
});
