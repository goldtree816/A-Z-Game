// import React, { useEffect, useRef } from 'react';
// import Phaser from 'phaser';
// //import clickSound from '../assets/sounds/click.mp3';

// const PhaserGame = () => {
//   const gameRef = useRef(null);

//   useEffect(() => {
//     if (gameRef.current) return;

//     class LetterScene extends Phaser.Scene {
//       constructor() {
//         super('LetterScene');
//         this.letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
//         this.currentIndex = 0;
//         this.clickCount = 0;
//         this.maxRepeats = 5;
//         this.letterSprites = [];
//       }

//       preload() {
//         // Dynamically import all letter images using import.meta.glob
//         const letterImages = import.meta.glob('../assets/letters/*.png', { eager: true });
//         this.letterMap = {};

//         for (const path in letterImages) {
//           const match = path.match(/\/([A-Z])\.png$/);
//           if (match) {
//             const letter = match[1];
//             this.letterMap[letter] = letterImages[path].default;
//             this.load.image(letter, this.letterMap[letter]);
//           }
//         }

//         //this.load.audio('click', clickSound);
//       }

//       create() {
//         //this.sound.add('click');
//         this.matter.world.setBounds().disableGravity();

//         // Create a movable player (red circle)
//         this.player = this.matter.add.circle(400, 550, 20, {
//           isStatic: false,
//           restitution: 0.9,
//           frictionAir: 0.01,
//         });

//         this.playerGraphics = this.add.graphics({ fillStyle: { color: 0xff0000 } });
//         this.input.keyboard.on('keydown', (e) => {
//           const speed = 5;
//           if (e.code === 'ArrowLeft') this.matter.body.translate(this.player, { x: -speed, y: 0 });
//           if (e.code === 'ArrowRight') this.matter.body.translate(this.player, { x: speed, y: 0 });
//           if (e.code === 'ArrowUp') this.matter.body.translate(this.player, { x: 0, y: -speed });
//           if (e.code === 'ArrowDown') this.matter.body.translate(this.player, { x: 0, y: speed });

//         });

//         this.spawnLetter();
//       }

//       spawnLetter() {
//         // Clean up existing letters
//         this.letterSprites.forEach(sprite => sprite.destroy());
//         this.letterSprites = [];

//         if (this.currentIndex >= this.letters.length) {
//           this.add.text(300, 250, 'All letters done!', { fontSize: '32px', color: '#fff' });
//           return;
//         }

//         const letter = this.letters[this.currentIndex];
//         this.clickCount = 0;

//         for (let i = 0; i < this.maxRepeats; i++) {
//           const x = Phaser.Math.Between(100, 700);
//           const y = Phaser.Math.Between(50, 400);
//           const velocityX = Phaser.Math.Between(-5, 5);
//           const velocityY = Phaser.Math.Between(-3, 3);

//           const letterImage = this.matter.add.image(x, y, letter)
//             .setCircle(48)
//             .setBounce(1)
//             .setFriction(0)
//             .setFrictionAir(0)
//             .setScale(0.2)
//             .setVelocity(velocityX, velocityY)
//             .setInteractive();

//           letterImage.on('pointerdown', () => {
//             this.sound.play('click');
//             letterImage.destroy();
//             this.clickCount++;

//             if (this.clickCount >= this.maxRepeats) {
//               this.currentIndex++;
//               this.spawnLetter();
//             }
//           });

//           this.letterSprites.push(letterImage);
//         }
//       }

//       update() {
//         // Redraw player
//         this.playerGraphics.clear();
//         this.playerGraphics.fillCircle(this.player.position.x, this.player.position.y, 20);
//       }
//     }

//     gameRef.current = new Phaser.Game({
//       type: Phaser.AUTO,
//       width: 800,
//       height: 600,
//       backgroundColor: '#1a1a1a',
//       parent: 'phaser-container',
//       scene: LetterScene,
//       physics: {
//         default: 'matter',
//         matter: {
//           debug: false,
//         },
//       },
//     });

