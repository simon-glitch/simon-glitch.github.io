Armor items have 3 defense stats each:
* `armor`
* `protection`
* `toughness`

Weapon items have 3 offense stats each:
* `damage`
* `piercing`
* `brute_power`

Shield items also have all 3 defense stats. And all sheild items and weapon items have a `block` stat. The block stat of any item only applies when blocking with it. Doing a shield bash causes it to act as a weapon with `block/4` damage, but the attacker's `piercing` and `brute_power` stats get cut in half when shield bashing. Entities can also block with their limbs, and the `block` stat depends on the entity. For example, villagers have a `block` stat of 10 and can shield bash with their fists, and do double damage when doing so. Other entities do normal shield bash damage, depending on the `block` stat of their limbs.

Entities have all of the defense stats and all of the offense stats.

When an entity is hit, the damage received is calculated as follows, using the offense stats of the attack (and the attacker's weapon), and the defense stats of the defender (and the defender's armor). The defense stats of the defender's shield are also added if the defender is blocking.
* `sub_piercing = piercing * piercing/(piercing + block) (100 - protection*2 - armor/2) / 100`
* `effective_piercing = (1 + (if(sub_piercing < 0.4) then (0.4/(1 + (0.4 - sub_piercing)/2) else (sub_piercing)) * max(1, (base_damage + piercing*2) / (armor + protection/4))))`
* `effect = (base_damage - (armor + block/2 + protection) / max(1, brute_power - (block/4 + armor/effective_piercing + toughness))) / max(1, armor/effective_piercing + toughness - brute_power)`
* `damage_received = if(effect > -3) then base_damage*(3 + effect)/(3 + toughness/damage) else (base_damage/armor) * ((3 + toughness/damage)/-effect)`

Why all this math? Because I like math, duh.

Entities get additional combat boosts:
* First, let `v_l` be the net velocity in meters per second of how fast the attacker is moving towards the defender. If the attack is moving away from the defender, this is negative.
* Second, let `v_r` be how fast the attack is rotating, in radians per second.
* If an entity does a crit attack, it gets +4 to `brute_power`.
    * Mobs that are falling / flying down have all their melee attacks become crit attacks.
* The entity gets `+v_l` to raw `damage`. This reduces raw `damage` if the entity is moving away. If raw `damage` becomes less than or equal to zero, the entity's attack either does not hit, or simply does zero damage. Whichever one the game's code allows.
* The entity gets `+min(3, v_r)` to `brute_power`.
* Mobs get +2 to `piercing` and +1 to `brute_power` when at or below 20% max health; mobs with 2 or less max health always get this boost;
* Arrows get `+sqrt(`their velocity in meters per second`)` to `piercing`;

When a player gains an experience level, they can increase one of their attributes by 1 point. The following attributes exist:
* dexterity    - The player can interact with various blocks to accelerate them by `sqrt(dexterity)` ticks. 
* agility      - The moves `1+log10(1+agility)` time as fast.
* defense      - The player has an `armor` stat of `sqrt(defense)`. 
* constitution - The player has `rounddown(sqrt(constitution))` more max HP.
* strength     - The player has an `attack` stat of `sqrt(strength)`.
* intelligence - The player has a `luck` stat of `sqrt(intelligence)`. This makes them get better loot and affects some other RNG. The player can put copper items in their inventory to decrease luck back to normal.

When two players battle, their luck stat affects the chance of crits. Specifically, when player A hits player B:
* If player A would have normally gotten a crit, and `A.luck < B.luck`, there is a chance of `(B.luck - A.luck)/10` that the crit will be a normal attack instead.
* If player A would have normally not gotten a crit, and `A.luck > B.luck`, there is a chance of `(A.luck - B.luck)/10` that the attack will be a crit instead.
* If `A.luck < B.luck`, there is a `(sqrt(B.luck - A.luck))/20` chance player A's attack will just miss. And if it doesn't miss, there is a `(sqrt(B.luck - A.luck))/50` chance player A's attack will get reflected back at player A.
* If a mob has a luck stat, and battles a player or another mob with a luck stat, this same logic will apply. Otherwise, this logic doesn't apply and the player or mob's luck stat is not relevant. For example, wardens have a luck stat of 20, making them annoying to deal with for players under level 400.



