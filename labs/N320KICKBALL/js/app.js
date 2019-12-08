// Application level stuff
// Cluttering the global namespace!?!?!
var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

// App variables
var camera, scene, ball, goal, timeoutID, particleSystem;

// Create the scene
scene = createScene();
engine.runRenderLoop(function(){
    scene.render();
});

scene.registerAfterRender(function(){
    if(ball.intersectsMesh(goal, false)){

        // Move Goal
        goal.position.x = (Math.random() * 8) - 4;

        // Play a particle burst
        particleSystem.manualEmitCount = 21;
        particleSystem.start();

        // Position particles
        particleSystem.minEmitBox = ball.position;

        // Put Ball back
        resetBall();
    }
})

function createScene(){

    var scene = new BABYLON.Scene(engine);

    // BASIC SCENE SETUP
    camera = new BABYLON.UniversalCamera("UC", new BABYLON.Vector3(0, 0, -10), scene);
    var light = new BABYLON.DirectionalLight("lighty", new BABYLON.Vector3(0, -.2, .2), scene);

    // ENABLE PHYSICS
    var gravityVector = BABYLON.Vector3(0, -9.81, 0);
    var physicsPLugin = new BABYLON.CannonJSPlugin();
    scene.enablePhysics(gravityVector, physicsPLugin);

    // Setup the Ball
    ball = BABYLON.MeshBuilder.CreateSphere("sphero", {diamete:1}, scene);
    ball.physicsImpostor = new BABYLON.PhysicsImpostor(
        ball, 
        BABYLON.PhysicsImpostor.SphereImpostor, 
        {mass: 1, resitution: .2}, 
        scene
    );
    ball.tag = "ball";

    // Create the Ground for ball to sit on.
    var ground = BABYLON.MeshBuilder.CreateGround("groundish", {height: 20, width: 20, subdivisions: 4}, scene);
    ground.position.y = -3;
    ground.position.z = 9;

    ground.physicsImpostor = new BABYLON.PhysicsImpostor(
        ground,
        BABYLON.PhysicsImpostor.BoxImpostor,
        {mass: 0, resitution: .9},
        scene
    );

    // Make a goal
    goal = new BABYLON.MeshBuilder.CreateBox("goal", {height: 5, width: 5}, scene);
    goal.position.z = 20;
    goal.position.x = (Math.random() * 8) - 4;

    // Make the particleSystem
    particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
    particleSystem.emitter = new BABYLON.Vector3(0,0,0);
    particleSystem.minEmitPower = 1;
    particleSystem.maxEmitPower = 3;
    particleSystem.addVelocityGradient(0,2);

    // Load the particle texture
    particleSystem.particleTexture = new BABYLON.Texture("images/particle.png", scene);

    return scene;
}

function resetBall(){

    // Reset Position
    ball.position = new BABYLON.Vector3(0,0,0);

    // Reset Velocity
    // Linear
    ball.physicsImpostor.setLinearVelocity(new BABYLON.Vector3());
    // Angular
    ball.physicsImpostor.setAngularVelocity(new BABYLON.Vector3());

    // Get rid of the timeout if its still on
    clearTimeout(timeoutID);
}

window.addEventListener("click", function(){
    var pickResult = scene.pick(scene.pointerX, scene.pointerY);
    var selectedObject = pickResult.pickedMesh;

    // Null check
    if(selectedObject){
        if(selectedObject.tag == "ball"){
            // Get a direction away from where the user clicked on the ball
            var surfaceNormal = pickResult.getNormal(true);
            var forceDirection = surfaceNormal.scale(-2000);

            // kick the ball
            selectedObject.physicsImpostor.applyForce(
                forceDirection,
                selectedObject.getAbsolutePosition()
            )

            // Reset Ball after 3 seconds
            timeoutID = setTimeout(resetBall, 3000);
        }
    }
})