//     return () => {
//       if (gameRef.current) {
//         gameRef.current.destroy(true);
//         gameRef.current = null;
//       }
//     };
//   }, []);

//   return <div id="phaser-container" />;
// };

// export default PhaserGame;

// import React, { useEffect, useRef } from 'react';
// import Phaser from 'phaser';

// const PhaserGame = () => {
//   const gameRef = useRef(null);

//   useEffect(() => {
//     if (gameRef.current) return;

//     class LetterScene extends Phaser.Scene {
//       constructor() {
//         super('LetterScene');
//         this.letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
//         this.currentIndex = 0;
//         this.clickCount = 0;
//         this.maxRepeats = 5;
//         this.letterSprites = [];
//       }

//       preload() {
//         // Load letter images dynamically
//         const letterImages = import.meta.glob('../assets/letters/*.png', { eager: true });
//         this.letterMap = {};

//         for (const path in letterImages) {
//           const match = path.match(/\/([A-Z])\.png$/);
//           if (match) {
//             const letter = match[1];
//             this.letterMap[letter] = letterImages[path].default;
//             this.load.image(letter, this.letterMap[letter]);
//           }
//         }

//         // Load letter sounds dynamically
//         const letterSounds = import.meta.glob('../assets/sounds/*.mp3', { eager: true });
//         this.soundMap = {};

//         for (const path in letterSounds) {
//           const match = path.match(/\/([A-Z])\.mp3$/);
//           if (match) {
//             const letter = match[1];
//             this.soundMap[letter] = letterSounds[path].default;
//             this.load.audio(letter, this.soundMap[letter]);
//           }
//         }
//       }

//       create() {
//         this.matter.world.setBounds().disableGravity();

//         // Create player body with label 'player'
//         this.player = this.matter.add.circle(400, 550, 20, {
//           isStatic: false,
//           restitution: 0.9,
//           frictionAir: 0.01,
//           label: 'player',
//         });

//         this.playerGraphics = this.add.graphics({ fillStyle: { color: 0xff0000 } });

//         this.input.keyboard.on('keydown', (e) => {
//           const speed = 10;
//           if (e.code === 'ArrowLeft') this.matter.body.translate(this.player, { x: -speed, y: 0 });
//           if (e.code === 'ArrowRight') this.matter.body.translate(this.player, { x: speed, y: 0 });
//           if (e.code === 'ArrowUp') this.matter.body.translate(this.player, { x: 0, y: -speed });
//           if (e.code === 'ArrowDown') this.matter.body.translate(this.player, { x: 0, y: speed });
//         });

//         // Listen for collision events between player and letters
//         this.matter.world.on('collisionstart', this.handleCollision, this);

//         this.spawnLetter();
//       }

//       spawnLetter() {
//         // Destroy old letter sprites
//         this.letterSprites.forEach(sprite => sprite.destroy());
//         this.letterSprites = [];

//         if (this.currentIndex >= this.letters.length) {
//           this.add.text(300, 250, 'All letters done!', { fontSize: '32px', color: '#fff' });
//           return;
//         }

//         const letter = this.letters[this.currentIndex];
//         this.clickCount = 0;

//         for (let i = 0; i < this.maxRepeats; i++) {
//           const x = Phaser.Math.Between(100, 700);
//           const y = Phaser.Math.Between(50, 400);
//           const velocityX = Phaser.Math.Between(-5, 5);
//           const velocityY = Phaser.Math.Between(-3, 3);

//           const letterImage = this.matter.add.image(x, y, letter, undefined, {
//             shape: { type: 'circle', radius: 48 },
//             restitution: 1,
//             friction: 0,
//             frictionAir: 0,
//             label: `letter_${letter}_${i}`,  // unique label
//           })
//             .setScale(0.2)
//             .setVelocity(velocityX, velocityY)
//             .setInteractive();

//           letterImage.letterKey = letter;

//           this.letterSprites.push(letterImage);
//         }
//       }

//       handleCollision(event) {
//         const pairs = event.pairs;

//         pairs.forEach(pair => {
//           const bodyA = pair.bodyA;
//           const bodyB = pair.bodyB;