There is a new material called enderite, which is the next upgrade from netherite. You get it by mining grend stone, a green variant of end stone. The process to make enderite:
* Smelt grend stone into gren dust.
* Crafting 9 gren dust into 1 gren chunk.
* Craft: Surround 1 gren chunk with can 4 amethyst shards or 8 amethyst dust, to make 1 erlium chunk.
* Grind down 3 erlium chunks into 2 erlium pebbles by dropping an anvil on it.
    * 1 amethyst just can be ground down into 8 amethyst dust by the same method.
    * To make grinding down easier, use a netherite anvil. They never break. It just costs 31 netherite ingots.
* Grind down 3 erlium pebbles into 2 erlium grains
* Grind down 3 erlium grains into 2 erlium dust.
* An ew poion can be made, by brewing with erlium dust as the ingredient, mundane potions in the potion slots, and blazing amethyst dust as the fuel.
    * There is a new ore in the end called cayenite ore.
    * It can be smelted into cayenite ingots, and one cayenite ingot can then be crushed into 8 cayenite dust.
    * One cayenite dust, 4 blaze powder, and 4 nether warts craft 2 inferno powder. Which can then brew 200 potions.
    * Blazing amethyst shards are made by brewing with blaze powder as the ingredient, amethyst shards in the potion slots, and inferno powder as the fuel.
* Optional: One ew potions can be used to brew 3 sweet ew potions, by putting honey bottles in the ingredient slot, and using any fuel.
* A potion of screeching can be made by brewing with ghast tears as the ingredient, either an ew potion or a sweet ew potion in the potion slot, and fuel.
    * The poion of screeching makes a screech when drank. However, it can also be used to craft potions of screaming. If a potion of screeching is used as the ingredient, and potions of slowness are put in the potion slots, the first potion of slowness will become a potion of screeching (allowing it to be reused for more potions of screaming), and the second and third potions become potions of screaming.
* 1 potion of screeching can then crafted together with 4 cinnabar dust, to make 1 erolite.
* Grind down 3 erolite into 2 erolite pebbles.
* Grind down 3 erolite pebbles into 2 erolite grains.
* Grind down 3 erolite grains into 2 erolite dust.
* Smelt 1 erolite dust into refined erolite dust.
* Craft 3 erolite dust and 1 gunpowder into 2 refined erolite grains.
* Craft 3 erolite refined grains and 3 copper nuggets into 2 refined erolite pebbles.
* Crafting 3 refined erolite pebbles and 5 emerald dust into 2 erolite nugget.
* Craft 9 erolite nuggets into 1 erolite ingot.
* Enchant 1 erolite ingot with 10 levels (and 1 lapis lazuli), to make eroline ingots. Master level cleric villagers also have a trade for this.
* Srike 1 erolite ingot with lightning to make 4 ender chunks.
* Crafting 1 erolite ingot with 4 blazing purpur to make 1 enderite nugget.
    * Blazing purpur is made by brewing with blaze powder as the ingredient, popped chorus fruit in the potion slots, and inferno powder as the fuel.
* Craft 9 enderite nuggets into 1 enderite ingot.
* The crafting process is intentionally very convoluted, and requires about 800 grendstone, 90 amethyst shards, and various other things per enderite ingot.

Once you make enderite gear, it is are completely indestructible. It is resistant to cactuses, the void, explosion, and fire. Enderite blocks can't be broken by the ender dragon or the wither. They take takes even longer to mine than reinforced deepslate or trial spawners. However, they can be mined 10x as fast using an enderite pickaxe.

