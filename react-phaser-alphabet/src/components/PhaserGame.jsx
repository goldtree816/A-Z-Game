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
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const PhaserGame = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    if (gameRef.current) return;

    class LetterScene extends Phaser.Scene {
      constructor() {
        super('LetterScene');
        this.letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        this.currentIndex = 0;
        this.clickCount = 0;
        this.maxRepeats = 5;
        this.letterSprites = [];
      }

      preload() {
        // Load letter images dynamically
        const letterImages = import.meta.glob('../assets/letters/*.png', { eager: true });
        this.letterMap = {};

        for (const path in letterImages) {
          const match = path.match(/\/([A-Z])\.png$/);
          if (match) {
            const letter = match[1];
            this.letterMap[letter] = letterImages[path].default;
            this.load.image(letter, this.letterMap[letter]);
          }
        }

        // Load letter sounds dynamically
        const letterSounds = import.meta.glob('../assets/sounds/*.mp3', { eager: true });
        this.soundMap = {};

        for (const path in letterSounds) {
          const match = path.match(/\/([A-Z])\.mp3$/);
          if (match) {
            const letter = match[1];
            this.soundMap[letter] = letterSounds[path].default;
            this.load.audio(letter, this.soundMap[letter]);
          }
        }
      }

      create() {
        this.matter.world.setBounds().disableGravity();

        // Create player body with label 'player'
        this.player = this.matter.add.circle(400, 550, 20, {
          isStatic: false,
          restitution: 0.9,
          frictionAir: 0.01,
          label: 'player',
        });

        this.playerGraphics = this.add.graphics({ fillStyle: { color: 0xff0000 } });

        this.input.keyboard.on('keydown', (e) => {
          const speed = 10;
          if (e.code === 'ArrowLeft') this.matter.body.translate(this.player, { x: -speed, y: 0 });
          if (e.code === 'ArrowRight') this.matter.body.translate(this.player, { x: speed, y: 0 });
          if (e.code === 'ArrowUp') this.matter.body.translate(this.player, { x: 0, y: -speed });
          if (e.code === 'ArrowDown') this.matter.body.translate(this.player, { x: 0, y: speed });
        });

        // Listen for collision events between player and letters
        this.matter.world.on('collisionstart', this.handleCollision, this);

        this.spawnLetter();
      }

      spawnLetter() {
        // Destroy old letter sprites
        this.letterSprites.forEach(sprite => sprite.destroy());
        this.letterSprites = [];

        if (this.currentIndex >= this.letters.length) {
          this.add.text(300, 250, 'All letters done!', { fontSize: '32px', color: '#fff' });
          return;
        }

        const letter = this.letters[this.currentIndex];
        this.clickCount = 0;

        for (let i = 0; i < this.maxRepeats; i++) {
          const x = Phaser.Math.Between(100, 700);
          const y = Phaser.Math.Between(50, 400);
          const velocityX = Phaser.Math.Between(-5, 5);
          const velocityY = Phaser.Math.Between(-3, 3);

          const letterImage = this.matter.add.image(x, y, letter, undefined, {
            shape: { type: 'circle', radius: 48 },
            restitution: 1,
            friction: 0,
            frictionAir: 0,
            label: `letter_${letter}_${i}`,  // unique label
          })
            .setScale(0.2)
            .setVelocity(velocityX, velocityY)
            .setInteractive();

          letterImage.letterKey = letter;

          this.letterSprites.push(letterImage);
        }
      }

      handleCollision(event) {
        const pairs = event.pairs;

        pairs.forEach(pair => {
          const bodyA = pair.bodyA;
          const bodyB = pair.bodyB;

          // Check for collision between player and letter bodies
          if ((bodyA.label === 'player' && bodyB.label.startsWith('letter_')) ||
              (bodyB.label === 'player' && bodyA.label.startsWith('letter_'))) {
            
            const letterBody = bodyA.label.startsWith('letter_') ? bodyA : bodyB;
            const letterSprite = this.letterSprites.find(sprite => sprite.body === letterBody);

            if (letterSprite) {
              this.sound.play(letterSprite.letterKey);
              letterSprite.destroy();

              this.letterSprites = this.letterSprites.filter(sprite => sprite !== letterSprite);

              this.clickCount++;
              if (this.clickCount >= this.maxRepeats) {
                this.currentIndex++;
                this.spawnLetter();
              }
            }
          }
        });
      }

      update() {
        this.playerGraphics.clear();
        this.playerGraphics.fillCircle(this.player.position.x, this.player.position.y, 20);
      }
    }

    gameRef.current = new Phaser.Game({
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      backgroundColor: '#1a1a1a',
      parent: 'phaser-container',
      scene: LetterScene,
      physics: {
        default: 'matter',
        matter: {
          debug: false,
        },
      },
    });

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return <div id="phaser-container" />;
};

export default PhaserGame;
