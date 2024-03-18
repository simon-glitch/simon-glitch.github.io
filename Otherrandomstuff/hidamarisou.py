import re
import os

# When your Hiadmarisou translations addiction is so bad that you have to sort out your file names so you can find them easily:
novels: list[tuple[str]] = [
    ("By the way, I’m now living in the mountains", "Mountains"),
    ("Walking in another world", "Walking"),
    ("What if an artificial intelligence reincarnated in an underperformer’s body in another world\\?.+", "Qualia"),
    ("I was reincarnated on an island where the strongest species live, so I will enjoy a peaceful life on this island", "Strong Island"),
    ("Level Gacha ~ It turns out the dump stat 『Luck』 is the most important", "Lvl Gacha"),
    ("About the case (of destruction flags being demolished after a nichiasa loving otaku was reincarnated as a villainous student)?", "Nichiasa"),
    ("The frontier alchemist ~ I can’t go back to that job after you made my budget zero", "F Alchemist"),
    ("I picked up an unsold slave elf and made her my daughter", "Elf Daughter"),
    ("My Twin Sister Was Taken as a Miko and I Was Thrown Away but I’m Probably the Miko", "Futago No Ane"),
]
dirname: str = "../../Downloads/Download"
dirrname: str = "C:/Users/simon/Downloads/Download/"
dir_name: str = dirname + "/"
files = os.listdir(dirname)
# print(files)
# input("okay")

patterns = [re.compile(novel[0] + " *– *([^\\.]{0,20})([^\\.]*(?: *– *Hidamarisou translations)?)(?:(\\..+)?)") for novel in novels]

for filename in files:
    broken = False
    # print(filename)
    for (novel, pattern) in zip(novels, patterns):
        if(broken): continue
        
        # print("  " + novel[1])
        
        if(pattern.search(filename)):
            try:
                # print(open(dir_name + filename, "r"))
                print("    renaming: " + filename)
                re.sub("[^A-Za-z0-9_]", "_", ...)
                file = os.rename(dirrname + filename, dir_name + pattern.sub(novel[1] + " – " + r'\1\3', filename))
                print("      success: " + filename)
            except:
                pass
            broken = True
        else:
            pass
            # print(    re.compile("What").search(filename))