Enderite tools technically have 60000 durability, but they don't take durability damage when used. All tools can now be upgraded to enderite:
* The enderite elytra can fly like a Creative mode elytra.
* The enderite shulker box has as much storage as a double chest. The enderite chest can be put on a donkey to double the donkey's inventory.
* The enderite chest (made by upgrading an ender chest), gives the player 27 more ender chest slots. The first 27 slots are the normal ender chest slots, and normal ender chests can only use those slots. The 27 new slots are only accessible from enderite chests.
* Enderite chests and shulker boxes can be picked up instantly by just using the attack button on them, and don't drop as actual items when doing this.
* The enderite beacon, which can be upgraded up to 8 tiers and has new effects.
* The enderite hoe, which hoes all blocks within range or the player and water instantly. It also harvests any crops and replants them too. It does not harvest pumpkins and melons.
* The enderite bow, which can shoot fireballs using blaze powder. Or it can shoot up to 16 wind charges using a single wind charge. It can also shoot spears, which do arrow damage + their spear damage. Any arrows shot with this bow go completely straight and never fall down. It can also shoot ender pearls, also causing them to go completely straight.
* The enderite trident always has loyalty or riptide. It can switch between the modes by just holding the attack button while looking in the air for two seconds. It also causes fish within 50 blocks to swim towards the player. And it acts as an all purpose diamond tool underwater with no debuff to mining speed.
* The enderite shield, which is upgraded from the netherite sheild, and simply has more protection. It also gives extra 20% resistance to fire, explosions, and magic.
* The enderite shears, which give 2x as much wool when shearing sheep, and can be used to shear other mobs too, creating tons of new mob variants. Like the horns on a cow can be sheared off. Or a pig's tail can be sheared off. Or a bee's wings can be sheared off. Or a villager's nose can be sheared off. Animals regrow these parts when sheared. Unless you wax them after shearing them. Sheep can also be waxed so they won't grow their wool back. Villagers without noses can't be traded with, and automatically set the player's reputation to -200 every tick.
* The enderite golem, which is immortal, but can be turned into a statue by using an amethyst shard on it. It can teleport around, and if it falls in the void, it will teleport to the world spawn. It also teleports to the world spawn if it gets stuck in blocks and can't find anywhere to teleport to.
* The enderite cross bow, which can load up to 4 arrows at once and shoot them in rapid succession.
* The enderite fishing rod, which fishes much better loot and can also fish 2 to 4 fish at once.
* The flint and enderite, which can light furnaces and brewing stands (for brewing, it acts like blaze powder). It can also instantly wake up a copper golem and oxidize it. It can also send a strong redstone signal into any block, and can instantly mine wood and foliage, but gives no item in the process. And it can set entities on fire directly, and they will be on fire for 20 seconds. It also heals fire resistant mobs.
* The enderite mace, which does more damage and reduces the player's fall damage by 30% if they fail to hit a mob with it.
* The enderite bed, which works in the End and the Nether. If the players falls into the void and an enderite bed is within 1500 blocks of them, they will teleport to it.
* The enderite lantern, which has a light level of 200. The same now supports light levels up to 255.
* The enderite carrot / warped fungus on a tick, which makes the mob move a bit faster, and lasts forever.
* The enderite pearl, which is a reusable ender pearl, but it has a 10 second cool down and does not stack.
* The enderite bucket, which holds up to 16 buckets of fluid. It can also holds up to 16 mobs that can be put in buckets, or it can hold any one animal. If a donkey has a chest with items in it, these items are dropped on the ground upon being picked up. Villagers also empty their inventory when picked up.
* Enderite blocks have a fun new note block instrument.
* The enderite spyglass, which gives the player a free cam they can use to look around in other rooms. The free cam can move up to 50 blocks away from the camera. When the camera goes inside a block, the block's faces will be rendered, preventing the player from having X-ray like they would in spectator mode.
* The enderite brush, which is much faster than the normal brush, and can also heal animals slowly.
* The enderite boat, which works in lava but is slower than a strider. It is faster than a normal boat and protects the player from drowned tridents and guardians.
* Enderslime, which is made using enderite dust (1 nugget becomes 8 dust, and 1 dust + 8 slime blocks crafts 8 enderslime). It is twice as bouncy as normal slime blocks, and players don't take damage when landing on it while crouching. Players also don't take kinetic damage if they hit it while flying with elytra.
* Enderhoney, which is like enderslime, being stickier than honey, and players can climb up it.
* The enderite piston, which can move up to 120 blocks.
* The enderite brewing stand, which can brew up to 5 potions at once, but when brewing ew or sweet ew potions, only 3 will be made.

Inferno powder can be used to brew tier three potions, double extended potions, and extended tier two potions. There are also a few new effects you can brew, like Climate Resistance.
* Also, potions of night vision can be brewed onto lapis lazuli to make glowing lapis. Which can be used to enchant up to level 50 in the enchanting table.
* You can take a piece or nether quartz, and brew every potion onto it, to create ender quartz, which can be used to upgrade gier below netherite tier into a super version of the gear. Super gear has helpful bonuses, like super copper armor gives water breathing.

