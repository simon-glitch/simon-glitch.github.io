
# Add a smithing mechanic
New blocks:
* Toolsmith Benches
* Armorer Benches
* Forges
* Anvils

Tools and armor can now be modified with upgrades and trims.

## Toolsmith Bench
A toolsmith bench can be used to apply an upgrade to a tool, by combining the upgrade with the tool.

Toolsmith benches come in 5 tiers: copper, iron, gold, platinum, and inferium.

The UI has 5 slots for upgrades and 1-5 slots for tools. Higher tiers have more tool slots. The UI also has an upgrade button, which applies all of the upgrades in the upgrade slots to each of the tools. This means higher tier toolsmith benches are more cost efficient.

## Armorer Bench
An armorer bench is just like a toolsmith bench, except it applies upgrades to armor, instead of tools.

## Upgrades
Upgrades can be made in the forge. An "upgrade" is an item, just like a tool is. When an upgrade is applied to a tool, it becomes a modifer

Trims can also be found as common dungeon loot.

Some upgrades have a higher rarity. High rarity upgrades are rarer to find in dungeons, and require a higher tier of forge. The upgrade rarities could be (for example):
* Common
* Rare
* Brilliant
* Epic
* Legendary
* Mythical

### Trims
A trim is a modification that changes the aesthetic of a piece of equipment, by adding an extra layer of the given material to the equipment. Unlike upgrades, trims are purely aesthetic and do not change the equipments stats.

Trims are applied in the same way upgrades are, but can not be forged from materials. However, any trim can easily be duplicated (using the forge), once it has been obtained.

Trims can also be found as common dungeon loot.

You can put a trimmed piece of equipment in the forge and combine it with a trim template to make the trim that is on the piece of equipment. This is called trim molding. Trim molding gives a specific trim fragment for that specific type of equipment. Unfortunately, **molding also destroys the piece of equipment.** You can combine 3 trim fragments with the same trim but different equipment

All trims can be applied to both armor and tools, because why not?

#### Trim materials
A trim can be composed of any of the common materials:
* Any stone, including cobbled variants, sandstone, and red sandstone
* Any ore mineral, including coal, amethyst, and realm crystals
* Glass
* Any wooden planks, even dyed ones

Each trim may only have 1 material, and there is no limit to how many trims can be applied to an armor piece.

## Forge
As disucssed, the forge can do a few things. Therefore the UI of the forge has 3 different tabs:
* Forge tab: Forge upgrades
* Mold tab: Mold trims from trimmed equipment
* Combine tab: Forge trims from trim fragment
* Weld tab: Apply a random trim to a piece of equipment
    * See **Welding** below

The forge also has 5 different tiers (the same ones the toolsmith bench has). Higher tier forges can craft higher rarity upgrades.

### Welding
The welding tab has 2 slots. The 1st slot is for the piece of equipment, and the 2nd slot is for the mineral.

Welding allows the player to apply a random trim of the given material to the given piece of equipment.

## Anvil
The anvil is a very useful item. It has 3 tabs:
* Combine tab: Comine equipment of the same type together
* Repair tab: Repair a piece of equipment
* Pop tab: Remove an upgrade or trim from a piece of equipment

The anvil also has 5 tiers (the same ones the toolsmith bench has). Higher tier anvils are required to combine, repair, remove upgrades from stronger pieces of equipment.

### Combine tab
2 pieces of equipment of the same type and material can be combined into 1 in this tab.

It's simple. There are 2 slots for the equipment to combine, and 1 slot for the combined piece of equipment. Where have I seen this before?

### Repair tab
This tab has 10 slots to put in repair materials. Then the player can click or tap any piece of equipment in their inventory to repair it. First, the player selects the equipment they want repaired, by clicking or tapping it, and then the the player clicks or taps the repair button. Between the equipment being selected and the repair button being pressed, the UI tells the player the cost of repairing the equipment.

Along with the cost or repairing the equipment, the UI also shows its current durability, total durability, the amount of durability the equipment will gain from being repaired, and the new durability it will have after being repaired. Example:
* DUR: 423 + 705 = 1128 / 1200

The cost to repair a piece of equipment is simply 1 piece of the material the equipment was made from.

A piece of equipment can (optionally) be repaired multiple times, until is gets to full durability.

The amount of durability a piece of equipment gains from each repair is less when there are more upgrades on it or when the upgrades on it are more powerful. Trims do not change how much durability a piece of equipment gains.

### Pop tab
Trims can be removed for free, but removing an upgrade requires 1 unit of the material that the tool is made from.

Any number of trims or upgrades can be removed. This means a player can revert a tool back to its original state.

