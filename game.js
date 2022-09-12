const COLORS = {
  rich_black_fogra_29: 0x0d1b2a,
  oxford_blue: 0x1b263b,
  bdazzled_blue: 0x415a77,
  shadow_blue: 0x778da9,
  platinum: 0xe0e1dd,
  orange_pantone: 0xff9662
  
}
const GAME_CONFIG = {
  type: Phaser.AUTO,
  width: 256,
  height: 128,
  backgroundColor: COLORS.rich_black_fogra_29,
  parent:  document.getElementById( "game-container" ),
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
    autoCenter: Phaser.Scale.Center.CENTER_BOTH,
  },
  physics:{
    default: "arcade",
    arcade:{
      debug: true
    }
  },
  pixelArt: true,
  scene: {
    preload: preload,
    create: create,
    update: update
  }
}

let game = new Phaser.Game( GAME_CONFIG );

/**Handles code that is executed before the scene's Ready
 * state. Includes actions such as fetching resources to
 * be used in the scene.
 */
function preload(){

  this.load.image( "diamond", "./diamond.png" );
  this.load.image( "crate", "crate.png" );
  this.load.spritesheet( "character", "./character_0001.png", { frameWidth: 24, frameHeight: 24 } );

  return;
}

/**Handles code executed once all external resources have
 * been acquired, it is run once at the start of the scene
 * once the scene is in the ready state.
 */
function create(){

  // create a physics object - player
  this.player = this.physics.add.sprite( GAME_CONFIG.width / 2, GAME_CONFIG.height / 2, "character", 0 );
  this.player.setCollideWorldBounds( true );
  this.player.setGravityY( 15 );

  // create a physics object - crate
  this.crate = this.physics.add.image( 50, GAME_CONFIG.height / 2, "crate" );
  this.crate.setCollideWorldBounds( true );
  this.crate.setGravity( 0, 20 );

  // create a normal game object and add it to the simulation
  this.simple_box = this.add.ellipse( 75, GAME_CONFIG.height / 2, 24, 24, COLORS.bdazzled_blue );
  this.physics.world.enableBody( this.simple_box, Phaser.Physics.Arcade.DYNAMIC_BODY );
  this.simple_box.body.setCollideWorldBounds( true );
  this.simple_box.body.setVelocityY( 20 );
  this.simple_box.body.setCircle( 12 );

  // create a physics object - diamond
  this.diamond = this.physics.add.image( 200, GAME_CONFIG.height / 2, "diamond" );
  this.diamond.setCollideWorldBounds( true );
  this.diamond.setGravity( 0, 10 );

  // create a text to show diamonds collected
  this.score = 0;
  this.score_text = this.add.text( GAME_CONFIG.width / 2, 24, `Score: ${this.score}`, { fontSize: "16px" } );
  this.score_text.setOrigin( 0.5, 1 )

  // define simple control keys for character
  this.player_speed = 20;
  let keys = "A,D,SPACE";
  this.controls = this.input.keyboard.addKeys( keys );

  // create simple animations
  // walk animation
  this.anims.create({
    key: "walk",
    frames: [
      { key: "character", frame: 0 },
      { key: "character", frame: 1 },
    ],
    repeat: -1,
    frameRate: 8
  })


  // this.player.play( "walk" );

  // create collsions between character and crate
  // simple collision
  this.physics.add.collider( this.player, this.crate )

  // create collisions between character and diamond
  // slightly more complex, involves collecting diamond on contact
  this.physics.add.collider( this.player, this.diamond, pickDiamond, undefined, this );

  return;
}

function pickDiamond( player, diamond ){
  this.physics.world.disable( diamond );
  diamond.setVisible( false );
  this.score += 1;
  this.score_text.setText( `Score: ${this.score}` );
  return;
}

/**This is the code executed on the main game loop, it is executed
 * once per update.
 */
function update(){

  if( this.controls.A.isDown && this.controls.D.isDown ){
    this.player.setVelocityX( 0 );
    this.player.stop();
    this.player.setFrame( 0 );
  } 
  else if( this.controls.A.isDown  ){
    this.player.setFlipX( false );
    this.player.setVelocityX( -this.player_speed );
    this.player.play( "walk", true ); 
  } 
  else if( this.controls.D.isDown  ){
    this.player.setFlipX( true );
    this.player.setVelocityX( this.player_speed );
    this.player.play( "walk", true );
  }
  else{
    this.player.setVelocityX( 0 );
    this.player.stop();
    this.player.setFrame( 0 );
  }

  return;
}