//           // Check for collision between player and letter bodies
//           if ((bodyA.label === 'player' && bodyB.label.startsWith('letter_')) ||
//               (bodyB.label === 'player' && bodyA.label.startsWith('letter_'))) {

//             const letterBody = bodyA.label.startsWith('letter_') ? bodyA : bodyB;
//             const letterSprite = this.letterSprites.find(sprite => sprite.body === letterBody);

//             if (letterSprite) {
//               this.sound.play(letterSprite.letterKey);
//               letterSprite.destroy();

//               this.letterSprites = this.letterSprites.filter(sprite => sprite !== letterSprite);

//               this.clickCount++;
//               if (this.clickCount >= this.maxRepeats) {
//                 this.currentIndex++;
//                 this.spawnLetter();
//               }
//             }
//           }
//         });
//       }

//       update() {
//         this.playerGraphics.clear();
//         this.playerGraphics.fillCircle(this.player.position.x, this.player.position.y, 20);
//       }
//     }

//     gameRef.current = new Phaser.Game({
//       type: Phaser.AUTO,
//       width: 800,
//       height: 600,
//       backgroundColor: '#1a1a1a',
//       parent: 'phaser-container',
//       scene: LetterScene,
//       physics: {
//         default: 'matter',
//         matter: {
//           debug: false,
//         },
//       },
//     });

//     return () => {
//       if (gameRef.current) {
//         gameRef.current.destroy(true);
//         gameRef.current = null;
//       }
//     };
//   }, []);

//   return <div id="phaser-container" />;
// };

// export default PhaserGame;

//****************************************** */

// import React, { useEffect, useRef } from 'react';
// import Phaser from 'phaser';

// const PhaserGame = () => {
//   const gameRef = useRef(null);

//   useEffect(() => {
//     if (gameRef.current) return;

//     class LetterScene extends Phaser.Scene {
//       constructor() {
//         super('LetterScene');
//         this.letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
//         this.currentIndex = 0;
//         this.clickCount = 0;
//         this.maxRepeats = 5;
//         this.letterSprites = [];
//         this.score = 0;
//       }

//       preload() {
//         // Load letter images
//         const letterImages = import.meta.glob('../assets/letters/*.png', { eager: true });
//         this.letterMap = {};
//         for (const path in letterImages) {
//           const match = path.match(/\/([A-Z])\.png$/);
//           if (match) {
//             const letter = match[1];
//             this.letterMap[letter] = letterImages[path].default;
//             this.load.image(letter, this.letterMap[letter]);
//           }
//         }

//         // Load letter sounds
//         const letterSounds = import.meta.glob('../assets/sounds/*.mp3', { eager: true });
//         this.soundMap = {};
//         for (const path in letterSounds) {
//           const match = path.match(/\/([A-Z])\.mp3$/);
//           if (match) {
//             const letter = match[1];
//             this.soundMap[letter] = letterSounds[path].default;
//             this.load.audio(letter, this.soundMap[letter]);
//           }
//         }

//         // Load bucket and apple
//         this.load.image('bucket', new URL('../assets/icons/bucket.png', import.meta.url).href);
//         this.load.image('apple', new URL('../assets/icons/apple.png', import.meta.url).href);
//       }

//       create() {
//         this.matter.world.setBounds().disableGravity();

//         // Create player
//         this.player = this.matter.add.circle(400, 550, 20, {
//           isStatic: false,
//           restitution: 0.9,
//           frictionAir: 0.01,
//           label: 'player',
//         });

//         this.playerGraphics = this.add.graphics({ fillStyle: { color: 0xff0000 } });

//         // Player movement
//         this.input.keyboard.on('keydown', (e) => {
//           const speed = 10;
//           const { x, y } = this.player.position;
//           if (e.code === 'ArrowLeft') this.matter.body.setPosition(this.player, { x: x - speed, y });
//           if (e.code === 'ArrowRight') this.matter.body.setPosition(this.player, { x: x + speed, y });
//           if (e.code === 'ArrowUp') this.matter.body.setPosition(this.player, { x, y: y - speed });
//           if (e.code === 'ArrowDown') this.matter.body.setPosition(this.player, { x, y: y + speed });
//         });

