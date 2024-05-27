{{version nav
|title=Minecraft 1.13
|edition=Java
|image=Java Edition 1.13 menu.png
|name=[[Update Aquatic]]<ref name=merge>{{Mcnet|java-edition-technically-updated|Java Edition Technically Updated|January 24, 2018}}</ref>
|date=July 18, 2018
|clienthash=c0b970952cdd279912da384cdbfc0c26e6c6090b
|jsonhash=1efd5dfcae060b847706500e408a76674922de89
|serverhash=d0caafb8438ebd206f99930cfaecfa6c9a13dca0
|prevparent=1.12
|prev=1.12.2
|next=1.13.1
|nextparent=1.14
}}
{{for|a guide about all content in this release and the other releases of the Update Aquatic|Java Edition guides/Update Aquatic}}
{{distinguish|Bedrock Edition 1.13.0}}

'''1.13''', the first release of the '''[[Update Aquatic]]''',<ref>{{Mcnet|update-aquatic-out-java|Update Aquatic Out On Java!|July 18, 2018|Adrian Östergård}}</ref> is a major update to {{el|je}} released on July 18, 2018. It focused mainly on ocean content and technical features.<ref name="customcrafting">{{tweet|Dinnerbone|856505341479145472|It'll probably be in 1.13 at this point, I'm afraid :( It'll be a more bugfixy and technical update, so it will get more love then.|April 24, 2017}}</ref><ref>{{tweet|Dinnerbone|919870475249078272|Remember that 1.13 is a technical update to make things crash less, run faster, & easier for us to add/change stuff later. Like new blocks!|October 16, 2017}}</ref> Specifically, new blocks, such as [[blue ice]], [[coral]], [[conduit]]s, [[kelp]], [[sea pickle]]s, [[stripped log]]s, [[wood]], and [[turtle egg]]s were added, as well as new items such as buried treasure [[exploration map]]s, [[debug stick]]s, [[buckets of fish]], [[hearts of the sea]], [[phantom membrane]]s, [[trident]]s, and much more. Also, [[water]] is more transparent than before and the color was changed to match specific biomes, while it was only dark blue before 1.13. In addition, [[dolphin]]s, [[drowned]], [[fish mob]]s, [[phantom]]s, and [[turtle]]s were added, as well as new biomes, a new [[buffet]] world type (a stopgap replacement for the [[Old Customized|customized]] world type), and new generated structures. This update also added many commands and changed the format of existing commands, and added many new technical aspects, such as [[data pack]]s and [[tag]]s.

This update was originally intended to be released as two separate updates with 1.13, originally named ''Technically Updated'', having the technical changes, and 1.14, originally to be called the ''Update Aquatic'', having all the ocean features, however they were combined into one big update,<ref name=merge/> and as such snapshots from [[17w43a]] to [[18w06a]] mainly just added or modified commands.

The update was originally revealed during the [[MINECON Earth 2017]] livestream on November 18, 2017.<ref name="Aquatic">{{ytl|mAapz_nIC_Y|The Update Aquatic Is Coming To Minecraft Spring 2018!}}, November 18, 2017</ref>
Initially, 1.13 was scheduled to be released on May 30, 2018.<ref>{{tweet|docm77|1001757427480649728|Minecraft Update Aquatic was supposed to come out today. It is pushed back to make sure all crucial bugs are fixed. Awesome!|May 30, 2018}}</ref> However, the release was pushed back to July 18, 2018 to fix critical bugs.

== Additions ==

=== Blocks ===

; [[Air]] variants
* <code>cave_air</code> and <code>void_air</code>.
** Both have the exact same properties as <code>air</code>.
** <code>cave_air</code> is generated in caves.
** <code>void_air</code> is used internally for blocks above (>255) and below (<0) the world, and in unloaded chunks.

; [[File:Blue Ice JE1.png|width=32x32]][[Blue ice]]
* Generates in [[iceberg]]s.
* Slippier than [[ice]] and [[packed ice]].
* Crafted using 9 packed ice.

; [[File:Bubble Column JE1 BE1.png|width=65x65]][[Bubble column]]s
* Created by [[magma block]]s or [[soul sand]] in water as far up as all blocks are water sources.
** Magma block columns pull entities down: they will stop items from floating up in water and sink boats.
** Soul sand columns push entities up.

; {{Animate|Spruce Button JE1 BE1.png;Birch Button JE1 BE1.png;Jungle Button JE1 BE1.png;Acacia Button JE1 BE1.png;Dark Oak Button JE1 BE1.png;Spruce Pressure Plate JE1 BE1.png;Birch Pressure Plate JE1 BE1.png;Jungle Pressure Plate JE1 BE1.png;Acacia Pressure Plate JE1 BE1.png;Dark Oak Pressure Plate JE1 BE1.png;Spruce Trapdoor JE1 BE1.png;Birch Trapdoor JE1 BE1.png;Jungle Trapdoor JE1 BE1.png;Acacia Trapdoor JE1 BE1.png;Dark Oak Trapdoor JE1 BE1.png|32px}}[[Button]]s, [[pressure plate]]s and [[trapdoor]]s
* Now have separate textures for all 6 types of wood.

; [[File:Carved Pumpkin (S) JE2.png|width=32x32]][[Carved pumpkin]]s
* A new block that has the old pumpkin texture.
** [[File:Pumpkin JE1 BE1.png|width=25x25]]Normal pumpkin blocks no longer have a face.
** Right-clicking a pumpkin block with [[shear]]s will turn it into a carved pumpkin and make it spit out 4 [[pumpkin seeds]].

; [[File:Conduit JE1 BE1.png|width=40x40]][[Conduit]]s
* Crafted using 1 [[heart of the sea]] and 8 [[nautilus shell]]s.
* Can be activated by placing [[prismarine]], dark prismarine, prismarine bricks and/or [[sea lantern]]s in 5×5 open squares around it.
** When active, will affect nearby players in water with the [[Conduit Power]] status effect.
*** Conduit power stops the breath meter from running out, gives underwater night vision and increases mining speed.
* A complete structure will fully power the conduit.
** When active at full power, the range will increase and hostile mobs within 8 blocks will take damage.
*** The eye of the [[conduit]] will show whether it's hunting for hostile mobs or not: it will show an open eye when it's looking out for hostile mobs, and a closed eye otherwise.
* Emits a strong glow, at light level 15.

; {{Animate|Tube Coral JE1 BE1.png;Brain Coral JE1 BE1.png;Bubble Coral JE1 BE1.png;Fire Coral JE2 BE1.png;Horn Coral JE1 BE1.png|32px}}[[Coral]]
* Comes in 5 different variants, each with a different type: tube (blue), brain (pink), bubble (purple), fire (red), horn (yellow).
* Can only be placed underwater.
** {{Animate|Dead Tube Coral JE1 BE1.png;Dead Brain Coral JE1 BE1.png;Dead Bubble Coral JE1 BE1.png;Dead Fire Coral JE1 BE1.png;Dead Horn Coral JE1 BE1.png|26px}}If placed on land, it will die and turn gray.
* Naturally generates in [[coral reef]]s.
* Can only be obtained with a tool enchanted with [[Silk Touch]].

; {{Animate|Tube Coral Block JE2 BE1.png;Brain Coral Block JE2 BE1.png;Bubble Coral Block JE2 BE1.png;Fire Coral Block JE2 BE1.png;Horn Coral Block JE2 BE2.png|32px}}[[Coral block]]s
* Comes in the same 5 variants as coral: tube (blue), brain (pink), bubble (purple), fire (red), horn (yellow).
* Must be mined with a Silk Touch tool in order to drop itself, otherwise they drop a dead coral block.
** Each variant has a dead (gray) counterpart.
** Turns into a dead coral block if none of its six sides are touching water, although not instantly.
* Like coral, it naturally generates in [[coral reef]]s.

; {{Animate|Tube Coral Fan JE1 BE2.png;Brain Coral Fan JE1 BE2.png;Bubble Coral Fan JE1 BE2.png;Fire Coral Fan JE1 BE2.png;Horn Coral Fan JE1 BE2.png|32px}}[[Coral fan]]s
* Comes in the same 5 variants as coral: tube (blue), brain (pink), bubble (purple), fire (red), horn (yellow).
* Can be placed underwater on the sides and tops of blocks.
* Can be placed in air.
** Will turn into dead coral fans after a short moment if this is the case.
* Naturally generates on the sides of [[coral block]]s in [[coral reef]]s.
* Can only be obtained with a tool enchanted with [[Silk Touch]].

; {{Animate|Dead Tube Coral Block JE2 BE1.png;Dead Brain Coral Block JE2 BE1.png;Dead Bubble Coral Block JE2 BE1.png;Dead Fire Coral Block JE2 BE1.png;Dead Horn Coral Block JE2 BE1.png|32px}}[[Dead coral block]]s
* Comes in the same 5 variants as coral: tube, brain, bubble, fire, horn.
* Obtained when mining a coral block without a Silk Touch tool, or when none of the six sides of a coral block are touching the water.
* Cannot be turned back into coral.

; {{Animate|Dead Tube Coral Fan JE1 BE2.png;Dead Brain Coral Fan JE1 BE2.png;Dead Bubble Coral Fan JE1 BE2.png;Dead Fire Coral Fan JE1 BE2.png;Dead Horn Coral Fan JE1 BE2.png|32px}}[[Dead coral fan]]s
* Comes in the same 5 variants as coral: tube, brain, bubble, fire, horn.
* Coral fans turn into them when placed out of water.
* Can only be obtained with a tool enchanted with [[Silk Touch]].

; [[File:Dried Kelp Block JE1 BE2.png|width=32x32]][[Dried kelp block]]s
* Can be used as fuel in a furnace
** Smelts 20 items.
* Crafted from [[dried kelp]], and can also be crafted back into dried kelp.

; [[File:Kelp JE3 BE2.gif|width=64x64]][[Kelp]]
* Can only be placed underwater, requiring at least one water block above it.
** Can be placed on dry land by using the {{cmd|setblock}} command.
* Generate in [[ocean]] biomes, except warm oceans.
* Can grow multiple blocks high.
* Has animated textures.
* Can be smelted into dry kelp.

; {{Animate|Prismarine Stairs (N) JE1 BE1.gif;Prismarine Brick Stairs (N) JE1 BE1.png;Dark Prismarine Stairs (N) JE1 BE1.png;Prismarine Slab JE1 BE1.png;Prismarine Brick Slab JE1 BE1.png;Dark Prismarine Slab JE1 BE1.png|32px}}[[Prismarine]] [[stairs]] and [[slab]]s
* Both come in all 3 variants: prismarine, dark prismarine, and prismarine bricks.
* Stairs can be crafted with 6 of their respective material.
* Slabs can be crafted with 3 of their respective material.

; [[File:Seagrass (item) JE2.png|width=32x32]][[Seagrass]]
* Like regular grass, seagrass also comes in a tall variant.
* Has animated textures.
* Generates in oceans (including underwater caves), rivers, and swamplands.
* Can additionally be generated when {{control|using|right clicking}} [[bone meal]] on any block underwater.
* Drops from [[turtle]]s when killed.

; {{Animate|Sea Pickle 1 Dry JE1 BE1.png;Sea Pickle 2 Dry JE1 BE1.png;Sea Pickle 3 Dry JE1 BE1.png;Sea Pickle 4 Dry JE1 BE1.png|32px}}[[Sea pickle]]s
* They generate in warm oceans, especially around [[coral reef]]s.
* Up to 4 of them can be placed on a block.
* {{Animate|Sea Pickle 1 JE1 BE1.png;Sea Pickle 2 JE1 BE1.png;Sea Pickle 3 JE1 BE1.png;Sea Pickle 4 JE1 BE1.png|26px}}Each one adds 3 to the light level, but only when placed underwater.
* Can be smelted into [[lime dye]].

; [[File:Shulker Box.png|width=32x32]][[Shulker box]]es
* Added a non-dyed shulker box (purple).

; {{Animate|Stripped Oak Log (UD) JE1 BE1.png;Stripped Spruce Log (UD) JE1.png;Stripped Birch Log (UD) JE1 BE1.png;Stripped Jungle Log (UD) JE2 BE2.png;Stripped Acacia Log (UD) JE1 BE1.png;Stripped Dark Oak Log (UD) JE1.png|32px}}[[Stripped log]]s
* A barkless variant of [[log]]s.
* Created by {{control|using}} an [[axe]] on a [[log]] block.
* Act as regular logs, and can still be used to craft [[planks]].

; {{Animate|Stripped Oak Wood (UD) JE1 BE1.png;Stripped Spruce Wood (UD) JE1 BE1.png;Stripped Birch Wood (UD) JE1 BE1.png;Stripped Jungle Wood (UD) JE1 BE1.png;Stripped Acacia Wood (UD) JE1 BE1.png;Stripped Dark Oak Wood (UD) JE1 BE1.png|32px}}[[Stripped wood]]
* A variant of [[wood]] with the side texture of stripped logs on all faces.
* Created by {{control|using}} an [[axe]] on a [[wood]] block.
* Act as regular logs, and can still be used to craft [[planks]].

; [[File:Turtle Egg 1.png|width=32x32]][[File:Turtle Egg 2.png|width=32x32]][[File:Turtle Egg 3.png|width=32x32]][[File:Turtle Egg 4.png|width=32x32]][[Turtle egg]]s
* Created by breeding [[turtle]]s.
* Stepping on turtle eggs will break them.
**[[Zombie]]s, [[zombie pigmen]], and [[drowned]] will intentionally step on turtle eggs.
* After a while, they will become slightly cracked and then very cracked.
** Very cracked turtle eggs will eventually hatch into baby turtles.

=== Items ===

; [[File:Arrow of Slow Falling JE1 BE1.png|width=32x32]][[Arrow of Slow Falling]]
* Gives the victim the [[Slow Falling]] status effect.

; [[File:Arrow of the Turtle Master JE1 BE1.png|width=32x32]][[Arrow of the Turtle Master]]
* Functions the same as the potion of the Turtle Master.

; [[File:Map (item) JE1 BE1.png|width=32x32]]Buried treasure [[exploration map]]s
* Found in [[underwater ruins]] or [[shipwrecks]] chests.
* Leads the player to buried treasure.

; [[File:Debug Stick.gif|width=32x32]][[Debug stick]]s
* A technical item used to cycle between different block states.
** Left clicking cycles through states; right clicking cycles through values. Shift clicking will cycle through the states or values in reverse order.

; [[File:Dried Kelp JE1 BE2.png|width=32x32]][[Dried kelp]]
* Obtained from smelting [[kelp]].
* Can be eaten, restoring {{hunger|1}} hunger point.
* Can also be crafted into dried kelp blocks.
* It is eaten faster than other food.
; {{Animate|Bucket of Cod JE1 BE1.png;Bucket of Salmon JE1 BE1.png;Bucket of Pufferfish JE1.png;Bucket of Tropical Fish JE2.png|32px}}[[Buckets of fish]]
* Come in 4 variants: cod, salmon, pufferfish, and tropical fish buckets.
* Obtained by {{control|using}} a [[water bucket]] on a [[fish mob]].
* When {{control|used}}, it will place a water source block and spawn the corresponding fish inside it.

; [[Hearts of the sea]]
* Used to craft conduits.
* They generate in buried treasure chests (in stacks of 1).

; [[File:Kelp (item) JE1 BE2.png|width=32x32]][[Kelp]]
* Can be used to place a kelp plant underwater.
* Can be dried in a furnace to create dried kelp.

; [[File:Red Mushroom Block (ESU) JE1 BE1.png|width=32x32]][[File:Brown Mushroom Block (ESU) JE1 BE1.png|width=32x32]][[Mushroom block]]s
* Now appear in the creative inventory.

; [[File:Mushroom Stem (ESU) JE1 BE1.png|width=32x32]][[Mushroom stem]]s
* Have an item form and appear in the creative inventory.

; [[File:Nautilus Shell JE1 BE2.png|width=32x32]][[Nautilus shell]]s
* Used to craft conduits.
* Can be obtained by fishing.
* [[Drowned]] can spawn holding a nautilus shell.

; [[File:Oak Slab JE3 BE2.png|width=32x32]]Petrified oak [[slab]]
* Now has a model.
* Is the old wood slab that acts like a stone slab.

; [[File:Phantom Membrane JE1 BE1.png|width=32x32]][[Phantom membrane]]s
* Dropped by [[phantom]]s.
* Used to repair [[elytra]].
* Can be brewed into potions of Slow Falling.

; [[File:Potion of Slow Falling JE1 BE1.png|width=32x32]][[File:Splash Potion of Slow Falling JE1 BE1.png|width=30x30]][[File:Lingering Potion of Slow Falling JE1 BE1.png|width=28x28]][[Potion of Slow Falling]]
* Brewed with phantom membrane.
* Gives the player the Slow Falling status effect for 1:30.
** Prevents all fall damage.
** Makes the player fall slower.
** Prevents the player from trampling crops (even when jumping on top of them).
* Brewing it with [[redstone dust]] will extend the effect duration to 4 minutes.
* Like all potions, can be turned into [[splash potion]] and [[lingering potion]], using [[gunpowder]] and [[dragon's breath]].

; [[File:Potion of the Turtle Master JE1 BE1.png|width=32x32]][[File:Splash Potion of the Turtle Master JE1 BE1.png|width=28x28]][[File:Lingering Potion of the Turtle Master JE1 BE1.png|width=28x28]][[Potion of the turtle master]]
* Will give [[Slowness]] IV and [[Resistance]] III for 1 minute.
* Brewing it with [[redstone dust]] will extend the effect duration to 3 minutes.
* Brewing it with [[glowstone dust]] will enhance the effects to Slowness VI and Resistance IV.
* Like all potions, can be turned into splash potion and lingering potion, using gunpowder and dragon's breath.

; [[File:Scute JE1 BE1.png|width=32x32]][[Scute]]s
* Dropped when baby turtles grow up.
* Can be used to craft [[turtle shell]]s.

; {{Animate|Block of Quartz JE1 BE1.png;Smooth Red Sandstone JE1 BE1.png;Smooth Stone JE1 BE1.png|32px}}Smooth [[Block of Quartz|quartz]], smooth [[red sandstone]], smooth [[sandstone]], and smooth [[stone]]
* Like wood, they now have an item form, which appears in the creative inventory.

; [[Spawn egg]]s
* [[File:Drowned Spawn Egg JE1 BE1.png|width=32x32]][[Drowned]]
* [[File:Phantom Spawn Egg JE2 BE1.png|width=32x32]][[Phantom]]
* [[File:Dolphin Spawn Egg JE1 BE1.png|width=32x32]][[Dolphin]]
* [[File:Turtle Spawn Egg JE1 BE1.png|width=32x32]][[Turtle]]
* [[File:Cod Spawn Egg JE1 BE2.png|width=32x32]][[Cod]]
* [[File:Salmon Spawn Egg JE1 BE2.png|width=32x32]][[Salmon]]
* [[File:Pufferfish Spawn Egg JE1 BE2.png|width=32x32]][[Pufferfish]]
* [[File:Tropical Fish Spawn Egg JE1 BE2.png|width=32x32]][[Tropical fish]]

; [[File:Trident (item).png|width=32x32]][[Trident]]
* A new weapon.
* Can be thrown by {{control|using}} it, or be used as a melee weapon by {{control|attacking}}, dealing {{health|9}} damage.
* Obtainable by killing [[drowned]].

; [[File:Turtle Shell (item) JE1 BE1.png|width=32x32]][[Turtle shell]]s
* Crafted from [[scute]]s.
* Can be used as a helmet, adding 2 armor points.
** While equipped and out of water, it will give the player the [[Water Breathing]] effect for 10 seconds, essentially giving the player 10 extra seconds of breath underwater.
* Can be used to brew the [[potion of the Turtle Master]] from an [[awkward potion]].

; {{Animate|Oak Wood (NS) JE3 BE1.png;Spruce Wood (NS) JE1 BE1.png;Birch Wood (NS) JE1 BE1.png;Jungle Wood (NS) JE1 BE1.png;Acacia Wood (NS) JE2 BE1.png;Dark Oak Wood (NS) JE2 BE1.png|32px}}[[Wood]]
* Now have an item form and appear in the creative inventory.
** This is true for all 6 types.
* They can now be crafted, 4 [[log]]s in a square yield 3 wood.
* They now follow identical placement rules to logs and other such blocks.

=== Mobs ===

; {{EntityLink|Dolphin}}s
* Spawn in any ocean that isn't frozen.
* Neutral mobs. Like [[wolves]] and [[zombie pigmen]], dolphins will attack in groups if one is angered.
* Can be fed using [[raw cod]], but they don't breed.
** Drop cod on death.
* Play with nearby items by picking them up and dropping them after a very short moment.
* Occasionally jump out of water like real-life dolphins.
** Can also jump between disconnected bodies of water.
* Chase after boats and jump over water surfaces.
* They suffocate after spending too much time on land.
* If they start drowning, they will swim to the surface.
* Give the player the [[Dolphin's Grace]] status effect when the player swims near them.
* They can help players find buried treasure; when they are fed raw cod, they will swim to the nearest [[shipwreck]] or [[underwater ruins]].

; {{EntityLink|Drowned}}
* Spawn in all oceans and rivers, as well as in swamps and [[underwater ruins]].
* [[Zombie]]s will morph into drowned after a while if they are in water.
* Drowned can spawn with [[trident]]s and nautilus shells, allowing the [[player]] to get them in survival.
* Do not float, but can swim (although they prefer to walk).
* All drowned have a melee attack, and ones with tridents have a ranged attack.
* Like zombies, drowned will attack baby [[turtle]]s and stomp on and crack [[turtle egg]]s.

; [[Fish]]
* {{EntityLink|Cod}}
** Spawn in cold, normal, and lukewarm ocean biomes.
** Form in groups of up to 9.
* {{EntityLink|Salmon}}
** Spawn in frozen ocean, cold ocean and river biomes.
** Form in groups of up to 6.
* {{EntityLink|Pufferfish}}
** Spawn in lukewarm and warm ocean biomes.
** Inflate themselves when a player gets near.
** Will cause 7 seconds of Poison to nearby players.
* {{EntityLink|Tropical Fish}}
** Spawn in lukewarm and warm ocean biomes.
** Come in 14 different colors and patterns.
* They drop themselves when killed.
* Outside of water, they flop around before suffocating.
** They will slowly flop towards a water source.
* They can be caught with a water bucket.

; {{EntityLink|Phantom}}s ([[MineCon Earth 2017#Mob B|Mob B]])
* Was voted in by viewers of [[MINECON Earth 2017|MINECON Earth]].<ref name="Aquatic" />
* Spawn in the [[Overworld]] at high altitudes, and swoops down in groups of around 3 or 4 to attack players that have not [[Bed#Sleeping|slept]] in a while.<ref name="Aquatic" />
* The player must be above sea level.
* Are considered to be undead mobs.
** This means that they are harmed by Healing potions, healed by Harming potions, ignored by the Wither, and affected by Smite enchantment.
** Will burn when exposed to sunlight.
* Drop 0-1 [[phantom membrane]].

; {{EntityLink|Turtle}}s
* Water mobs which will make nests comprised of eggs on shorelines throughout various biomes.
* Have a baby variant, which hatch from the eggs, and move into the water when born.
* Can be bred using seagrass.
* Spawn on warm [[beach]]es in small groups.
* Lay [[Turtle Egg|eggs]] in their home beach.
** [[Drowned]] and [[Zombie]]s will pathfind to the eggs and try to crack them.
* Drop 0-2 [[seagrass]] upon death.
** Drop 0-1 [[bowl]] when killed with a [[trident]] enchanted with [[Channeling]].
* The [[player]] can craft [[scute]]s into a bigger [[turtle shell]].

=== World generation ===

; [[Biome]]s
* Added <code>minecraft:small_end_islands</code> (Small End Islands), <code>minecraft:end_midlands</code> (End Midlands), <code>minecraft:end_highlands</code> (End Highlands), and <code>minecraft:end_barrens</code> (End Barrens).
** All 4 generate in different parts of the outer islands of [[the End]], which previously just used the "The End" biome.
* Added <code>minecraft:warm_ocean</code> (Warm Ocean), <code>minecraft:lukewarm_ocean</code> (Lukewarm Ocean), <code>minecraft:cold_ocean</code> (Cold Ocean), <code>minecraft:deep_warm_ocean</code> (Deep Warm Ocean), <code>minecraft:deep_lukewarm_ocean</code> (Deep Lukewarm Ocean), <code>minecraft:deep_cold_ocean</code> (Deep Cold Ocean), and <code>minecraft:deep_frozen_ocean</code> (Deep Frozen Ocean), although warm deep oceans don't naturally generate.
* <code>minecraft:frozen_ocean</code> (Frozen Ocean) now generates again.

; [[Buffet]]
* New [[world type]]: can be created by selecting Buffet World as a world type.
* Creates single-biome worlds.
* Allows choosing between [[Overworld]] (as "Surface"), [[Nether]] (as "Caves") and [[End]] (as "Floating islands") terrain generation.
* Biome names are sorted alphabetically in the buffet menu.
* Another way to generate chunks (Checkerboard) is available by using an NBT Editor to open a Buffet world's "level.dat", and using the following code for the "generatorOptions": <code>{"biome_source":{"type":"minecraft:checkerboard"}}</code>.<ref>https://twitter.com/AgentM124/status/987315761923452928</ref>

; {{EnvLink|Buried treasure}}s
* A new structure that consists of a buried chest with loot in it.
* Has its own <code>buried_treasure</code> loot table.
* Maps found in [[underwater ruins]] can lead the [[player]] to them.

; {{EnvLink|Coral reef}}s
* Naturally generate in warm ocean [[biome]]s.
* Are composed of [[coral]], [[coral block]]s and [[coral fan]]s.

; {{EnvLink|Iceberg}}s
* Generate on frozen oceans.

; {{EnvLink|Shipwreck}}s
* Can be found in oceans and beaches.
* Contain 1–3 loot chests containing different types of loot depending on the ship.
* Can generate upright, sideways or upside down.

; Underwater caves
* Come in many variants, including ravines.
** Underwater ravines will often contain magma blocks at the bottom, which will create bubble columns, which will drag players down and makes navigating through water more difficult and drowning more likely.

; {{EnvLink|Ocean ruins}}
* Come in many different shapes and sizes.
* Cold ruins can be found in cold and frozen ocean biomes - regardless of depth.
* Warm ruins can be found in warm, lukewarm, and deep lukewarm ocean biomes.
* Can generate alone or as part of a big ruined village.
* Can also generate out of the water, slightly underground or slightly above sea level.

=== Gameplay ===

; [[Enchantment]]s
* [[Channeling]]
** Only has one level.
** Used on tridents to summon a [[lightning bolt]] on impact with a mob during [[storm]]s or when in water.
*** Requires the target mob to be directly under an open sky and in a biome where it is raining.
* [[Impaling]]
** Goes up to level V.
** Used on tridents to deal more damage to sea [[mob|creatures]].
* [[Loyalty]]
** Goes up to level III.
** Used on tridents to make it return when thrown.
* [[Riptide]]
** Goes up to level III.
** Not compatible with [[Loyalty]] or [[Channeling]].
** Used on tridents to launch the player when thrown while in water or rain. Riptide will not throw the trident, but instead launch the player forwards.
** If the player is not in water and it is not raining, the player is not able to throw [[trident]]s enchanted with Riptide, but they can still deal melee damage.
** Players display a spinning animation when dashing.

; [[Map]] markers
* Added the ability to put markers on maps.
**{{control|Use}} on a [[banner]] with a map to add it to the map.
** Right click on the same banner again to remove it.
** That map will show the base color of the banner at that spot.
** Named banners will show their name on the map.
** If a banner is destroyed, it will disappear when the [[player]] gets close while holding the map.
** Uses the new <code>banners</code> nbt for maps.

; [[Movement]]
* When sprinting while in water, the player will now swim on the surface.
** Much faster than walking/running in water before.
** Pressing shift causes the player to rapidly dive down.
** Sprinting at the surface of water doesn't make the [[player]] swim, instead the player will stay at the same altitude constantly.
** The players hitbox is only as large as 0.6×0.6 blocks (same as while flying with an [[elytra]]) while swimming.
** Vertically and horizontally, the player can fit through a one block gap like this.

; [[Status effect]]s
* {{EffectLink|Conduit Power}}
** Gives the player unlimited water breathing, night vision and increased mining speed while underwater.
** Acquired by being near a powered [[Conduit]] while underwater.
* {{EffectLink|Dolphin's Grace}}
** Makes the player swim faster.
** Acquired by swimming near [[dolphin]]s.
* {{EffectLink|Slow Falling}} 
** Causes the player to descend at a much slower rate, and not take any damage when hitting the ground.
** This allows the player to jump further than normal.
*** If the player is sprinting while under the Slow Falling status effect, they will be able to jump across a gap of 5 blocks, 6 with a 1-block height difference, compared to 4 with normal sprinting.
** Crops will not get destroyed if the player lands on them with the Slow Falling status effect.
** Higher levels do not change the rate of descent.

=== Command format ===

;General
* Added a command UI that shows when commands are typed in the chat.
** Different components of commands will be displayed in different colors.
** Errors will be displayed in red without having to run the command.
* Added command suggestions for entity selectors.
* An <code>nbt</code> argument in target selectors.
* A new command parsing library known as "Brigadier".

;Coordinates
* Added a new local coordinate type in commands using <code>^</code>.
** When specifying coordinates in a command, the [[player]] can now use <code>^</code> to specify local coordinates instead of world coordinates.
** The axes used for local coordinates are relative to the execution rotation, defaulting to <code>0,0</code> (south).
** Like world coordinates, they are by default measured from the base of an entity.
** The syntax is: <code>^left ^up ^forwards</code>.
** <code>left/up/forwards</code> is the amount of blocks in the specified direction.

;Specific commands

;<code>/bossbar</code>
* <code>/bossbar create <id> <name></code> will create a boss bar.
** <code>id</code> is used to target the boss bar and is in the form <code>namespace:name</code>, for example: <code>foo:bar</code>. If no <code>namespace</code> is specified it defaults to <code>minecraft</code>.
** <code>name</code> is the display name of the boss bar and only accepts a JSON text component.
* <code>/bossbar set <id> name <name></code> will change the name of the boss bar.
* <code>/bossbar set <id> color <color></code> will change the color of the text (if no color was specified as part of a text component) and the boss bar, defaults to <code>white</code>.
* <code>/bossbar set <id> style <style></code> will change the style of the boss bar, defaults to <code>progress</code>. 
** Available options are: <code>notched_6</code>, <code>notched_10</code>, <code>notched_12</code>, <code>notched_20</code>, and <code>progress</code>.
** <code>notched</code> will set the amount of segments.
** <code>progress</code> will set the amount of segments to 1.
* <code>/bossbar set <id> value <value></code> will change the current value of the boss bar, defaults to <code>0</code>.
* <code>/bossbar set <id> max <max></code> will change the maximum value of the boss bar, defaults to <code>100</code>.
* <code>/bossbar set <id> visible <visible></code> will change the visibility of the boss bar, defaults to <code>true</code>.
* <code>/bossbar set <id> players <players></code> will change which players can see the boss bar, defaults to none.
* <code>/bossbar remove <id></code> will remove the boss bar.
* <code>/bossbar list</code> will display a list of created boss bars.
* <code>/bossbar get <id> (max|players|value|visible)</code> will return the requested setting as a <code>result</code> of the command.

;{{cmd|data}}
* A command that allows the player to get, merge, and remove entity and block nbt data.
* <code>/data get block <pos> [<path>] [<scale>]</code>
** Will return the NBT data from the block at <code>pos</code>. A <code>path</code> can be specified to only retrieve that nbt data. Numeric values will be set as the <code>result</code> of the command, strings will set the length of the string as the <code>result</code>, lists will set the number of elements in the list as the <code>result</code>, and compounds will set the number of tags that are directly in that compound as the <code>result</code>. An optional <code>scale</code> can be provided to scale the number retrieved.
* <code>/data get entity <target> [<path>] [<scale>]</code>
** Will return the NBT data from one <code>target</code> entity. A <code>path</code> can be specified to only retrieve that nbt data. Numeric values will be set as the <code>result</code> of the command, strings will set the length of the string as the <code>result</code>, lists will set the number of elements in the list as the <code>result</code>, and compounds will set the number of tags that are directly in that compound as the <code>result</code>. An optional <code>scale</code> can be provided to scale the number retrieved.
* <code>/data merge block <pos> <nbt></code>
** Will merge the block nbt data at <code>pos</code> with the specified <code>nbt</code> data.
* <code>/data merge entity <target> <nbt></code>
** Will merge the entity nbt data from <code>target</code> with the specified <code>nbt</code> data. Merging player nbt data is not allowed.
* <code>/data remove block <pos> <path></code>
** Will remove nbt data at <code>path</code> from the block at <code>pos</code>.
* <code>/data remove entity <target> <path></code>
** Will remove nbt data at <code>path</code> from one <code>target</code> entity. Removing player nbt data is not allowed.
* Data paths look like this: <code>foo.bar[0]."A [crazy name]".baz</code>.
** <code>foo.bar</code> means foo's child called bar.
** <code>bar[0]</code> means element 0 of bar.
** "quoted strings" may be used if a name of a key needs to be escaped.
* Examples of old commands:
** <code>/entitydata <target> {} </code> is now <code>/data get entity <target></code>
** <code>/blockdata <pos> <nbt></code> is now <code>/data merge block <pos> <nbt></code>
* Examples of new functionalities:
** <code>/data get entity <nowiki>@e[type=pig,limit=1]</nowiki> Saddle 2</code>
** <code>/data remove block 17 45 34 Items</code>

;{{cmd|datapack}}
* A command to control loaded data packs.
* Has the following subcommands:
** <code>enable <name></code> - will enable the specific pack.
** <code>disable <name></code> - will disable the specific pack.
** <code>list [available|enabled]</code> - will list all data packs, or only the available/enabled ones.
* Data packs are enabled by default, but if the player disables it, they can re-enable it with these commands:
** <code>enable <name></code> - will enable the specific pack, putting it in its default position.
** <code>enable <name> first</code> - will enable the specific pack, putting it before any other pack (lowest priority).
** <code>enable <name> last</code> - will enable the specific pack, putting it after any other pack (highest priority).
** <code>enable <name> before <existing></code> - will enable the specific pack, putting it before (lower priority) <existing> pack.
** <code>enable <name> after <existing></code> - will enable the specific pack, putting it after (higher priority) <existing> pack.

;{{cmd|locate}}
* Added a clickable teleport link to the command output.

;{{cmd|scoreboard}}
* Added <code>/scoreboard objectives modify <objective> rendertype hearts</code>.
** Makes health bars display as hearts, like this: {{Healthbar|12}}.
* Added <code>/scoreboard objectives modify <objective> rendertype integer</code>.
** Makes health bars display as yellow numbers, like this: <span style="font-family: Minecraft; color: #ff5; background-color: #3F3F15; padding: 4px;">12</span>.

;{{cmd|teleport}}
* Added <code>facing</code>.
** <code>/teleport [<targets>] (<location>|<destination>) facing (<facingEntity>|<facingLocation></code>.
** Will rotate an entity to face either an entity or a location.

;{{cmd|time}}
* Added <code>noon</code> and <code>midnight</code> to <code>/time set</code>.

=== General ===

; [[Advancement]]s
* Added 4 new [[advancements]].
** Fishy Business: Catch a fish.
** Tactical fishing: Catch a fish... without a fishing rod!
** A Throwaway Joke: Throw a trident at something.
** Very Very Frightening: Strike a Villager with lightning.
* Added three new advancement triggers.
** {{code|minecraft:fishing_rod_hooked}} triggers when a player reels in an item or entity.
** {{code|minecraft:channeled_lightning}} triggers when a player uses the channeling enchantment to strike a mob.
** {{code|minecraft:filled_bucket}} triggers when a player fills a bucket.

;[[Data pack]]s
* Like [[resource pack]]s, but for [[loot table]]s, [[advancements]], [[Function (Java Edition)|function]]s, [[structure]]s, [[recipe]]s and [[tag]]s.
** Used by placing them into the <code>datapacks</code> folder of a world.
* Data packs are <code>.zip</code> files or folders, with a <code>pack.mcmeta</code> in the root. See: [[Tutorials/Creating a resource pack#pack.mcmeta]]. The packs are located in <code>(world)/datapacks/</code>.
* Structures will load from <code>(world)/generated/structures/(namespace)/(file).nbt</code> before checking data packs.
** However, this directory should ''not'' be used to distribute structures. Instead, move these files into data packs.
* Reloadable using {{cmd|reload}}.
* Structure: <code>pack.mcmeta</code>, <code>data</code> folder containing a namespace folder determining the namespace of its contents.
** A namespace should only contain the following symbols: {{code|0123456789abcdefghijklmnopqrstuvwxyz-_}}.
** Inside the namespace folder, there can be folders for <code>functions</code>, <code>loot_tables</code>, <code>advancements</code>, <code>structures</code>, <code>recipes</code> and <code>tags</code>.

; [[Death message]]s
* Added a death message for when the player is blown up by a bed in the Nether or the End.
** <code><player> was killed by [Intentional Game Design]</code>
*** Clicking on "[Intentional Game Design]" opens a link to {{bug|MCPE-28723}}.
* Added a death message for when a mob/player pushes someone into the void or when someone uses {{cmd|kill}} after being attacked by a mob/player.
** <code><player> didn't want to live in the same world as <killer></code>
* Added a death message for when the player is killed by somebody using a trident.
** <code><player> was impaled by <killer></code>

; [[Debug screen]]
* {{keys|F3+C}} will now copy the [[player]]'s current location to clipboard.
** Now gives a warning before forcing a debug crash.
* F3 debug overlay now shows the fluid the player is looking at, separately from blocks.
** Player can be up to twenty blocks away for this to work now.
* Added "Targeted Entity". Displays information for entities up to 4 blocks away (counting from the entities hitbox).
* Added {{keys|Shift+F3+I}} to copy the client-side data of targeted block or entity. It can be used by anyone.
* Added {{keys|F3+I}} to copy targeted block or entity server-side data to clipboard. It can only be used by operators.
* Added information about the time it takes for a tick on the integrated server (singleplayer only), server brand (multiplayer only), number of packets sent by the client (tx), and number of packets received by the client (rx).

;[[Loot table]]s
* Added the <code>set_name</code> function to loot tables.

;[[NBT tag]]s
* Added the <code>TreasurePosX</code>, <code>TreasurePosY</code>, <code>TreasurePosZ</code>, <code>GotFish</code>, and <code>CanFindTreasure</code> [[NBT tag]]s for [[dolphin]]s.
* Added the <code>AX</code>, <code>AY</code>, <code>AZ</code>, and <code>Size</code> [[NBT tag]]s for [[phantom]]s.
* Added the <code>HomePosX</code>, <code>HomePosY</code>, <code>HomePosZ</code>, <code>TravelPosX</code>, <code>TravelPosY</code>, <code>TravelPosZ</code>, and <code>HasEgg</code> [[NBT tag]]s for [[turtle]]s.

;[[Options]]
* Fullscreen Resolution to change the resolution while in Fullscreen.
* Options when editing a world to make a backup and open the backups folder.
* Added Biome Blend distance video option.
* New options in [[options.txt]]:
** autoSuggestions
*** An option in chat settings to toggle automatic command suggestions
*** True if brigadier's command suggestion UI should always be shown, instead of just when pressing tab
*** Defaults on, otherwise hit tab to bring them up
** glDebugVerbosity
*** LWJGL log info level (0: none, 1: HIGH, 2: MEDIUM, 3: LOW, 4: NOTIFICATION (only on some machines) )
** mouseWheelSensitivity
*** Affects hotbar scroll speed
***	Allows making the mouse wheel more sensitive (1.0-10.0)
*** Defaults to 1.0
* Letter keys in controls are now lowercase instead of being capitalized.
* When editing an existing Minecraft world, there is now a new "Optimize World" button, allowing the [[player]] to update old worlds to a newer format.

;[[Particles]]
* Added the <code>minecraft:bubble_column_up</code>, <code>minecraft:bubble_pop</code>, <code>minecraft:current_down</code>, and <code>minecraft:squid_ink</code> [[particles]].

;[[Sound]]s
* Added a new sound effect of [[squid]] shooting ink.
* Added sound for Husks converting to Zombies
* Added underwater ambience sounds.
* New cave [[ambience]] sound: Cave19.ogg.
* Added new sound events:
** <code>block.coral_block.break</code>, <code>block.coral_block.fall</code>, <code>block.coral_block.hit</code>, <code>block.coral_block.place</code>, and <code>block.coral_block.step</code>
*** Used for the living [[coral block]]s.
*** Most of these sounds like mixture of rocky<ref>Rocky sounds are mainly used for stones.</ref> and high-pitched slimy<ref>Slimy sounds are mainly used for [[slime block]]s and [[sea pickle]]s</ref> sounds.
** <code>block.wet_grass.break</code>, <code>block.wet_grass.fall</code>, <code>block.wet_grass.hit</code>, <code>block.wet_grass.place</code>, and <code>block.wet_grass.step</code>
*** Used for [[seagrass]], [[kelp]], [[coral]] and [[coral fan]]s.

;[[Splash]]es
* Added "All rumors are true!"
* Added "Thanks for the fish!"
* Added "Truly gone fishing!" 

;[[Statistics]]
* Added the <code>time_since_rest</code> [[statistic]].
** Used by phantoms.
** Reset when the [[player]] leaves their [[bed]], and when the player dies.

;[[Tag]]s
* Items, blocks and functions can be "tagged" with an ID.
** Block tags can be used when testing for blocks in the world.
** Items tags can be used when testing for items in inventories.
** Function tags can be used when calling functions using commands or advancements.
*** Functions tagged in <code>minecraft:tick</code> will run every tick at the beginning of the tick.
*** Functions tagged in <code>minecraft:load</code> will run once after a (re)load.
* Tags are created using [[data pack]]s in <code>data/(namespace)/tags/blocks</code>, <code>data/(namespace)/tags/items</code>, and <code>data/(namespace)/tags/functions</code>.
** When overriding a tag from a different data pack, the [[player]] can choose to replace or append.
*** By default all tags append if another data pack created the tag.
*** Adding <code>"replace": true</code> to a tag's definition will make the tag overwrite instead.
** For example: <code>data/(namespace)/tags/blocks/foo.json</code>
** This will create a block tag called <code>(namespace):foo</code>.
** The json file contains a list of all blocks that should be "tagged".
*** This list can also contain other tags of the same type.
**** The player can add for example <code>#foo:bar</code> in a tag value list to reference another tag called <code>foo:bar</code>.
**** Self referencing is not possible.
* There are 24 vanilla tags for both items and blocks: <code>minecraft:acacia_logs</code>, <code>minecraft:banners</code>, <code>minecraft:birch_logs</code>, <code>minecraft:buttons</code>, <code>minecraft:carpets</code>, <code>minecraft:coral</code>, <code>minecraft:coral_plants</code>, <code>minecraft:dark_oak_logs</code>, <code>minecraft:doors</code>, <code>minecraft:jungle_logs</code>, <code>minecraft:logs</code>, <code>minecraft:oak_logs</code>, <code>minecraft:planks</code>, <code>minecraft:rails</code>, <code>minecraft:sand</code>, <code>minecraft:saplings</code>, <code>minecraft:spruce_logs</code>, <code>minecraft:stone_bricks</code>, <code>minecraft:wooden_buttons</code>, <code>minecraft:wooden_doors</code>, <code>minecraft:wooden_pressure_plates</code>, <code>minecraft:wooden_slabs</code>, <code>minecraft:wooden_stairs</code>, and <code>minecraft:wool</code>.
* There are 7 extra vanilla tags for blocks: <code>minecraft:anvil</code>, <code>minecraft:enderman_holdable</code>, <code>minecraft:flower_pots</code>, <code>impermeable</code>, <code>minecraft:slabs</code>, <code>minecraft:stairs</code> and <code>wall_corals</code>.
** Blocks in the <code>impermeable</code> tag are prevented from showing dripping liquid particles. By default, the tag contains [[glass]] and all stained glass blocks.
* There is 1 extra vanilla tag for items: <code>minecraft:boats</code>.
* Separated some of the logic for blocks and fluids.<ref>{{tweet|Dinnerbone|987293762069155841|<nowiki>Trying to extract parts of BlockState into StateHolder<T> and turn BlockStateDefinition into StateDefinition<T> so I can use the same system for liquids</nowiki>|April 20, 2018}}</ref>
** Current fluids:
*** <code>minecraft:empty</code>
*** <code>minecraft:flowing_water</code>
*** <code>minecraft:water</code>
*** <code>minecraft:flowing_lava</code>
*** <code>minecraft:lava</code>
** The fluid at a location is currently dependent on the block at the location; currently there still are water and lava blocks. <!-- i.e. this change hasn't happened yet: https://twitter.com/Dinnerbone/status/988712909315493888 -->
** Added two new fluid [[tag]]s: <code>minecraft:lava</code> and <code>minecraft:water</code>.
** This system is mostly internal; it cannot be directly interacted with yet.
* [[Advancement]] item predicates now support item <code>tag</code>s.

; [[Waterlogging]]
* Water can now be placed in the following blocks: chests, trapped chests, stairs, slabs, fences, walls, iron bars, glass panes, ender chests, trapdoors, ladders, and signs.
** Water can flow out of these blocks, but cannot flow into them.
** When full of water, they will count as water blocks for all gameplay (such as swimming).
** Water will flow out of all faces of the block except for solid faces.
* Removed the blocks <code>flowing_water</code> and <code>flowing_lava</code>.
* All of the blocks that water can be placed in now have the block state <code>waterlogged</code>.
* Blocks such as bubble column or kelp will always count as a water source.
* When water spreads and would later turn into a source block, it now immediately just places a source block.
; Other
* New <code>valid_spawn</code> block tag for blocks that the player can spawn on.
* There is now a distinction between scheduled "liquid ticks" and "block ticks".

== Changes ==

=== Blocks ===

; General
* The upper limit of the [[Java Edition data values/Pre-flattening#Block IDs|block ID]] has disappeared.
* Blocks which used to have no bottom texture (like repeaters, comparators, etc.) now have a bottom texture, not including redstone wire.
* Blocks with a collision box now have matching bounding boxes.
** Affected: anvils, cauldrons, hoppers, fences, iron bars, glass panes, filled end portal frames, vines, lily pads, stairs, brewing stands, and pistons.
** Updated the collision box of anvils and hoppers.
** Does not affect blocks with a collision box smaller than their model, such as soul sand and snow layers.

; [[Beacon]]s
* Added new sounds.

; [[Bed]]s
* Changed message shown when failing to use a bed to say "You can sleep only at night and during thunderstorms."

; [[Cacti]]
* Now break if [[sign]]s or [[banner]]s are placed directly next to them.
** Previously, these blocks couldn't be placed like this.

; [[Chest]]s and [[trapped chest]]s
* They can be put directly next to their double variants instead of requiring one block between them.
** Shift right-clicking a chest or trapped chest will only make it try to connect to the clicked chest or trapped chest if possible, else it'll become a single chest or trapped chest.

; [[Dispenser]]s
* Crafting no longer requires a fully repaired [[bow]].<ref name="damage">{{bug|MC-122844}} (resolved as "Works as Intended")</ref>

;[[Dragon Head]]s
* Now held differently from other mob heads in third person.

; [[Ender Chest]]s
* Will now change their texture when the computer time is set to the 24th to 26th of December to suit Christmas.

; [[Fence gate]]s
* Placing them no longer requires a block below them.

; [[Leaves]]
* Naturally-generated leaves now survive at a distance of up to 6 blocks from logs, instead of 4.
** The block state for leaves changed from a <code>check_decay</code> and <code>decayable</code> Booleans to distance (ranging from 1 to 7) and a <code>persistent</code> Boolean.

; [[Lever]]s
* Flicking a lever on now displays redstone particles.

; [[Magma block]]s
* Now generate at the bottom of ocean ravines, creating downward bubble columns.

; [[Monster egg]]s
* They will now break instantly, no matter the tool.
** When broken with [[Silk Touch]], the non-infested counterpart of the block will drop.

; [[Packed ice]]
* Now can be crafted from 9 [[ice]].<ref>{{tweet|_LadyAgnes|1004703969049038848|Yes we also want to keep it hard to get, so you need 9 ice in order to create 1 packed ice. ^^|June 7, 2018}}</ref>

; [[Pumpkin]]s
* Placing them no longer requires a block below them.

; [[Shulker Box]]es
* Changed the purple shulker box to the 1.12 snapshots' purple color.
* Dyed shulker boxes can now be undyed in a cauldron.
** {{control|Use}} a shulker box on a filled cauldron.
** The water level in the cauldron will decrease by 1.

; [[TNT]]
* Removed the [[TNT]] <code>explode</code> block state (explode on punch).<ref name="explode">{{bug|MC-122563}} (resolved as "Works as Intended" at the time)</ref>

; [[Vines]]
* Multiple vines facing different directions, including on the bottom of blocks, can now be placed in the same block space.

; [[Water]]
* Has new colors, depending on the biome.
** Dark purple for frozen, indigo for cold, blue/regular for medium (lush), light green for warm/dry biomes.
*** Swamps have a light green-gray hue, and lukewarm ocean a light teal.
* Now only blocks 1 light per block, instead of 3.
** This only affects newly placed water (for now).

; [[Command block]]s
* Removed explanation of selectors.
* Removed "Searge says ..." output when executing <code>[[Commands/help|help]]</code>, instead it runs normally.

=== Items ===

; [[Carrot on a stick]]
* Can now be crafted with a fishing rod that does not have full durability.<ref name="damage" />

; [[Elytra]]
* Now require [[phantom membrane]] to be repaired instead of leather.

; [[Fish]]
* Item textures changed.

; [[Fishing rod]]s
* Now make sounds when reeled back in.

; [[Iron horse armor]]
* Changed the texture when equipped.

; [[Map]]s
* Maps changed slightly in regards to which blocks are shown and which blocks are not.<ref>https://www.reddit.com/r/Minecraft/comments/8xo1ex/minecraft_113_map_rendering_changes/</ref>

=== Mobs ===

; General
* [[Zombie]]s, [[skeleton]]s, [[ocelot]]s and [[wolves]] will naturally attack baby turtles, and zombies and zombie pigmen will seek out and trample turtle eggs.
* [[Undead]] mobs will now sink in water.

; [[Horse]]s
* The model has been changed to be more consistent with other mobs.<ref name="meethorse">{{Mcnet|meet-horse|Meet The Horse|October 10, 2017}}</ref>
* Some animations like opening its mouth when grazing have been removed from the model as well.

; [[Husk]]s
* Husks now become a [[zombie]] instead of dying from drowning.

; [[Parrot]]s
* They will now imitate [[phantom]]s and [[drowned]].

; [[Polar bear]]s
* They can now spawn on top of [[ice]].

; [[Skeleton horse]]s
* Are now rideable underwater.
* Updated model to fix minor texture [[wikipedia:z-fighting|z-fighting]], a glitch where textures overlap in an obtrusive and unintentional way.

; [[Squid]]
* Squid now shoot ink and flee quickly in response to being attacked.

; [[Zombie horse]]s
* Updated model to fix extreme texture z-fighting, just like the skeleton horse.

; [[Zombie]]s
* Zombies now become a [[drowned]] instead of dying from drowning.
* Baby zombies now burn in sunlight.<ref>{{bug|MC-127186}} (resolved as "Works As Intended")</ref>
* [[Chicken jockey]]s now spawn rightly (also valid for [[zombie pigmen]]).

=== Non-mob entities ===

;General
* Items and [[experience]] orbs will now float up in water.
* Changed the name of several entities:
{| class="wikitable" data-description="Changed entity names"
! Old Name !! New Name
|-
| <code>Block of TNT</code> || <code>Primed TNT</code>
|-
| <code>Bolt of Lightning</code> || <code>Lightning Bolt</code>
|-
| <code>Ender Crystal</code> || <code>End Crystal</code>
|-
| <code>Eye of Ender Signal</code> || <code>Eye of Ender</code>
|-
| <code>Evocation Fangs</code> || <code>Evoker Fangs</code>
|}

;[[Fishing bobber]]s
* Bobbers created by fishing rods have been given an entity ID, <code>fishing_bobber</code>.
** This ID can only be used for testing, summoning is not possible.

;[[Item frame]]s
* Item frames can now be put on floors and ceilings.

;[[Painting]]s
* Paintings now use a [[resource location]] for their motive.

=== World generation ===

; General
* Rewrote the world generation system.
* In [[the Nether]], vertical air cavities — stretching from bedrock level to as far as Y=35, and filled with [[lava]] from bedrock level to Y=10 – now occur in chains across the bottom of the Nether, often forming extensive ravines.
* In newly generated chunks, the [[player]] is less likely to find frozen oceans next to warm oceans, etc.

; [[Biome]]s
* The {{keys|F3}} menu now shows the biome ID, rather than its name.
* Biome names are now translatable.
* Updated some biome names:
{| class="wikitable sortable collapsible collapsed" data-description="Changed biome names"
! Old name !! New name
|-
| <code>Cold Beach</code> || <code>Snowy Beach</code>
|-
| <code>DesertHills</code> || <code>Desert Hills</code>
|-
| <code>Extreme Hills</code> || <code>Mountains</code>
|-
| <code>Extreme Hills+</code> || <code>Wooded Mountains</code>
|-
| <code>ForestHills</code> || <code>Wooded Hills</code>
|-
| <code>FrozenOcean</code> || <code>Frozen Ocean</code>
|-
| <code>FrozenRiver</code> || <code>Frozen River</code>
|-
| <code>Hell</code> || <code>Nether</code>
|-
| <code>Ice Plains</code> || <code>Snowy Tundra</code>
|-
| <code>Ice Mountains</code> || <code>Snowy Mountains</code>
|-
| <code>JungleEdge</code> || <code>Jungle Edge</code>
|-
| <code>JungleHills</code> || <code>Jungle Hills</code>
|-
| <code>Mesa</code> || <code>Badlands</code>
|-
| <code>Mesa Plateau F</code> || <code>Wooded Badlands Plateau</code>
|-
| <code>Mesa Plateau</code> || <code>Badlands Plateau</code>
|-
| <code>MushroomIsland</code> || <code>Mushroom Fields</code>
|-
| <code>MushroomIslandShore</code> || <code>Mushroom Field Shore</code>
|-
| <code>Birch Forest M</code> || <code>Tall Birch Forest</code>
|-
| <code>Birch Forest Hills M</code> || <code>Tall Birch Hills</code>
|-
| <code>Desert M</code> || <code>Desert Lakes</code>
|-
| <code>Extreme Hills M</code> || <code>Gravelly Mountains</code>
|-
| <code>Extreme Hills+ M</code> || <code>Gravelly Mountains+</code>
|-
| <code>Ice Plains Spikes</code> || <code>Ice Spikes</code>
|-
| <code>Jungle M</code> || <code>Modified Jungle</code>
|-
| <code>JungleEdge M</code> || <code>Modified Jungle Edge</code>
|-
| <code>Mesa (Bryce)</code> || <code>Eroded Badlands</code>
|-
| <code>Mesa Plateau M</code> || <code>Modified Badlands Plateau</code>
|-
| <code>Mesa Plateau F M</code> || <code>Modified Wooded Badlands Plateau</code>
|-
| <code>Mega Spruce Taiga</code> || <code>Giant Spruce Taiga</code>
|-
| <code>Redwood Taiga Hills M</code> || <code>Giant Spruce Taiga Hills</code>
|-
| <code>Roofed Forest M</code> || <code>Dark Forest Hills</code>
|-
| <code>Savanna M</code> || <code>Shattered Savanna</code>
|-
| <code>Savanna Plateau M</code> || <code>Shattered Savanna Plateau</code>
|-
| <code>Swampland M</code> || <code>Swamp Hills</code>
|-
| <code>Taiga M</code> || <code>Taiga Mountains</code>
|-
| <code>Cold Taiga M</code> || <code>Snowy Taiga Mountains</code>
|-
| <code>Mega Taiga</code> || <code>Giant Tree Taiga</code>
|-
| <code>Mega Taiga Hills</code> || <code>Giant Tree Taiga Hills</code>
|-
| <code>Roofed Forest</code> || <code>Dark Forest</code>
|-
| <code>Extreme Hills Edge</code> || <code>Mountain Edge</code>
|-
| <code>Stone Beach</code> || <code>Stone Shore</code>
|-
| <code>Swampland</code> || <code>Swamp</code>
|-
| <code>Cold Taiga</code> || <code>Snowy Taiga</code>
|-
| <code>Cold Taiga Hills</code> || <code>Snowy Taiga Hills</code>
|-
| <code>TaigaHills</code> || <code>Taiga Hills</code>
|}

; [[Old Customized|Customized]] world type
* Removed.

; [[Superflat]] customization
* Preset strings no longer use a version number.

; [[Tree]]s
* Large spruce trees now transform nearby [[grass]] blocks into [[podzol]] when they grow.

; [[Witch Hut]]s
* Now generate with a mushroom in the flower pot.
** Previously, the flower pot was completely empty.

=== Gameplay ===

; [[Movement]]
* Pressing the {{control|jump}} button in flowing water at <code>level=1</code>, <code>level=2</code> and <code>level=3</code> will now do normal jumps instead of {{control|swimming}} up.

; Oxygen bar
* The player's oxygen bar no longer regenerates instantly when they get out of [[water]].

; Sleep
* Players in creative mode can now sleep even if monsters are nearby.

; Visibility
* Changed natural water visibility.
** The longer a player stays underwater, the better they will be able to see.
** Water is darker at lower depths.
** The Water Breathing potion & Respiration enchantment no longer grant enhanced vision underwater.
** Every ocean biome has a unique water color, and the swamp water color has been changed.
** Visibility changes per biome.

=== Command format ===

; General
* Commands and functions are much faster and more efficient.
* Most commands are now more case-sensitive. Lowercase is preferable wherever possible.
** For example, this is no longer allowed: <code>/scoreboard ObJeCtIvEs ...</code>
* The output signal of a command block used to be its "success count", but now is its "result".
* Server commands ([[Commands/function|function]]s, console, rcon) now run from world spawn in the overworld, instead of at <code>0,0,0</code>.
* Errors during a command are now a nicer error message (with a tool tip for more info).
* Added commands to the profiler ({{cmd|debug}}).
* Whitespaces are now allowed in entity selectors & blockstate arguments.
* Blockstate files:
** <code>"normal"</code> for blocks without block states changed to an empty string (<code>""</code>).
** Item Frames now have <code>"map=false"</code> instead of <code>"normal"</code> and <code>"map=true"</code> instead of <code>"map"</code>.
** Model references no longer start at the <code>models/block/</code> folder, but instead at <code>models/</code>.

; [[Command]] UI
* A new prototype for the command UI.

; [[Function (Java Edition)|Function]]s
* Functions are now completely parsed and cached on load.
** This means if a command is incorrect for any reason, the player will know about it on load.

; NBT
* The <code>ench</code> NBT tag of items is now called <code>Enchantments</code>, and no longer has number IDs in each compound.
* <code>Thrower</code> and <code>Owner</code> nbt keys of [[Item (entity)|item entities]] are no longer strings, but are instead compounds with two longs named <code>L</code> and <code>M</code>.
* <code>owner</code> nbt keys of [[snowball]]s, [[egg]]s and [[ender pearl]]s are no longer strings, but are instead compounds with two longs named <code>L</code> and <code>M</code>.
* Changed all custom names (blocks, items, entities, block entities) from raw strings to JSON text components (which can be translated).
** For example, <code>/summon pig ~ ~ ~ {CustomName:"Reuben"} </code> is now <code>/summon pig ~ ~ ~ {CustomName:"\"Reuben\""} </code> or <code>/summon pig ~ ~ ~ {CustomName:"{\"text\":\"Reuben\"}"} </code>

; Specific Commands

; {{cmd|advancement}}
* Removed <code>/advancement test</code> in favor of entity selectors.

; {{cmd|blockdata}}
* Removed in favor of {{cmd|data}}.

; {{cmd|clear}}
* The syntax of {{cmd|clear}} has changed.
** <code>/clear [<target>] [<item>] [<data>] [<count>] [<nbt>]</code> is now <code>/clear [<target>] [<item>] [<count>]</code>
** See the item argument type for more details.

; {{cmd|clone}}
* The syntax of {{cmd|clone}} has been changed.
** <code>/clone <begin> <end> <destination> filtered [force|move|normal] [<block>] [<data>]</code> is now <code>/clone <begin> <end> <destination> filtered [<block>] [force|move|normal]</code>
** <code>/clone <begin> <end> <destination> [replace|masked] [force|move|normal] [<block>] [<data>]</code> is now <code>/clone <begin> <end> <destination> [replace|masked] [force|move|normal]</code>

; {{cmd|defaultgamemode}} and {{cmd|gamemode}}
* Now only accept string IDs, not shorthand or numeric.
** <code>/gamemode 2</code> is now <code>/gamemode adventure</code>
** <code>/defaultgamemode sp</code> is now <code>/defaultgamemode spectator</code>

; {{cmd|difficulty}}
* <code>difficulty [<value>]</code> now only accepts string IDs, not shorthand or numeric.
** <code>/difficulty 2</code> is now <code>/difficulty normal</code>
** <code>/difficulty p</code> is now <code>/difficulty peaceful</code>
* [[Player]]s can now query for the current difficulty by using {{cmd|difficulty}} without any arguments.

; {{cmd|effect}}
* The syntax of {{cmd|effect}} has been split off, to avoid ambiguity.
** <code>/effect <entity> <effect></code> is now <code>/effect give <entity> <effect></code>
** <code>/effect <entity> clear</code> is now <code>/effect clear <entity> [<effect>]</code>
* Giving an effect will now fail if it didn't actually do anything.
** Some mobs are immune (for example the [[ender dragon]]).
** Stronger existing effects prevent new weaker ones.

; {{cmd|entitydata}}
* Removed in favor of {{cmd|data}}.

{{anchor|executechanges}}
; {{cmd|execute}}
* The syntax of {{cmd|execute}} has been split off.
** Modifier sub-commands can change how the command is run:
*** <code>/execute as <entity> <chained command></code> executes a command using the entity <code><entity></code> (but doesn't change position).
*** <code>/execute at <entity> <chained command></code> executes a command using the position, rotation, and dimension of the <code><entity></code> (but doesn't change entity).
*** <code>/execute positioned <pos> <chained command></code> executes a command using the position of <code><pos></code>.
*** <code>/execute positioned as <entity> <chained command></code> executes a command using the position (x y z) of the <code>entity</code>, but nothing else.
*** <code>/execute align <axes> <chained command></code> executes a command after aligning the current position to the block grid (rounding down), <code><axes></code> is any combination of <code>x</code> <code>y</code> and <code>z</code> (for example: <code>x</code>,<code>xz</code>,<code>zyx</code> and <code>yz</code>).
**** Examples:
***** <code>x=-1.8,y=2.3,z=5.9</code> using <code>x</code> will become <code>x=-2,y=2.3,z=5.9</code>
***** <code>x=2.4,y=-1.1,z=3.8</code> using <code>yxz</code> will become <code>x=2,y=-2,z=3</code> 
*** <code>/execute facing <x y z> <chained command></code> executes a command as though the executor is facing <code>x y z</code>.
*** <code>/execute facing entity <entity> (eyes|feet) <chained command></code> executes a command as though the executor is facing the entity's eyes or feet.
*** <code>/execute rotated as <entity> <chained command></code> executes a command as though the executor is rotated in the direction of the entity.
*** <code>/execute rotated <y x> <chained command></code> will run the command as though the executor is rotated in the specified direction.
*** <code>/execute in (overworld|the_end|the_nether) <chained command></code> executes a command as though the executor is in the specified dimension.
*** <code>/execute anchored (feet|eyes) <chained command></code> will make the rest of this command use feet or eyes for ^ ^ ^ coordinates or facing commands.
** Conditional sub-commands can let the [[player]] prevent the command from running at all:
*** <code>/execute (if|unless) block <pos> <block> <chained command></code> executes a command if (or unless) <code><pos></code> matches <code><block></code>.
*** <code>/execute (if|unless) blocks <begin> <end> <destination> (all|masked) <chained command></code> executes a command if (or unless) the region between <code><begin></code> and <code><end></code> matches <code><destination></code>.
*** <code>/execute (if|unless) entity <entity> <chained command></code> executes a command if (or unless) <code><entity></code> exists (returns 1 or more entities).
*** <code>/execute (if|unless) score <target> <targetObjective> (<|<=|=|>=|>) <nowiki><source></nowiki> <sourceObjective> <chained command></code> executes a command if (or unless) <code><target></code>'s score relates to <code><nowiki><source></nowiki></code>'s score based on the chosen criterion.
*** <code>/execute (if|unless) score <target> <objective> matches <range> <chained command></code> executes a command if (or unless) <code><target></code>'s score is in the <code>range</code> (ie <code>1</code>, <code>1..5</code>).
** As replacement for {{cmd|stats}}, a new sub-command <code>store</code> lets players store the result or success of a command somewhere:
*** <code>result</code> is the result of a command, which replaces these old stats: <code>AffectedBlocks</code>, <code>AffectedEntities</code>, <code>AffectedItems</code>, <code>QueryResult</code>.
*** <code>success</code> is how many times the command was successful. This is usually <code>0</code> or <code>1</code>, but if the command split up (for example <code>as @a</code>) then it may be more than <code>1</code>. This replaces <code>SuccessCount</code>.
*** The value will be stored when the full command has finished executing.
*** If a command isn't successful (<code>success</code> is <code>0</code>), <code>result</code> will always be set to <code>0</code>.
*** It will be made clear what the expected result of each command is.
*** <code>/execute store (result|success) score <name> <objective> <chained command></code>
**** The value is stored into the scoreboard under <code><name></code> and <code><objective></code>.
**** The <code>objective</code> must exist, but unlike with {{cmd|stats}} the player doesn't need to set an initial value for <code><name></code>.
*** <code>/execute store (result|success) block <pos> <path> (byte|double|float|int|long|short) <scale> <chained command></code>
**** The value is stored in the nbt data at <code>path</code> of the block at <code>pos</code> as a byte, double, float, int, long, or short.
*** <code>/execute store (result|success) entity <target> <path> (byte|double|float|int|long|short) <scale> <chained command></code>
**** The value is stored in the nbt data at <code>path</code> of one <code>target</code> entity as a byte, double, float, int, long, or short.
**** Like {{cmd|data}}, <code>/execute store</code> can't modify player nbt. Nbt inside the <code>tag</code> key of items in the player's <code>Inventory</code> or <code>EnderItems</code> is an exception and can be modified by <code>/execute store</code>.<ref>{{bug|MC-123307}}</ref>
*** <code>/execute store (result|success) bossbar <id> (value|max) <chained command></code>
**** The value is stored in the <code>value</code> or <code>max</code> setting of the boss bar with ID <code>id</code>.
*** Data paths look like this: <code>foo.bar[0]."A [crazy name]".baz</code>.
**** <code>foo.bar</code> means foo's child called bar.
**** <code>bar[0]</code> means element 0 of bar.
**** "quoted strings" may be used if a name of a key needs to be escaped.
*** Examples:
**** <code>/execute store success score @a foo run say hi</code>
**** <code>/execute as <nowiki>@e[type=pig]</nowiki> at @s store success entity @s Saddle byte 1 if entity <nowiki>@p[distance=..5]</nowiki></code>
** The player can chain all sub-commands together.
*** After every sub-command the player needs to write another sub-command.
*** When the player is done with chaining sub-commands, <code>run</code> lets them write the actual command to be executed.
**** <code>/</code> is no longer allowed before the command.
*** <code>/execute as somebody at somebody run say hi</code>
** Example of old commands:
*** <code>/execute @e ~ ~ ~ detect ~ ~ ~ stone 0 say Stone!</code> is now <code>/execute as @e at @s if block ~ ~ ~ stone run say Stone!</code>
*** <code>/execute @e ~ ~ ~ detect ~ ~ ~ grass 0 summon pig</code> is now <code>/execute at @e if block ~ ~ ~ grass_block run summon pig</code>
*** <code>/execute @e ~ ~ ~ say Hello!</code> is now <code>/execute as @e run say Hello!</code>

; {{cmd|experience}}
* {{cmd|xp}} is now an alias for {{cmd|experience}}.
* Split up into 3 different subcommands:
** <code>/experience add <players> <amount> [points|levels]</code>
*** Adds <code><amount></code> of either points or levels to the target <code><players></code> (defaults to points).
*** Adding points can cause players to level up, as usual.
*** Negative numbers are supported, to subtract points instead.
*** Subtracting points can cause players to level down.
** <code>/experience set <players> <amount> [points|levels]</code>
*** Sets <code><amount></code> of either points or levels on the target <code><players></code> (defaults to points).
*** The [[player]] cannot set more points than their current level allows.
*** When changing levels, the points will stay at the same percentage as the previous level.
** <code>/experience query <player> (points|levels)</code>
*** Returns either the number of points or levels on the given <code><player></code>.

; {{cmd|fill}}
* The syntax of {{cmd|fill}} has been changed.
** <code>/fill <begin> <end> <block> <data> replace [<replaceBlock>] [<replaceData>]</code> is now <code>/fill <begin> <end> <block> replace [<filter>]</code>
** <code>/fill <begin> <end> <block> [<data>] [destroy|hollow|keep|outline|replace] [<nbt>]</code> is now <code>/fill <begin> <end> <block> [destroy|hollow|keep|outline|replace]</code>

; {{cmd|function}}
* {{cmd|function}} no longer accepts <code>[if|unless] <entity></code> arguments.
** This has been moved into {{cmd|execute}}.
** <code>/function foo if @e</code> is now <code>/execute if entity @e run function foo</code>

; {{cmd|gamerule}}
* {{cmd|gamerule}} no longer accepts unknown rules ("custom gamerules").
** The [[player]] can use [[Function (Java Edition)|function]]s or [[scoreboard]]s as replacements, with no loss of functionality.
** Existing custom gamerules will just not be accessible. Only built-in rules will be available.
* Values to {{cmd|gamerule}} are now type checked (giving a string if it wants an int is a very obvious error).
* Removed the <code>gameLoopFunction</code> gamerule in favor of functions tagged in <code>minecraft:tick</code>.

; {{cmd|give}}
* The syntax of {{cmd|give}} has changed.
** <code>/give <players> <item> [<count>] [<data>] [<nbt>]</code> is now <code>/give <players> <item> [<count>]</code>
** See the item argument type for more details.

; {{cmd|kill}}
* A <code>target</code> is now mandatory.

; {{cmd|list}}
* Can now be used in singleplayer.

; {{cmd|locate}}
* The y-coordinate is now returned as <code>~</code> instead of <code>?</code>.
* The <code>result</code> of the command, used by <code>/execute store</code>, will be the absolute distance to the structure.
* Now accepts different structure names for all structures previously grouped under <code>Temple</code>: <code>Desert_Pyramid</code>, <code>Igloo</code>, <code>Jungle_Pyramid</code>, and <code>Swamp_Hut</code>.

;{{cmd|op}}
* Now allows target selectors besides names.

; {{cmd|particle}}
* The <code><params></code> argument has been removed, instead the parameters for particles like <code>block</code> can be specified right after the <code><name></code> argument using the new block argument.
** <code>/particle <nowiki>block polished_granite ~ ~ ~ 0 0 0 0 1</nowiki></code>
** <code>/particle <nowiki>dust 1 1 1 1 ~ ~ ~ 0 0 0 0 1</nowiki></code>
*** <code>1 1 1 1</code> are, in order, the three RGB color values (0-1) and the size of the particle.
* <code>/particle <name> <pos></code> is now a valid shortcut. <code>delta</code>, <code>speed</code>, and <code>count</code> will default to <code>0</code>.
<div class="collapsible collapsed" data-expandtext="show" data-collapsetext="hide" style="width:400px;">
* Particle names have been changed.
<div class="collapsible-content">
* <code>old name</code> -> <code>new name</code>
** <code>mobSpellAmbient</code> -> <code>ambient_entity_effect</code>
** <code>angryVillager</code> -> <code>angry_villager</code>
** <code>blockdust, blockcrack</code> -> <code>block</code>
** <code>damageIndicator</code> -> <code>damage_indicator</code>
** <code>dragonbreath</code> -> <code>dragon_breath</code>
** <code>dripLava</code> -> <code>dripping_lava</code>
** <code>dripWater</code> -> <code>dripping_water</code>
** <code>reddust</code> -> <code>dust</code>
** <code>spell</code> -> <code>effect</code>
** <code>mobappearance</code> -> <code>elder_guardian</code>
** <code>enchantmenttable</code> -> <code>enchant</code>
** <code>magicCrit</code> -> <code>enchanted_hit</code>
** <code>endRod</code> -> <code>end_rod</code>
** <code>mobSpell</code> -> <code>entity_effect</code>
** <code>largeexplosion</code> -> <code>explosion</code>
** <code>hugeexplosion</code> -> <code>explosion_emitter</code>
** <code>fallingdust</code> -> <code>falling_dust</code>
** <code>fireworksSpark</code> -> <code>firework</code>
** <code>wake</code> -> <code>fishing</code>
** <code>happyVillager</code> -> <code>happy_villager</code>
** <code>instantSpell</code> -> <code>instant_effect</code>
** <code>iconcrack</code> -> <code>item</code>
** <code>slime</code> -> <code>item_slime</code>
** <code>snowballpoof</code> -> <code>item_snowball</code>
** <code>largesmoke</code> -> <code>large_smoke</code>
** <code>townaura</code> -> <code>mycelium</code>
** <code>explode, snowshovel</code> -> <code>poof</code>
** <code>droplet</code> -> <code>rain</code>
** <code>sweepAttack</code> -> <code>sweep_attack</code>
** <code>totem</code> -> <code>totem_of_undying</code>
** <code>suspended</code> -> <code>underwater</code>
** <code>witchMagic</code> -> <code>witch</code>
** <code>take</code> -> removed
** <code>footstep</code> -> removed
** <code>depthsuspend</code> -> removed
</div></div>

; {{cmd|playsound}}
* Will {{key|Tab}} auto-complete custom sound events.

; {{cmd|replaceitem}}
* The syntax of {{cmd|replaceitem}} has changed.
** <code>/replaceitem block <pos> <slot> <item> [<count>] [<data>] [<nbt>]</code> is now <code>/replaceitem block <pos> <slot> <item> [<count>]</code>
** <code>/replaceitem entity <target> <slot> <item> [<count>] [<data>] [<nbt>]</code> is now <code>/replaceitem entity <target> <slot> <item> [<count>]</code>
** See the item argument type for more details.
* The <code>slot</code> argument no longer requires <code>slot.</code>
** For example, <code>slot.hotbar.1</code> now is <code>hotbar.1</code>

; {{cmd|scoreboard}}
* {{cmd|scoreboard}} had <code>[<dataTag>]</code> removed from its commands in favor of the <code>nbt</code> argument in entity selectors.
* <code>/scoreboard players tag</code> and <code>/scoreboard teams</code> removed. Replaced by {{cmd|tag}} and {{cmd|team}} respectively.
* <code>/scoreboard players test</code> removed in favor of <code>execute (if|unless) score</code>, entity selectors and <code>/scoreboard players get <target> <objective></code>
* Objective names are now text components, not raw strings.

; {{cmd|seed}}
* The output can now be copied.

; {{cmd|setblock}}
* The syntax of {{cmd|setblock}} has changed.
** <code>/setblock <pos> <block> [<data>] [<mode>] [<nbt>]</code> is now <code>/setblock <pos> <block> [<mode>]</code>
** See the block argument type for more details.

; {{cmd|stats}}
* Removed. Now part of {{cmd|execute}}.
* The new {{cmd|execute}} one isn't a direct replacement, the behavior has changed:
** It's now per-command, instead of per-entity or per-block.
** There's only <code>result</code> and <code>success</code>, which covers all the old stat types.

; {{cmd|stopsound}}
* <code>*</code> can now be used instead of <code>source</code> to stop all sounds with a certain name, across all sources.

; {{cmd|tag}}
* Replaces <code>/scoreboard players tag</code>.
* Keeps the same syntax.
** <code>/tag <players> add <tag></code> to add <code><tag></code> to <code><players></code>.
** <code>/tag <players> remove <tag></code> to remove <code><tag></code> from <code><players></code>.
** <code>/tag <players> list</code> to list all tags on <code>players</code>.

; {{cmd|team}}
* Replaces <code>/scoreboard teams</code>.
* Keeps the same syntax.
** <code>/team add <team> [<displayname>]</code>
** <code>/team empty <team></code>
** <code>/team join <team> [<members>]</code>
** <code>/team leave [<members>]</code>
** <code>/team list [<team>]</code>
** <code>/team modify <team> <option> <value></code>
** <code>/team modify <team> [<displayname>]</code>
* Teams can now have a prefix and a suffix.
** <code>/team modify <team> prefix <prefix></code>
** <code>/team modify <team> suffix <suffix></code>
* Team names are now text components, not raw strings.

; {{cmd|testfor}}, {{cmd|testforblock}} and {{cmd|testforblocks}}
* Removed. Now part of {{cmd|execute}}.

; {{cmd|toggledownfall}}
* Removed. It was always used to stop the rain, but rain usually quickly returned.
* Use {{cmd|weather}}.

; {{cmd|tp}} and {{cmd|teleport}}
* {{cmd|tp}} is now an alias of {{cmd|teleport}} (much like {{cmd|w}}, {{cmd|msg}} and {{cmd|tell}}).
* {{cmd|teleport}} has been simplified a bit, to avoid ambiguity.
** <code>/teleport <entity></code> doesn't allow rotation or facing, will teleport the [[player]] to the entity.
** <code>/teleport <x y z></code> doesn't allow rotation or facing, will teleport the [[player]] to the position.
** <code>/teleport <victim> <entity></code> doesn't allow rotation or facing, will teleport victim to entity.
** <code>/teleport <victim> <x y z> [yRot xRot]</code> will teleport victim to that position with optional rotation.
** <code>/teleport <victim> <x y z> facing [xFacing yFacing zFacing]</code> will teleport victim to that position facing another position.
** <code>/teleport <victim> <x y z> facing entity <entityFacing> [feet|eyes]</code> will teleport victim to that position facing an entity's feet or eyes (default feet).
** Teleporting to an entity in another dimension is now allowed.

; {{cmd|trigger}}
* <code>/trigger <objective></code> is a new syntax as a shortcut for <code>/trigger <objective> add 1</code>.
; {{cmd|weather}}
* If a time isn't specified, it now defaults to 5 minutes (previously random).

; Team
* Option <code>friendlyfire</code> capitalization changed to <code>friendlyFire</code>.

; Argument Types

;[[Target selector]]s
* More error handling has been introduced.
** Things like <code>limit=0</code>, <code>level=-10</code>, <code>gamemode=purple</code> are not allowed.
* Arguments may now be quoted.
* There are no longer separate "min" and "max" values; instead ranges are supported.
** <code>level=10</code> is level 10.
** <code>level=10..12</code> is level 10, 11 or 12.
** <code>level=5..</code> is anything level 5 or above.
** <code>level=..15</code> is anything level 15 or below.
* The arcane shorthand names have been renamed.
** <code>m</code> -> <code>gamemode</code>
** <code>l</code> or <code>lm</code> -> <code>level</code>
** <code>r</code> or <code>rm</code> -> <code>distance</code>
** <code>rx</code> or <code>rxm</code> -> <code>x_rotation</code>
** <code>ry</code> or <code>rym</code> -> <code>y_rotation</code>
** <code>c</code> -> <code>limit</code>
* <code>x</code>, <code>y</code>, <code>z</code>, <code>distance</code>, <code>x_rotation</code> and <code>y_rotation</code> are now doubles and allow values like <code>12.34</code>
** <code>x</code> and <code>z</code> are no longer center-corrected.
*** This means <code>x=0</code> no longer equates to <code>x=0.5</code>.
* <code>gamemode</code> (previously <code>m</code>) no longer allows numerical or shorthand IDs.
* <code>limit</code> (previously <code>c</code>) no longer allows negative values.
** Use <code>sort=furthest</code> instead.
* The <code>name</code> argument now supports spaces (as long as it's quoted).
* Multiple of the same argument in target selectors is now possible.
** <code>tag=foo,tag=bar,tag=!baz</code> matches someone with <code>foo</code>, <code>bar</code> and not <code>baz</code>.
** <code>type=!cow,type=!chicken</code> matches something that isn't a cow and isn't a chicken.
** <code>type=cow,type=chicken</code> isn't allowed, because something cannot both be a cow and chicken.
* The player can specify the sorting.
** <code>sort=nearest</code> is the old default, sorting by distance (default for <code>@p</code>)
** <code>sort=furthest</code> is the reverse of that (previously, players would use <code>c=-5</code> for this)
** <code>sort=random</code> for random sorting (default for <code>@r</code>)
** <code>sort=arbitrary</code> is a new option to not sort the result (default for <code>@e</code>, <code>@a</code>)
* Specifying scores now looks like <code>scores={foo=1,bar=1..5}</code>
* Players can test for advancements with <code>advancements={foo=true,bar=false,custom:something={criterion=true}}</code>
** <code>true</code> for "they completed the advancement", <code>false</code> for "they have not completed the advancement"
** Alternatively, pass a block of specific criteria to test for (again, <code>true</code> or <code>false</code>)

; [[Block]]s
* Wherever a <code><block></code>, optionally <code><nowiki>[<data>]</nowiki></code> and optionally <code>[<nbt>]</code> was required, it's now a single <code><block></code> argument that looks like this:
** <code>stone</code>
** <code>minecraft:redstone_wire[power=15,north=up,south=side]</code>
** <code>minecraft:jukebox{RecordItem:{...}}</code>
** <code>minecraft:furnace[facing=north]{BurnTime:200}</code>
* ID is required (though just as before, if namespace isn't set it defaults to <code>minecraft:</code>).
* States are inside <code>[]</code>, comma-separated and must be properties/values supported by the blocks. They are optional.
** <code>minecraft:stone[doesntexist=purpleberry]</code> is a syntax error, because <code>stone</code> doesn't have <code>doesntexist</code>.
** <code>minecraft:redstone_wire[power=tuesday]</code> is a syntax error, because <code>redstone_wire</code>'s <code>power</code> is a number between 0 and 15.
* NBT tag is inside {}, and works just like players would expect. It's optional.
* In the context of "conditions"/testing for blocks, only the states the player provided will be tested.
** If players test <code>redstone_wire[power=15]</code>, it only checks power, but ignores other states such as <code>north</code>.
* In the context of setting blocks, any states the player provided will be set, but anything missed out will default depending on the block.
** If players set <code>redstone_wire[power=15]</code>, it will set <code>power</code> to 15, but <code>north</code> will be a default value (in this case, set to <code>none</code>).
* There is no such thing as block data value in 1.13. It's either a different block, or a state.

; [[Item]]s
* Wherever an <code><item></code>, optionally <code><nowiki>[<data>]</nowiki></code> and optionally <code>[<nbt>]</code> was required, it's now a single <code><item></code> argument that looks like this:
** <code>stone</code>
** <code>minecraft:stick{display:{Name:"\"Stick of Untruths\""}}</code>
* ID is required (though just as before, if namespace isn't set it defaults to <code>minecraft:</code>).
* NBT tag is inside {}, and works just like players would expect. It's optional.
* There is no such thing as item data value or item damage value in 1.13.
** Damage, where applicable, is a property in nbt.
** Any other information is either a separate item or a property in nbt.

=== General ===

;[[The Flattening]]
* Numeric block metadata completely phased out in favor of block states.
* Split, merged, created, deleted, and renamed a lot of blocks, blockstates and items.
** Blocks and items previously differing because of damage value have gotten their own id, for example <code>white_wool</code> instead of <code>wool:0</code>
** Damage has been moved to the <code>tag</code> tag and is only used by tools and armor; maps use a <code>map</code> tag.
*** The damage predicate has been reversed - 0.6 now means 60% durability remaining, not 60% broken
** Files and commands no longer use <code>data</code> or <code>set_data</code>.
* Structures do not run an upgrade path for this.
** To update structures, load them all in 1.12, then update to 1.13 and save all structures again.

; [[Title Screen|Menu screen]]
* New title screen background, featuring many of the structures, blocks, and mobs that were added in the Update Aquatic.
** The menu panorama uses seed <code>1458140401</code> at coordinates X=1553, Y=58, Z=-1162

; [[Advancements]]
* Advancement descriptions now have colors:
** Normal and goal advancements have green descriptions.
** Challenge advancements have purple descriptions.

; [[Controls]]
* The name of keybindings now describes the actual key (e.g. 'LBUTTON' -> 'Left Button', 'BACKSLASH' -> '\')

; [[Creative inventory]]
* Because of [[1.13/Flattening|The "flattening"]], certain blocks and items have been moved around in their respective groups, for example the [[Purpur block]] is now after [[Obsidian]].
* [[Mushroom Block]]s, [[farmland]] and [[grass path]] are added to the inventory under the ''Decoration Blocks'' group. Additionally, blank [[firework rocket]]s are added to the ''Miscellaneous'' group.

; [[Credits]]
* Updated the credits list to include all of the Mojang staff.

; [[Debug screen]]
* '''Left side:
** Added "Looking at liquid" row. Displays the targeted fluid's coordinates.
** "Looking at" row has been renamed "Looking at block" and now targets through liquids.
* '''Right side:
** "Targeted Block" information now targets through fluids.
** "Targeted Block" now displays information for blocks up to 16 blocks away.

; Fonts
* The Latin extended alphabet, along with Greek and Cyrillic, have been given their own "textured" font. However, some characters (such as kanji and script) still use the unicode font.
* Fonts are now saved as [[wikipedia:TrueType|TrueType]] font files.

; [[Music]]
* Three brand new pieces of underwater music by [[C418]] have been added:
** ''Shuniji'', ''Dragon Fish'' and ''Axolotl''.
** Their ID for commands is <code>music.under_water</code>.

; [[Options]]
* Removed 3D Anaglyph completely.
* Option <code>Fullscreen resolution</code> capitalization changed to <code>Fullscreen Resolution</code>.
* Values for GUI Scale has been renamed from Small, Medium and Large to 1,2 and 3. GUI scaling will also detect the resolution of monitors and offer even higher scaling options (4 for 1080p, 5 for 4k and so on).

; [[Particles]]
* Optimized particle rendering slightly.
* Dripping
** Changed which blocks show dripping liquids.
** Drip particles are now generated by [[Waterlogging|waterlogged]] blocks where appropriate.<ref>{{bug|MC-127025}}</ref>
** Drip particles now snap to the hitbox of the block they appear on.<ref>{{bug|MC-1390}}</ref>
** Added a new block [[tag]] to prevent all solid [[glass]] blocks from showing dripping liquid particles. See [[#General|Tags]].

; [[Recipe]]s
* Custom recipes can now be loaded from data packs in <code>data/(namespace)/recipes/(name).json</code>
* Added a recipe book for the furnace.
* Furnace recipes have been moved to JSON files.
** They use <code>"type": "smelting"</code>.
** <code>cookingtime</code> is used to determine the time it should take to smelt an item in the furnace.
** <code>experience</code> is used to determine the amount of experience a player should get when picking the resulting item out of the furnace manually.
** Fuel is not included and is still hardcoded.
* "Unlocked recipe" toasts now show an icon in the top left to specify whether the unlocked recipe is a crafting or smelting recipe.

; [[Resource pack]]s
{{Resource pack format/value|4}}

; [[Statistics]]
* Statistics are being updated.
** <code>stat.(stat)</code> is now <code>minecraft.custom:minecraft.(stat)</code>.
** <code>stat.(stat).minecraft.(block/item/entity ID)</code> is now <code>minecraft.(stat):minecraft.(block/item/entity ID)</code>.
; Tooltips
* Added (and fixed) [[rarity]] values for certain items. [[Item]]s with a rarity value will have their [[hotbar]] tooltips, which are displayed when scrolling over them in the hotbar, displayed as their respective colors when highlighted, rather than just being white.<ref>{{bug|MC-130145}}</ref>
{| class="wikitable sortable" data-description="Changed item tooltip's color"
! Item !! New Rarity
|-
| [[Beacon]] || class="general-background-cyan" | Rare
|-
| [[Chain Command Block]] || class="general-background-magenta" | Epic
|-
| [[Command Block]] || class="general-background-magenta" | Epic
|-
| [[Conduit]] || class="general-background-cyan" | Rare
|-
| [[Creeper Head]] || class="general-background-yellow" | Uncommon
|-
| [[Dragon Egg]] || class="general-background-magenta" | Epic
|-
| [[Dragon Head]] || class="general-background-yellow" | Uncommon
|-
| [[Dragon's Breath]] || class="general-background-yellow" | Uncommon
|-
| [[Elytra]] || class="general-background-yellow" | Uncommon
|-
| [[Enchanted Golden Apple]] || class="general-background-magenta" | Epic
|-
| [[Enchanted Book]]s || class="general-background-yellow" | Uncommon
|-
| Enchanted Items (excluding books) || class="general-background-cyan" | Rare
|-
| [[End Crystal]] || class="general-background-cyan" | Rare
|-
| [[Bottle o' Enchanting]] || class="general-background-yellow" | Uncommon
|-
| [[Golden Apple]] || class="general-background-cyan" | Rare
|-
| [[Heart of the Sea]] || class="general-background-yellow" | Uncommon
|-
| [[Music Disc]]s || class="general-background-cyan" | Rare
|-
| [[Nether Star]] || class="general-background-yellow" | Uncommon
|-
| [[Player Head]] || class="general-background-yellow" | Uncommon
|-
| [[Repeating Command Block]] || class="general-background-magenta" | Epic
|-
| [[Skeleton Skull]] || class="general-background-yellow" | Uncommon
|-
| [[Structure Block]] || class="general-background-magenta" | Epic
|-
| [[Totem of Undying]] || class="general-background-yellow" | Uncommon
|-
| [[Wither Skeleton Skull]] || class="general-background-yellow" | Uncommon
|-
| [[Zombie Head]] || class="general-background-yellow" | Uncommon
|}
* Additionally, attack speed and attack damage in tools' info are now {{color|#0A0|dark green}}.

; Other
* Game library updated to LWJGL 3.
** Updated LWJGL from version 3.1.2 to 3.1.6.
* Loading or creating a world shows the percentages of the loading stages.
** <code>Preparing spawn area</code> now shows as a loading stage.
* Crash reports now list what data packs are enabled.
* Data generators are now exposed, players can get a dump of all blocks/items/commands/etc from the game without opening it up.
* Changed translation files from <code>.lang (key=value)</code> to <code>.json ("key": "value")</code>.
** Now supports newlines.
* Optimized cloud rendering.
* Optimized fog rendering.
* Optimized world spawn position–finding code.
* Removed <code>skip_existing_chunks</code> from exploration map loot table function.
* Upgrade path optics code is now in a separate library, datafixerupper.<ref>https://libraries.minecraft.net/com/mojang/datafixerupper/1.0.3/datafixerupper-1.0.3.pom; https://arxiv.org/ftp/arxiv/papers/1703/1703.10857.pdf for info on optics</ref>

== Fixes ==
{{fixes|fixedin=1.13,1.13-pre10,1.13-pre9,1.13-pre8,1.13-pre7,1.13-pre6,1.13-pre5,1.13-pre4,1.13-pre3,1.13-pre2,1.13-pre1,18w22c,18w22b,18w22a,18w21b,18w21a,18w20c,18w20b,18w20a,18w19b,18w19a,18w16a,18w15a,18w14b,18w14a,18w11a,18w10d,18w10c,18w10b,18w10a,18w09a,18w08b,18w08a,18w07c,18w07b,18w07a,18w06a,18w05a,18w03b,18w03a,18w02a,18w01a,17w50a,17w49b,17w49a,17w48a,17w47b,17w47a,17w46a,17w45b,17w45a,17w43b,17w43a|prefix=Minecraft
|;LWJGL 2-related issues
|1519|Key gets stuck when toggling {{control|fullscreen}}.
|7192|The generation of "terrain" surface layer in Nether produces local straight artifacts/glitches.
|3643|{{key|CTRL}}/{{key|CMD}} key get stuck on OS X/Text Box Backspace deletes whole word or whole line on Mac and Linux.
|5520|Crash when toggling {{control|fullscreen}} mode: Keyboard must be created before you can read events.
|6436|Incomplete support of dead keys on non U.S. QWERTY Keyboard on OS X.
|9974|Initialization of OpenAL fails sometimes.
|29501|Unable to rebind to F# Keys on devices that require pressing FN.
|32327|Half-resolution on MBP Retina.
|40227|Mouse Button 4 in combination with a modifier key is detected as Mouse Button 5.
|49755|OS X: Pressing arrow or Fn keys in sign/command block/book and quill inserts invisible characters.
|53549|Minecraft can't be put in {{control|fullscreen}} mode in Linux.
|55506|Minecraft unloads monitor calibrations when closed.
|60995|Maps inconsistent over restarts.
|68754|Exiting {{control|fullscreen}} disables window resize.
|71279|Accentued character act like sticky keys for moving.
|72856|Control settings uses partwise US keyboard layout (on German keyboard layout).
|77279|Game sets monitor to half resolution on exit on Linux.
|78394|{{control|Use|text="Use Item"}} not working while {{control|sneaking}} and {{control|Use|text="Use Item"}} bound to NUMPAD0.
|79733|{{key|ALT}} combinations don't work on chat.
|80282|On Linux in fullscreen, character sometimes cannot fully turn around.
|81818|When resizing the window, you may end up spinning around.
|87205|Colored names in command blocks lose colors with arrow keys.
|89288|Can't {{control|sneak}} and {{control|jump}} if the {{control|jump}} key is on the numpad.
|90598| {{ctrl|Sneaking}} while {{ctrl|swimming}} or gliding changes eye hight to outside the hitbox.
|100556|{{key|Alt Gr}} on keyboard becomes "{{key|LCONTROL}}" in controls menu (interfering with "{{key|CTRL}}").
|106650|Minecraft does not release mouse focus.
|109376|Unsupported keys in inventory with foreign keyboard on Linux.
|120989|Screen goes blank on exit.
|;old
|96|[1-9] clicking an item out of a furnace does not give XP.
|258|Most text boxes/chat/scroll bars revert when the window changes size, {{control|fullscreen}} mode is toggled, or fullscreened game is tabbed into.
|1168|Lily pad sometimes destroys water block.
|1218|Arrows shot at the top half of a door will float once the door is opened.
|1390|Upper slabs with water/lava on top makes midair dripping water/lava
|1511|Anvil can be {{control|placed}} in certain blocks.
|1685|Unable to write in a new blank Book and Quill after renaming it in an anvil.
|1809|Some trees generate with leaves too far from logs.
|1875|Snow layers don't drop themselves when harvested with a silk touch tool.
|1947|Pumpkins and Jack o' Lanterns can only be {{control|placed}} on solid blocks.
|2208|Blocks with special placement can be {{control|placed}} inside player/entity.
|2340|Redstone torches schedule updates when they should not, causing unreliable timings.
|2399|Transparent blocks visually use the brighter light level that they are next to.
|2666|Corner cobblestone wall has incorrect collision box.
|3115|Baby Zombies do not burn.
|3794|Chest direction {{control|placing}} glitch.
|4381|Water places behind tall grass.
|4438|Items dropped on unburnable blocks turn invisible when trying to ignite the block.
|4504|The hitbox of brewing stands is missing the blaze rod.
|4581|Fishing rod bobbers can go through Nether/End Portals, but disappear.
|4923|Flint and steel and fire charges can place fire at invalid positions.
|5024|Reticle/Crosshair not centered on the screen.
|5037|Riding a pig/horse with a cape causes it to not behave as expected.
|5305|Burning arrows in ground are not extinguished by rain.
|5461|Block stats doesn't count red mushrooms, sugar canes, etc...
|5694|High efficiency tools/fast mining {{control|destroys}} some blocks client-side only.
|7908|Spawning underwater/In the middle of an (lava) ocean.
|8220|Water/lava bucket can be used to destroy ladders.
|8471|Blocks cannot be {{control|placed}} on a block you are next to.
|9186|Water does not leak through leaves and regular stairs but upside down stairs.
|9194|A Comparator can lock a Repeater, but the Repeater doesn't look like it is locked.
|9620|F1 and open chat makes hotbar appear.
|9669|Player renders black in a 1x1 shaft with torch in upper block.
|9704|Sometimes randomly unable to place ladder while standing in the same block.
|10632|Boats show water splashes when falling from high places, even if not in water.
|10880|Comma or other symbol after @ selector does not work with command blocks.
|11138|Creative inventory GUI border are considered as exterior to the inventory.
|11142|Placing a Redstone Torch/Block next to a rail junction does not change the rail direction.
|11208|The big tree generator handles tree height variable incorrectly.
|11242|When you {{control|jump}} and {{control|place}} a fence post under you you will get inside the fence post.
|12000|The hitbox of corner fences isn't the same as the collision-box.
|12269|Various Particles glitchy movement.
|12699|Some PNGs using grayscale or tRNS are processed incorrectly.
|13308|Waterflow North/South Bug.
|14502|Special characters on splash text on title screen rendered wrong.
|18903|Villagers'/ Witchs' right arm doesn't have the texture flipped.
|19966|Fully grown pumpkin stems attach to pumpkin, even if another stem is already attached.
|20974|Default font is missing characters.
|24390|Books don't sign properly.
|25866|Splash Potion of Saturation has no effect.
|26739|Doors won't update with redstone.
|29490|1.7+ lighting bug/black spots.
|31038|Double-tall plants do not cause updates when broken.
|31222|Crash on pressing the inventory close key and an item manipulation key at the same time in large chests.
|31346|When you light a cobblestone wall, it turns into a corner piece for a second.
|32522|Confusing error message when targeting a location in an unloaded chunk.
|32539|You can write on both the server name and the server address input field at the same time.
|32972|{{cmd|summon}} accepts arguments that it will ignore.
|33710|Snow & Iron Golem, Ender Dragon, Illusioner, Giant, and Wither not in Mob statistics.
|34365|Triple Chest - Triple Bug.
|35119|Buttons for video settings to not make a sound.
|35856|Multiple background/title songs playing at one time/automatic music overlap (not Jukebox music).
|36030|Music playing despite music/jukebox slider set to OFF.
|36191|Missing {{cd|stat.mineBlock}} for various blocks (mob spawners, cauldrons, beds, etc.).
|39948|Blocks/Items only different by data value are not listed separately in statistics.
|41410|Random text does not work in unicode.
|47832|Certain entities can't be selected by type.
|48089|When destroyed, end portal giving "missing texture" particles.
|48522|{{key|CTRL}} + {{control|pick block}} on flower pot gives you the flower (+NBT) instead of the flower pot.
|50640|Big oak tree inconsistency.
|50795|{{cd|CanDestroy}} and {{cd|CanPlaceOn}} can be used with item ID's instead of the names.
|52036|using testfor in {{cmd|execute}} command failure.
|52974|Host's skin not visible to other players when in LAN world.
|53439|The top block of a two-block plant temporarily becomes a peony/sunflower upon {{control|placing}} a block in the bottom.
|53448|Sliders cannot be adjusted accurately (tested in customized world settings).
|55592|The wildcard * fits into wrong commands without error.
|55710|Relative tp from a vehicle applies dismount offset.
|55751|Gamemode descriptions are off center.
|55800|Successful "<code>/setblock air destroy</code>" commands give error message and return <code>0</code> for result/success.
|57332|Number arguments in command have all int limitation.
|58189|Breaking piston extension gives missing texture particles.
|58556|Breaking a block being moved by a piston creates missing texture particles.
|58809|Scoreboard teams add "{{cd|@e}}" doesn't work correctly.
|59511|Tellraw has incomplete error message when key determining text to display is missing.
|59517|TNT {{cd|explode{{=}}true}} blockstate drops TNT item when fused by {{control|hit}} in survival mode.
|59610|Cactus has full block hitbox.
|59691|Inconsistent block/item names: brick(s)
|59729|{{cmd|replaceitem}} doesn't work with chest or hopper minecarts.
|60117|Upper slabs can't be {{control|placed}} when standing on a lower slab 2 blocks below.
|61821|Digging Snow Layer yields one snow ball too much.
|62093|Double plants get generated without bottom part.
|63714|Zombie Pigmen get angry when {{control|hit}} in creative.
|63748|Commands with incorrect syntax executed for multiple entities prints error message multiple times.
|63820|Empty Flower Pot in Witch Hut.
|64416|Wrong matched block names / missing distinction between block names.
|64455|Translation missing for some blocks.
|64537|Gui zooming out when using some languages (unicode).
|64539|Spreadplayers respectTeams and player arguments have no tab completion.
|64836|Mobs "control" the minecart they are riding.
|64919|Ability to {{control|place}} a block through T-intersection glass panes, iron bars and fences when standing inside of hitbox.
|65774|Landing particles not showing when land on skulls.
|65983|Mouse cursor moves off-window when accessing inventory (or item contents).
|68446|Some entities have missing translations string in the lang files.
|68565|Monsters spawn at daytime at y{{=}}256 and don't burn.
|68809|Held Item renders black when in a 1 x 1 shaft with torch in upper block.
|69042|{{cmd|summon}} coordinate syntax should be different.
|69822|Command help strings and feedback say "player" when entities are applicable as well.
|69880|{{cmd|effect}} returns "cannot be found" for invalid entities.
|70010|Double plants can be {{control|placed}} at and grow at y {{=}} 255 resulting in incomplete double plant.
|70188|Some blocks cannot be {{control|placed}} facing a wall with {{cmd|setblock}} or {{cmd|fill}} + datavalues or block states.
|71401|Tab list ignores initial display name of players.
|72634|Lily Pad placement noise inconsistent.
|72866|Item shading inside item frames does not account for rotation.
|72943|Game freeze after closing an "Open to LAN" single player world.
|73207|Minecraft server list displays "Can't connect to server" on startup.
|73344|"Moss Stone" is name incorrectly, it should be called "Mossy Cobblestone".
|73495|Commands saying item names use incorrect/wrong item names.
|73637|Nether World Border Crash: Exception Ticking World.
|74231|Flower pot's blockdata won't visually update.
|74703|Redstone Ore does not produce particles on bottom side if not at height 0.
|75193|Target selectors don't work in server only commands.
|75279|Cape physics while {{control|sprint}}-flying.
|75430|Enderman held block not fully updated from old block ID system.
|75940|Block {{cd|log2}} and {{cd|leaves2}} crash the game when set to certain data values.
|76044|{{cd|randomTickSpeed|spawnRadius|maxEntityCramming|maxCommandChainLength|d=and}} gamerules accept non-integer value.
|76312|Testfor output doesn't show UUID or team color.
|76356|Bold unicode characters appear doubled.
|76920|Non-solid blocks don't show up on maps if the block below isn't solid.
|77488|TAB player list sorts player names based on ASCII values instead of alphabetically.
|77570|"and" doesn't get translated when listing entities.
|77600|Command block pick block with NBT and <code>sendCommandFeedback</code> is bugged.
|78780|<code>/fill hollow</code> and <code>/fill destroy</code> calculates number of blocks incorrectly.
|78920|Incorrect {{cmd|gamerule}} syntax (typing only {{cmd|gamerule}} doesn't return any error).
|79255|Using {{cmd|trigger}} first time on player gives score of 0 but not displayed on scoreboard.
|80096|Insufficient handling of Damage tag.
|80400|Sizelimited entity selectors (@e with c{{=}}1,@r with type{{=}}!entity) in commands prefer players.
|80856|Command syntax inconsistencies.
|80893|Sender bias <nowiki>(c=1)</nowiki> applies when sender is not the closest entity to specified x/y/z origin.
|80928|Player sits too ahead when riding a (skeleton/zombie) horse/donkey/mule.
|81746|Falling block entities don't check for data values: converting sand to red sand.
|81806|worldborder add allows size >{{=}} 0 while worldborder set only allows size >{{=}} 1.
|81876|Number of characters before line cutoff in chat is not same when unicode mode is enabled and when it is off.
|82703|Block Entities are not properly removed when 64 or more blocks are changed at the same time in a single chunk.
|83064|Accumulated fall damage is not reset when levitation starts.
|84173|Trapdoors get a redstone update when being pushed/pulled next to a power source, but not when being pushed/pulled away from it.
|85394|Spawning 'crit' particle with speed >100 causes a extreme lagspike.
|86016|Some Mojang staff not mentioned in credits.txt.
|86321|Scoreboard players tag won't autofill/tab complete tag argument.
|86980|Placing some blocks at position and side of any replaceable block isn't possible.
|87129|Cannot save empty command for command block minecart.
|87365|Incorrect syntax for scoreboard players tag.
|87559|Gamerule missing indicator for affected gamerule.
|87587|Server kicks client when executing: <code>/title @a title []</code> or <code>/tellraw @a []</code>.
|87799|{{cmd|execute}} detect functions inconsistently with semi- (snow layer, grass path, soul sand, farmland) blocks.
|88230|When feeding a tamed horse or llama with a golden apple/carrot or hay bale, the cursor moves to the right.
|88481|'<code>/worldborder set</code>' allows small decimal numbers but does not display them correctly in chat.
|88632|Unable to open command blocks & no particles when opening to LAN.
|88674|Growing cactus {{control|placed}} on blocks other than (red) sand drops two cacti instead of breaking.
|89428|Rails update other rails before checking if they are in a valid location when moved by pistons.
|89634|Spreadplayers favours the negative coordinates.
|90072|Witch in boat can't throw splash potion.
|90174|Carpet ghostblocks.
|90265|UI Accounts For Significant FPS Reduction.
|90591|Camera instantaneously changes position when elytra is deployed, rather than smoothly.
|91245|One character namespaces are treated as {{cd|minecraft:}}.
|91459|{{cmd|setblock}} at Y{{=}}256 shows unique message compared to using other outside-world setblock commands / Using {{cmd|setblock}} at Y>256 says max building height is 256.
|91727|loot table "spreading large stacks" will overwrite existing items.
|91759|End dimension only: End crystals aren't actually pushed server-side, causing ender crystal location desync.
|92061|Full speed ridden boats generate water splash particles under the boat.
|92255|Singleplayer freezes instead of kicking a player.
|92408|Arrows/trident move slightly after a second after hitting the target.
|92901|End Crystals placed at high coordinates are placed with offset.
|93129|Falling sand behaves incorrectly in lazy chunks.
|93468|Water and lava flow affected by random ticks.
|93908|Fireball only flies in 1 direction when hitting it by bow/snowball while running a {{cmd|tp}} command.
|94027|"{{cd|carried}}" tag of Enderman reads value as string and short.
|94186|{{cd|BlockDragonEgg}} does not extend {{cd|BlockFalling}}.
|94325|Shadow of obfuscated text does not match with displayed character.
|94487|Ravines don't naturally cut through sand, sandstone, or terracotta upon generation, but other cave types do.
|96321|Mob cannot pathfinding in the daylight sensor.
|96524|Language specific letters don't look like they should.
|96564|Mobs don't rotate properly while walking on light sensor.
|96911|Iron golem / VillagerGolem killing monster it is riding has broken AI.
|96929|{{cmd|enchant}} command missing indicator for affected entity and enchanting.
|97196|{{cmd|spreadplayers}} shows wrong error message/large number in error message when no entities were spread.
|97355|Lily pads {{control|placed}} on ice plays wrong sound.
|97952|Enderdragon does not have a radii option.
|98123|Saturation with an {{cd|AreaEffectCloud}}.
|98244|Same UUID infinite times possible + changing UUID possible via entitydata.
|98823|tipped arrows do not have a stat.craftItem statistic.
|98928|Snowballs launched from a boat destroyed instantly.
|99057|Cannot {{control|place}} corner vines.
|99321|Hoppers cannot pull items from double chests if second chest is blocked.
|99342|Private bytes (RAM usage) rising drastically when game window is minimized.
|99434|<code>worldborder damage</code> command not giving any feedback with invalid argument.
|99748|scoreboard teams join and leave not showing error message for missing player argument in command blocks.
|101113|{{cmd|playsound}} command is not validating arguments correctly.
|101135|Confusing error message for relative coordinates with too high numbers.
|101169|Double slab creation over offhand
|101232|Big tree generator causes memory leak.
|101332|Can use the {{cd|FallingSand}} to go through the cobblestone wall(mossy).
|102403|Persistent/unchangeable sounds after (re-)opening a world.
|102440|Large oak trees not spawning or spawning abnormally in forest.
|102545|There are 352 different flower pots in the debug world.
|102682|Horse shoes and horse leg are separated.
|102896|Mobs can't pathfind through open doors.
|103023|Village house overlap.
|103035|Dragon Egg doesn't create fallingdust particles.
|103516|Spider and chicken jockeys only spawn the additional mob.
|103744|Misaligned text in world creation page for Unicode fonts.
|103913|Auto jump on world border.
|105050|Some blocks are tracked in statistics/objectives for similar blocks despite having their own space to be tracked.
|105194|Most of zombie villagers in a zombie village are babies.
|105139|Entity head rotation not interpolating on Yaw axis.
|105502|Enabling clouds incurs a huge performance penalty.
|105591|Flint and Steel loses durability and fire charge is used up even if no fire was placed.
|105820|Relative decimal coordinates with block related commands are inconsistent.
|105832|Torch doesn't work in one block space.
|105918|Lose of item on kick while in anvil.
|106024|Fence gate does not update {{cd|in_wall}} block state when placed by command.
|106127|Some blocks cannot be given certain block states.
|106387|Lava doesn't decrease SKY light.
|106681|Scoreboard teams leave doesn't work if first player fails.
|107145|Entity kill stat objectives using old/incorrect entity names.
|107359|You can replace loot tables and advancements, but not structure files.
|107840|You can {{control|place}} blocks behind the shulker box when it's closing.
|108749|Mushrooms and Crops cause double plants to drop; leaves "head" of plant behind.
|108756|Dungeons generating triple chests.
|108967|"Selector '<selector>' found nothing" message is missing for <code>scoreboard teams join</code> and <code>scoreboard teams leave</code>.
|109348|Game crashes on loading world with a {{cd|java.lang.StackOverflowError}} after using structure blocks due to multiple block entities in the same location
|109591|Detecting the block states not saved in meta data does not work.
|109659|The observer only detected upgrade top of the door if opened/closed with energy (button, lever, etc.), but not with your hand.
|109799|Observer don't power when update and push by piston at the same time.
|109829|Observer keeps re-triggering when water observed
|109958|Shulkers teleport (and stay) below Y:0.
|110566|Failed <code>/scoreboard players operation</code> can still give a score of {{cd|0}}.
|110863|Custom name of double chest is not set for both chests and is based on direction.
|111288|Opening a singleplayer world shows 0% for a short moment.
|111341|Plains village generating in desert.
|111472|Game doesn't save anywhere that a chest is a double chest.
|111704|You can input any value in [old block handling] of {{cmd|setblock}} and {{cmd|fill}}.
|111755|Minecraft can crash when failing to connect to a server.
|112389|Saturation Potions no longer work.
|112394|Numeral ids can still be used in some commands.
|112693|<code>/scoreboard team colors</code> use raw {{cd|§}} formatting instead of text components.
|112742|Name of unnamed villager is rendered with TeamColor instead of prefix and suffix of scoreboard team.
|112743|Glowing outline and spectator GUI use prefix color instead of TeamColor.
|112891|Falling block entity drops block with metadata of item dropped when block would be mined causing malformed drops.
|112929|Beacon coloring issue.
|112974|Hostile mob doesn't teleport correctly when overworld/nether is already loaded.
|112992|Right clicking a command block minecart opens GUI and uses held item.
|113001|Some items act client-side always as if they were successfully used
|113127|Putting an item with invalid enchantments in the first slot of an anvil and an item with valid ones in the second one causes a crash.
|113347|Rails rotate when moved.
|113420|Boats can be {{control|placed}} outside the worldborder.
|113577|Mesa (Bryce) biome generates with seed of last world which generated the same biome before.
|113880|Items of replaceable blocks appear to successfully replace the same block in the world even though they do not.
|113962|Error message "Entity ... cannot be found" is shown when multiple entities match selector but only a single entity is expected.
|114243|{{cmd|clone}} syntax help is missing filtered case.
|114454|Placing flowers in flower pots do not update the flower pot for nearby players.
|114553|{{key|ALT+TAB}} while in {{control|fullscreen}} {{=}} crash.
|114721|{{cmd|title}} treats invalid second argument as "title".
|114722|Projectiles collide with hitbox of block instead of with collision box.
|114953|Setting title times to negative values acts like <code>/time ... clear</code>.
|114965|Placed tripwire hook updates blocks around opposite facing tripwire hook on same axis.
|115059|Narrator reads scoreboard team color codes in player names.
|115123|Parrots keep moving their legs even if they are on shoulders.
|115270|Can use {{cmd|publish}} to host multiple LAN worlds.
|115322|Updating string line in front of unattached tripwire hook that faces north or east updates blocks around the hook.
|115799|Colored bed flickers red when {{control|placing}}/{{control|destroying}}.
|115913|Attempting to fill an area with blocks consisting of multiple parts causes an unknown error.
|115957|Advancements, loot tables, resource packs and world folders don't require lower case.
|115987|Enderman sounds are {{cd|entity.endermen.xx}}.
|116045|{{cmd|banlist}} treats any non "IPs" argument as "players".
|116254|Players in Adventure mode can use some items even without {{cd|CanPlaceOn}} tag.
|116580|Iron trapdoors stay on after breaking power source, until updated.
|116758|Enter/exit nether, server reports: <player> moved too quickly.
|116928|Command block and spawner minecart data fixer not working correctly.
|117032|"Done" button in statistics screen is offset.
|117166|Corner stairs with torch/lever/button etc. doesn't cause block update when near destroyed support stair.
|117191|Tab-completion list doesn't change when moving cursor with mouse.
|117705|Cannot click in Creative search bar to change cursor position.
|117837|Player-{{control|placed}} leaves update when log block breaks.
|117906|Elytra (plural) are called "an Elytra" in advancements.
|117932|Bed particles cause Z-fighting.
|117933|{{cmd|clone}} command treats invalid optional arguments as if they were default.
|118019|{{cmd|execute}} does not center absolute horizontal integer coordinates on block.
|118037|{{cd|commandBlockOutput {{=}} false}} does not show command feedback of commands executed for player.
|118072|Redwood Taiga Hills M Biome misnamed.
|118153|Lava can only turn concrete powder into concrete when it falls into source block.
|118194|Ladders can be {{control|placed}} on any block when used with stairs.
|118202|Iron bars, glass panes, ... have incorrect selection hitbox on corners.
|118221|Vines cannot be {{control|placed}} below non-solid blocks.
|118308|Narrator is toggled when typing in some text fields.
|118324|One of magenta dye recipes is unlocked via getting Ink Sac.
|118346|Blocks that will be replaced when another block will be placed on them do not work with CanPlaceOn tag.
|118372|Faulty netty-4.1.9.Final release causes players to be kicked from the server.
|118408|Torches and redstone torches cannot be {{control|placed}} on top of a Jack o'Lantern but can be {{control|placed}} on pumpkin.
|118416|Recipe for bowl not unlocked until bowl or mushrooms are obtained.
|118565|Four negative signs in a selector which only has the potential to select one entity will attempt to parse as a UUID and fail.
|118606|Tame wolf will no longer fight after boat ride, until server is restarted.
|118850|Vines use opposite facing value when trying to spread in corners.
|118998|Cannot open URLs on Linux with X11.
|119142|You can't use multiple tags in a selector.
|119741|Relative directions in teleport are relative to player targets rather than executer.
|120056|Saving a structure to a sub folder fails if the folder does not exist yet.
|120296|{{key|F3+T}} doesn't reload the data in {{cd|pack.mcmeta}}.
|120524|Signs controled by command blocks with scoreboards will make other block entities in the same chunk disappear after respawning.
|120622|Item loss with shift + click to fill up with picked up items.
|120709|Lava and water updates do not resolve completely when random ticking is disabled.
|120747|Stairs Change Hitbox While Moving (Piston).
|120790|Redstone lamps and wire update whether they are lit or not when setblocked, but no other blocks do.
|120911|Can't {{control|place}} snow_layer in adventure mode.
|121196|Overloaded servers pointlessly wait up to 50 ms every couple ticks.
|121233|Tab-completing a function name (with a ton of available functions) kicks the player.
|121271|Activator rails not updating.
|121586|Watchdog thread kills the server if average tick time is larger than max-tick-time/(15*20) ms for too long.
|121719|Enchantment GUI's book opening and closing animation is rendered at approximatly 20fps, even if actual framerate is higher.
|121742|block states can't be used in {{cmd|give}}, {{cmd|clear}} and {{cmd|replaceitem}}, but can be used in {{cmd|setblock}}, {{cmd|fill}}, <code>/execute detect</code> and {{cmd|testforblock}}.
|121884|Server->Client custom payload packets can leak resources.
|121889|Animated Texture Interpolate causing crashes.
|121891|Animated texture ignoring frames acting non-iteratively.
|122000|Items get deleted when the inventory is overflowed by using the recipe book to return items from a crafting table.
|122053|Mouse wheel/touchpad scroll amount is ignored.
|122085|Generating server icon leaks encoded data buffer.
|122110|BufferBuilder not expanding under specific conditions.
|122195|Collision box of cauldron and ender portal frame with ender eye inside is slightly wrong.
|122257|Item name above hotbar appears every time the durability of the item gets changed.
|122740|In full-screen mode, the mouse cannot leave the window/screen on a multi-monitor setup
|123133|Unicode characters are improperly aligned on different screen resolutions.
|123365|+2 block Cactus do not break with water (Inconsistency).
|123524|X amount of Command Blocks in a chunk glitches the chunk, structure blocks, entities, hitboxes and frame rate dramatically.
|123708|{{cd|clearCustomName()|hasDisplayName()|d=and}} inconsistent.
|124469|GUI scale size 3 displays as size 2 when Unicode font is forced.
|124598|Team option {{cd|friendlyfire}} has incorrect capitalization.
|124695|Flint and steel in a dispenser loses durability when not igniting.
|124815|Mobs equipping items from dispensers can despawn.
|124964|Clicking into the armor slots or the first inventory slot cancels crafting recipe preview.
|124991|Flint and steel in a dispenser does not lose durability when used to ignite TNT.
|125615|Some end cities don't generate completely.
|126084|Cape render when {{control|sprinting}} underwater.
|126479|Tellraw command only applies team color if using selector to target more than one entity.
|127334|Superflat biome ID still uses numeral ID, rather than named ID.
|127822|Unicode on/off bug with another languages and english letters.
|128561|{{cd|CommandBase.commandListener}} retains old server reference, preventing garbage collection.
|129571|Skeleton traps are incredibly rare.
|129863|"Crawling" underneath glass/grass paths/other transparent blocks causes bugs.
|129980|Some users cannot use F3-related features properly.
|132579|Inconsistent font.
|132833|Opening 1.5.2 world on 1.12.2 works perfectly but bed is transparent.
|;previous
|133797|Optimizing a world doesn't update the version and the last accessed date displayed in the world list.
|133863|"Optimize World" screen has "world" with lowercase "w".
|;Private issues
|21073|Private issue.
|59509|Private issue.
|94675|Private issue involving huge mushrooms.
|100579|Pistons do not account for block updates triggered by blocks broken by the extending piston when placing moved blocks, resulting in duplication issues<ref>{{snap|17w49a|December 6, 2017}}</ref>
|111317|Private security issue.
|131152|Private security issue.
|131154|Resource locations allow empty path pieces.<ref>{{Mcnet|minecraft-113-pre-release|Minecraft 1.13 pre-release 3|June 4, 2018}}</ref>
}}

== Videos ==
Videos made by [[slicedlime]]:
{{CV|6uWV1zEPml0|What's New in Minecraft Java Edition 1.13 - The Update Aquatic?}}
{{CV|uO41sptfGt8|Advanced Commands Tutorial - Command News in Minecraft 1.13}}

== Trivia ==

* With a total of 10 pre-releases released, 1.13 has the most pre-releases of any update released so far.
* With a total of 42 snapshots released, 1.13 has the third most snapshots of any update released so far.
** Bested by [[Java Edition 1.9|1.9]], which has 56 snapshots, and [[Java Edition 1.8|1.8]], which has 52 snapshots.
* 1.13 had the longest timespan of development versions for a major update, with the first snapshot, [[17w43a]], being released on October 25, 2017, 266 days before the full release.
** The previous longest was [[Java Edition 1.8|1.8]], with 236 days from the first snapshot to the final release.
* This update was the second longest wait for a major update, with 406 days having elapsed since [[Java Edition 1.12|1.12]] was released on June 7, 2017.
** This is eclipsed by the wait between [[Java Edition 1.8|1.8]] and [[Java Edition 1.9|1.9]], having 545 days elapsed between them.

==Gallery==
<gallery>
Java Edition 1.13.png|Terrain in this version.
</gallery>

== References ==
{{reflist|2}}
{{Java Edition versions|1.1x}}

[[cs:Java Edice 1.13]]
[[de:1.13]]
[[es:Java Edition 1.13]]
[[fr:Version Java 1.13]]
[[hu:1.13]]
[[ja:Java Edition 1.13]]
[[ko:Java Edition 1.13]]
[[nl:1.13]]
[[pl:1.13]]
[[pt:Edição Java 1.13]]
[[ru:1.13 (Java Edition)]]
[[th:รุ่นจาวา 1.13]]
[[uk:1.13 (Java Edition)]]
[[zh:Java版1.13]]
