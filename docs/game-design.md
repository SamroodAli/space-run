# SPACE RUN
  Help this cute alien collect gems while killing bees and plants on the way !!.

### Story
Blue and his alien friends are on the quest collect the `AllColor` gems. They landed on on planet Blu where platform like land float and charge at you in high speed. Blue and his friends must jump platforms to platforms collecting gems but their journey is not going to be easier as there are deady enemies awaiting them. Good thing blue and his friends brought their trusty laser gun.

### Blue and his friends
From left to right, Blue, Red, Yellow and Green

![blue Alien](../src/assets/player/Blue/alienBlue_front.png)![Red Alien](../src/assets/player/Blue/../Pink/alienPink_front.png)![Green ALien](../src/assets/player/Yellow/alienYellow_front.png)![Green ALien](../src/assets/player/Green/alienGreen_front.png)

### Game Scenes
#### Intro scene

The game asks you for your name before playing. Enter your name as it helps have your name in the game leaderboards. You can compete with your friends. Try to get the higest scores and beat them all.
Once you have entered your name, click `start` or press `Enter` to start the game.

## Game scene

Click `Left mouse button` to jump. Press it again to jump mid air.
Surive by jumping from platforms to platforms. You will lose the game if you fall off a platform or jump but do not make it to the next platform. Fret not, for you can jump with a mouse click. Feel like a jump is not enough, jump again. You got double jumps before landing the next platform.

### Collect gem
The alien's main goal is to collect gems. Gems are worth `10000` points. There is also a suprise hidden in these gems!!. Gems bring your friends into the game.

### Laser Gun
##### Loaded gun

![laser gun](../src/assets/laser/raygunBig.png)
You are in a differnet planet, you have no idea what is awaiting you. Your instincts tell you that collecting those gems might prove to be difficult. So you have decided to bring your trusty revolver laser gun. Press `Space key` to shoot. Other than the obvious laser, there is also an animation whenever you fire.
Life is not that easy though. You can only fire `6 laser shots` before your gun is empty.An empty gun looks different. It looks, well, empty.

#### Empty gun
![empty gun](../src/assets/laser/raygunPurple.png)

Don't worry, you have unlimited lasers. Wait a while for the gun to be reloaded and start firing again. Make sure you are prudent with your shots and does not end up in a scenario where you have a giant bee heading towards you but your gun is reloading.
### Enemies
#### Bees
![Bees](../src/assets/enemies/bee.png)
These bees do sting and kill you. Shoot them down with your laser gun.
#### Flies
![Bees](../src/assets/enemies/fly.png)
Distant cousins of the bees. There are a lot of these cousins. They are crazy but your gun can handle them. They will kill you on contact.

#### Barnacle
![Barnacle](../src/assets/enemeies/../enemies/barnacle.png)
Barnacles are a special deadly alien eating species of plants and can be found on platforms. You do not want to gift these plants to anyone. They will Kill you if you touch them. Kill them with your gun or jump over them if you find them too cute to kill.
 
### Game Over and LeaderBoard
The game ends displaying your score and then fetches the leadeboard with ranks of all players till now. Player's score will also be send to the leaderboard service via a post request.

#### Other Game elements

#### Background
The game is going to use a simple blue background
#### Mountains
Mountains have a simpler recycling system where the mountains passing the screen are put to the right most end of the screen on a loop

#### Player
The player's y-position can move with jump, but his x-position will be stationary. The game leaves an impression that the player is running whereas like all endless runner games, only the platforms move.
#### Plaforms
The platforms are going to be created via object pooling with custom height and velocity. They will also have different display width.

#### Gem
Gems are collectables the player can collect. On overlap with player, it is object pooled and killed with a tweens animation

#### Enemies
Enemies are game objects that on collision kills the player. The game is over on collision. The player can also shoot down enemeies with the laser gun

#### Laser gun
The laser gun shoots lasers with the `space key` and can kill enemies in the game. The gun after 6 shots is empty and needs 1.5 seconds to reload. It has animation for states firing and empty.


### Game mechanisms

#### Jump
The player jumps by setting velocityY

#### Double Jump
The player is able to jump again mid air after which he cannot jump again using velocityY again. His ability to jump is restored after landing on a platform

#### Laser
The laser starts from the gun's position and fires using velocityX

#### Gun
The gun is always fixed next to the player

#### Collision with enemies
Collision with enemies result in the player making a small jump and then falling off screen resulting in game over. The collision with platforms are removed.


#### Overlap with gems
The player collects gem with an overlap function. It increases his score considerably. The gems use object pooling to save on resources.

#### Object pooling
All items in game except mountains use object pooling to save resources. The objects on various conditions are put in a group called the pool whenever they are killed. The first item from the pool is added to the group for the next render of the object.