//         // Score display
//         this.scoreText = this.add.text(16, 16, 'Score: 0', {
//           fontSize: '24px',
//           fill: '#ffffff',
//         });

//         // Collect message display
//         this.collectText = this.add.text(400, 300, '', {
//           fontSize: '22px',
//           color: '#ffff00',
//           fontStyle: 'bold',
//         }).setOrigin(0.5).setVisible(false);

//         // Listen for collision
//         this.matter.world.on('collisionstart', this.handleCollision, this);

//         this.spawnLetter();
//       }

//       updateScore() {
//         this.score += 10;
//         this.scoreText.setText(`Score: ${this.score}`);
//       }

//       showAppleCollectAnimation(letter) {
//         const centerX = 400;
//         const centerY = 200;

//         // Bucket image
//         const bucket = this.add.image(centerX, centerY, 'bucket')
//           .setScale(0.5)
//           .setDepth(1);

//         const apples = [];

//         for (let i = 0; i < 5; i++) {
//           const apple = this.matter.add.image(centerX, centerY, 'apple')
//             .setCircle(20)
//             .setBounce(0.8)
//             .setScale(0.2)
//             .setVelocity(Phaser.Math.Between(-3, 3), Phaser.Math.Between(-6, -3));

//           apples.push(apple);
//         }

//         // Show text
//         this.collectText.setText(`🧺 You collected 5 apples for letter "${letter}"!`);
//         this.collectText.setVisible(true);

//         // Delay cleanup and next spawn
//         this.time.delayedCall(3000, () => {
//           bucket.destroy();
//           apples.forEach(a => a.destroy());
//           this.collectText.setVisible(false);
//           this.spawnLetter();
//         });
//       }

//       spawnLetter() {
//         this.letterSprites.forEach(sprite => sprite.destroy());
//         this.letterSprites = [];

//         if (this.currentIndex >= this.letters.length) {
//           this.add.text(250, 250, '🎉 All letters done! 🎉', {
//             fontSize: '32px',
//             color: '#00ff00',
//           });
//           return;
//         }

//         const letter = this.letters[this.currentIndex];
//         this.clickCount = 0;

//         for (let i = 0; i < this.maxRepeats; i++) {
//           const x = Phaser.Math.Between(100, 700);
//           const y = Phaser.Math.Between(50, 400);
//           const velocityX = Phaser.Math.Between(-5, 5);
//           const velocityY = Phaser.Math.Between(-3, 3);

//           const letterImage = this.matter.add.image(x, y, letter, undefined, {
//             shape: { type: 'circle', radius: 48 },
//             restitution: 1,
//             friction: 0,
//             frictionAir: 0,
//             label: `letter_${letter}_${i}`,
//           })
//             .setScale(0.2)
//             .setVelocity(velocityX, velocityY)
//             .setInteractive();

//           letterImage.letterKey = letter;
//           this.letterSprites.push(letterImage);
//         }
//       }

//       handleCollision(event) {
//         const pairs = event.pairs;

//         pairs.forEach(pair => {
//           const bodyA = pair.bodyA;
//           const bodyB = pair.bodyB;

//           const isPlayerA = bodyA.label === 'player';
//           const isPlayerB = bodyB.label === 'player';
//           const isLetterA = bodyA.label.startsWith('letter_');
//           const isLetterB = bodyB.label.startsWith('letter_');

//           if ((isPlayerA && isLetterB) || (isPlayerB && isLetterA)) {
//             const letterBody = isLetterA ? bodyA : bodyB;
//             const letterSprite = this.letterSprites.find(sprite => sprite.body === letterBody);

//             if (letterSprite) {
//               this.sound.play(letterSprite.letterKey);
//               letterSprite.destroy();

//               this.letterSprites = this.letterSprites.filter(sprite => sprite !== letterSprite);
//               this.updateScore();
//               this.clickCount++;

