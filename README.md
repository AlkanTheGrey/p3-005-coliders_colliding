# p3-005-colliders_colliding
Colliders in Phaser 3.55.2

## Basics

In order to have colisions within your game it is required to include a physics system in your game
configuration. Phaser has two main physics systems, Arcade and Matter. Arcade handles more simple
physics interactions and is generally limited to using rectangular and circular collisions. Matter
physics handles more complex shapes and is overall a more sturdy and robust physics system.

> GAME_CONFIG = {
>   ...
>   physics: { default: 'arcade' }
>   ...
> }

*to include arcade physics in the game*

## Creating Physics Objects
Once a physics system is included, the physics manager plugin within the scene is available.
It has a number of methods to allow for creation of physics objects within its *add* property
that is a reference to a gameObjectFactory for physics enabled game objects.

> this.physics.add.sprite()

> this.physics.add.image()

These are two of methods available for creating a sprite and a sprite and an image game object
that are physics enabled.

Game objects can also be created then added to the physics world. For example you can create a
primitive game object within Phaser ( e.g rectangle, ellipse, e.t.c ) or a normal image and sprite game object and add physics to it.

>this.physics.world.enableBody( this.simple_box, Phaser.Physics.Arcade.DYNAMIC_BODY );

This is achieved by adding the game object to the physics world and specifying the type of physics
it will possess
- **DYNAMIC_BODY:** - this body can be moved within the scene and be moved by other
game object interactions, such as the player,enemies and collectibles.
- **STATIC_BODY:** - this body's psition will remain constant through out the physic simulation,
such as most floors and walls in a platformer.

Unlike the game object that was initialized with physics, these derived physics objects do not
have a *body* property, this is what is added to them. This body component controls the physics
interactions. This is why unlike the normal physics object which can directly access physics
methods such as *setGravity()* and *setCollideWorldBounds()*, Derived physics game objects must
access them through the newly added *body* property.

## Creating Collisions
Once set up physics bodies can be made to collide with other physics body. There are generally
two type of interactions.

The simpler one just enable two game objects to collide in order to avoid overlapping, this is
useful for interactions such as the player and the ground | platforms | walls.
> this.physics.add.collider( *[object_1], [object_2]* );

More complex interactions are those that involve events to ocurr if two given physics objects
collide with each other. Such as player taking damage when in contact with enemies, or 
players picking up collectibles in the game adding to their score.
> this.physics.add.collider(  *[object_1], [object_2], [collide callback], [process callback],*
> *[callback context]* );
- collide callback - *a callback to run when collision is detected, it is passed the 2 objects*
*as parameters.*
- process callback - *a callback that must return either true or false. It must return true or*
*collsion checking will be skipped.*
- callback context - *The scope passed to the callback functions*