//               if (this.clickCount >= this.maxRepeats) {
//                 this.showAppleCollectAnimation(this.letters[this.currentIndex]);
//                 this.currentIndex++;
//               }
//             }
//           }
//         });
//       }

//       update() {
//         this.playerGraphics.clear();
//         this.playerGraphics.fillCircle(this.player.position.x, this.player.position.y, 20);
//       }
//     }

//     gameRef.current = new Phaser.Game({
//       type: Phaser.AUTO,
//       width: 800,
//       height: 600,
//       backgroundColor: '#1a1a1a',
//       parent: 'phaser-container',
//       scene: LetterScene,
//       physics: {
//         default: 'matter',
//         matter: {
//           debug: false,
//         },
//       },
//     });

//     return () => {
//       if (gameRef.current) {
//         gameRef.current.destroy(true);
//         gameRef.current = null;
//       }
//     };
//   }, []);

//   return <div id="phaser-container" />;
// };

// export default PhaserGame;

//*************************************************************** */

import React, { useEffect, useRef } from "react";
import Phaser from "phaser";

const PhaserGame = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    if (gameRef.current) return;

    class LetterScene extends Phaser.Scene {
      constructor() {
        super("LetterScene");
        this.letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        this.currentIndex = 0;
        this.clickCount = 0;
        this.maxRepeats = 5;
        this.letterSprites = [];
        this.score = 0;
        this.isRewarding = false;

        this.rewardNameMap = {
          A: "Apple",
          B: "Ball",
          C: "Cat",
          D: "Dog",
          E: "Egg",
          F: "Fish",
          G: "Grapes",
          H: "Hat",
          I: "Ice cream",
          J: "Jug",
          K: "Kite",
          L: "Lion",
          M: "Mango",
          N: "Nest",
          O: "Orange",
          P: "Peacock",
          Q: "Queen",
          R: "Rabbit",
          S: "Sun",
          T: "Tomato",
          U: "Umbrella",
          V: "Van",
          W: "Watch",
          X: "Xylophone",
          Y: "Yatch",
          Z: "Zebra",
        };
      }

      preload() {
        const letterImages = import.meta.glob("../assets/letters/*.png", {
          eager: true,
        });
        this.letterMap = {};
        for (const path in letterImages) {
          const match = path.match(/\/([A-Z])\.png$/);
          if (match) {
            const letter = match[1];
            this.letterMap[letter] = letterImages[path].default;
            this.load.image(letter, this.letterMap[letter]);
          }
        }

        const letterSounds = import.meta.glob("../assets/sounds/*.mp3", {
          eager: true,
        });
        this.soundMap = {};
        for (const path in letterSounds) {
          const match = path.match(/\/([A-Z])\.mp3$/);
          if (match) {
            const letter = match[1];
            this.soundMap[letter] = letterSounds[path].default;
            this.load.audio(letter, this.soundMap[letter]);
          }
        }

        // ✅ Load reward images
        const rewardImages = import.meta.glob("../assets/rewards/*.png", {
          eager: true,
        });
        this.rewardImageMap = {};
        for (const path in rewardImages) {
          const match = path.match(/\/([A-Z])\.png$/);
          if (match) {
            const letter = match[1];
            this.rewardImageMap[letter] = rewardImages[path].default;
            this.load.image(`reward_${letter}`, this.rewardImageMap[letter]);
          }
        }

        // ✅ Load reward sounds
        const rewardSounds = import.meta.glob(
          "../assets/sounds/rewards/*.mp3",
          { eager: true }
        );
        this.rewardSoundMap = {};
        for (const path in rewardSounds) {
          const match = path.match(/\/([A-Z])\.mp3$/);
          if (match) {
            const letter = match[1];
            this.rewardSoundMap[letter] = rewardSounds[path].default;
            this.load.audio(`reward_${letter}`, this.rewardSoundMap[letter]);
          }
        }

        this.load.once("complete", () => {
          console.log(
            "Audio keys loaded after preload:",
            this.cache.audio.getKeys()
          );
        });

        this.load.audio(
          "bgm",
          new URL("../assets/sounds/bgm.mp3", import.meta.url).href
        );

        // this.load.image(
        //   "bucket",
        //   new URL("../assets/icons/bucket.png", import.meta.url).href
        // );
      }

      create() {
        console.log("Audio keys loaded:", this.cache.audio.getKeys());
        this.matter.world.setBounds().disableGravity();

        //background music
        this.backgroundMusic = this.sound.add("bgm", {
          loop: true,
          volume: 0.2, // adjust as needed
        });
        this.backgroundMusic.play();

        this.player = this.matter.add.circle(
          this.scale.width / 2,
          this.scale.height - 50,
          20,
          {
            isStatic: false,
            restitution: 0.9,
            frictionAir: 0.01,
            label: "player",
          }
        );

        this.playerGraphics = this.add.graphics({
          fillStyle: { color: 0xff0000 },
        });

        this.input.keyboard.on("keydown", (e) => {
          const speed = 10;
          const { x, y } = this.player.position;
          if (e.code === "ArrowLeft")
            this.matter.body.setPosition(this.player, { x: x - speed, y });
          if (e.code === "ArrowRight")
            this.matter.body.setPosition(this.player, { x: x + speed, y });
          if (e.code === "ArrowUp")
            this.matter.body.setPosition(this.player, { x, y: y - speed });
          if (e.code === "ArrowDown")
            this.matter.body.setPosition(this.player, { x, y: y + speed });
        });

        this.scoreText = this.add.text(16, 16, "Score: 0", {
          fontSize: "24px",
          fill: "#ffffff",
        });

        this.collectText = this.add
          .text(this.scale.width / 2, this.scale.height / 2, "", {
            fontSize: "22px",
            color: "#ffff00",
            fontStyle: "bold",
          })
          .setOrigin(0.5)
          .setVisible(false);

        this.matter.world.on("collisionstart", this.handleCollision, this);

        this.scale.on("resize", this.resize, this);

        this.spawnLetter();
      }

      resize(gameSize) {
        const width = gameSize.width;
        const height = gameSize.height;

        this.scoreText.setPosition(16, 16);
        this.collectText.setPosition(width / 2, height / 2);
      }

      updateScore() {
        this.score += 10;
        this.scoreText.setText(`Score: ${this.score}`);
      }

      showAppleCollectAnimation(letter) {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        const rewardKey = `reward_${letter}`;
        console.log("🎯 Attempting to play reward sound for:", rewardKey);

        if (!this.sound.get(rewardKey)) {
          this.sound.add(rewardKey);
          console.log(`✅ Registered reward sound: ${rewardKey}`);
        }

        this.sound.play(rewardKey);

        // Show reward image
        const rewardImage = this.add
          .image(centerX, centerY, rewardKey)
          .setScale(0.5)
          .setDepth(1);

        const name = this.rewardNameMap[letter] || letter;
        const rewardText = this.add
          .text(centerX, centerY + 120, `🎁 You got a ${name}!`, {
            fontSize: "24px",
            color: "#ffff00",
            fontStyle: "bold",
            align: "center",
          })
          .setOrigin(0.5)
          .setDepth(2);

        const rewardItems = [];
        for (let i = 0; i < 5; i++) {
          const item = this.matter.add
            .image(centerX, centerY, "apple")
            .setCircle(20)
            .setBounce(0.8)
            .setScale(0.2)
            .setVelocity(
              Phaser.Math.Between(-3, 3),
              Phaser.Math.Between(-6, -3)
            );
          rewardItems.push(item);
        }

        // ✅ Cleanup and move to next letter
        this.time.delayedCall(3000, () => {
          rewardImage.destroy();
          rewardText.destroy();
          rewardItems.forEach((item) => item.destroy());

          this.collectText.setVisible(false);
          this.currentIndex++; // Move to next letter
          this.isRewarding = false;

          if (this.currentIndex >= this.letters.length) {
            this.showFinalCelebration();
          } else {
            this.spawnLetter();
          }
        });
      }

      showFinalCelebration() {
        // this.sound.play('collect'); // Optional final sound

        this.add
          .text(
            this.scale.width / 2,
            this.scale.height / 2,
            "🎊 You collected all letters! 🎊",
            {
              fontSize: "32px",
              color: "#00ff00",
              fontStyle: "bold",
            }
          )
          .setOrigin(0.5);

        // Falling apples as confetti
        for (let i = 0; i < 20; i++) {
          const x = Phaser.Math.Between(100, this.scale.width - 100);
          const y = -50;
          this.matter.add
            .image(x, y, "apple")
            .setCircle(20)
            .setScale(0.2)
            .setBounce(0.8)
            .setVelocity(Phaser.Math.Between(-1, 1), Phaser.Math.Between(4, 6));
        }
      }

      spawnLetter() {
        this.letterSprites.forEach((sprite) => sprite.destroy());
        this.letterSprites = [];

        if (this.currentIndex >= this.letters.length) {
          this.add.text(
            this.scale.width / 2 - 150,
            this.scale.height / 2,
            "🎉 All letters done! 🎉",
            {
              fontSize: "32px",
              color: "#00ff00",
            }
          );
          return;
        }

        const letter = this.letters[this.currentIndex];
        this.clickCount = 0;

        const spacing = this.scale.width / (this.maxRepeats + 1);
        const y = Phaser.Math.Between(100, this.scale.height / 2);

        for (let i = 0; i < this.maxRepeats; i++) {
          const x = spacing * (i + 1);

          const letterImage = this.matter.add
            .image(x, y, letter, undefined, {
              shape: { type: "circle", radius: 48 },
              restitution: 1,
              friction: 0,
              frictionAir: 0,
              label: `letter_${letter}_${i}`,
            })
            .setScale(0.2)
            .setVelocity(Phaser.Math.Between(-1, 1), Phaser.Math.Between(-1, 1))
            .setInteractive();

          letterImage.letterKey = letter;
          this.letterSprites.push(letterImage);
        }
      }

      handleCollision(event) {
        const pairs = event.pairs;

        const currentLetter = this.letters[this.currentIndex];

        pairs.forEach((pair) => {
          const bodyA = pair.bodyA;
          const bodyB = pair.bodyB;

          const isPlayerA = bodyA.label === "player";
          const isPlayerB = bodyB.label === "player";

          // ✅ Only allow collision with CURRENT letter
          const isLetterA =
            bodyA.label.startsWith("letter_") &&
            bodyA.label.includes(currentLetter);
          const isLetterB =
            bodyB.label.startsWith("letter_") &&
            bodyB.label.includes(currentLetter);

          if ((isPlayerA && isLetterB) || (isPlayerB && isLetterA)) {
            const letterBody = isLetterA ? bodyA : bodyB;

            const letterSprite = this.letterSprites.find(
              (sprite) => sprite.body === letterBody
            );

            if (letterSprite) {
              console.log("🎯 Collected letter:", letterSprite.letterKey);

              // 🔊 Play letter sound
              this.sound.play(letterSprite.letterKey);

              letterSprite.destroy();

              this.letterSprites = this.letterSprites.filter(
                (sprite) => sprite !== letterSprite
              );

              this.updateScore();
              this.clickCount++;

              // ✅ Trigger reward only ONCE
              if (this.clickCount >= this.maxRepeats && !this.isRewarding) {
                this.isRewarding = true;
                this.showAppleCollectAnimation(currentLetter);
              }
            }
          }
        });
      }

      update() {
        this.playerGraphics.clear();
        this.playerGraphics.fillCircle(
          this.player.position.x,
          this.player.position.y,
          20
        );
      }
    }

    const resizeGame = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (gameRef.current && gameRef.current.scale) {
        gameRef.current.scale.resize(width, height);
      }
    };

    gameRef.current = new Phaser.Game({
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: "#1a1a1a",
      parent: "phaser-container",
      scene: LetterScene,
      physics: {
        default: "matter",
        matter: {
          debug: false,
        },
      },
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    });

    window.addEventListener("resize", resizeGame);

    return () => {
      window.removeEventListener("resize", resizeGame);
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div
      id="phaser-container"
      style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
    />
  );
};

export default PhaserGame;
