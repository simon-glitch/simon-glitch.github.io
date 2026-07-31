
# import builtins
line_chars = "\n\r\f"

from_code = (
    "\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f" +
    "\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f" +
    "\x20\x21\x22\x23\x24\x25\x26\x27\x28\x29\x2a\x2b\x2c\x2d\x2e\x2f" +
    "\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x3a\x3b\x3c\x3d\x3e\x3f" +
    "\x40\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4a\x4b\x4c\x4d\x4e\x4f" +
    "\x50\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5a\x5b\x5c\x5d\x5e\x5f" +
    "\x60\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6a\x6b\x6c\x6d\x6e\x6f" +
    "\x70\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7a\x7b\x7c\x7d\x7e\x7f" +
    "\x80\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8a\x8b\x8c\x8d\x8e\x8f" +
    "\x90\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9a\x9b\x9c\x9d\x9e\x9f" +
    "\xa0\xa1\xa2\xa3\xa4\xa5\xa6\xa7\xa8\xa9\xaa\xab\xac\xad\xae\xaf" +
    "\xb0\xb1\xb2\xb3\xb4\xb5\xb6\xb7\xb8\xb9\xba\xbb\xbc\xbd\xbe\xbf" +
    "\xc0\xc1\xc2\xc3\xc4\xc5\xc6\xc7\xc8\xc9\xca\xcb\xcc\xcd\xce\xcf" +
    "\xd0\xd1\xd2\xd3\xd4\xd5\xd6\xd7\xd8\xd9\xda\xdb\xdc\xdd\xde\xdf" +
    "\xe0\xe1\xe2\xe3\xe4\xe5\xe6\xe7\xe8\xe9\xea\xeb\xec\xed\xee\xef" +
    "\xf0\xf1\xf2\xf3\xf4\xf5\xf6\xf7\xf8\xf9\xfa\xfb\xfc\xfd\xfe\xff" +
    ""
)

import string
my_ascii = string.ascii_lowercase + string.ascii_uppercase + string.digits + string.punctuation

def mhex(n):
    s = hex(n)[2:]
    if(len(s) < 2): s = "0" + s
    return s

# byte values for the text "CustomColor"
CustomColor = [0x43, 0x75, 0x73, 0x74, 0x6f, 0x6d, 0x43, 0x6f, 0x6c, 0x6f, 0x72]

import fileinput
def stuff():
    for line in fileinput.input(mode="rb"):
        # line = [code for code in line]
        # s = ""
        # i = 0
        # j = 0
        # grab = 4
        # for code in line:
        #     if(i == len(CustomColor)):
        #         if(j == grab): break
        #         s += mhex(code)
        #         j += 1
        #     elif(code == CustomColor[i]):
        #         i += 1
        #     else: i = 0
        # if(s): print(s)
        
        s = "|"
        for code in line:
            char = from_code[code]
            if(char in line_chars): s += "\\n"
            elif(char in my_ascii): s += " " + char
            else: s += " ."
        s += "|\n|"
        for code in line:
            s += mhex(code)
        s += "|"
        print(s)


"""
py read.py bin1.mcstructure
py read.py bin2.mcstructure
"""

red = 0xaa443c
blue = 0x262eb0

def mix(a,b):
    return (
        ((a // 65536 % 256) + (b // 65536 % 256)) // 2 * 65536 +
        ((a // 256 % 256) + (b // 256 % 256)) // 2 * 256 +
        ((a % 256) + (b % 256)) // 2
    )

res = [
    0xaa443c, 0xa7433d, 0xa7433d, 0xa5433f, 0xa5433f, 0xa34241, 0xa34241, 0xa14243, 0xa14243, 0x9f4245, 0x9f4245, 0x9d4146, 0x9d4146, 0x9b4148, 0x9b4148, 0x99414a, 0x99414a, 0x97404c, 0x97404c, 0x95404e, 0x95404e, 0x93404f, 0x93404f, 0x913f51, 0x913f51, 0x8f3f53, 0x8f3f53, 0x8d3f55, 0x8d3f55, 0x8b3e57, 0x8b3e57, 0x893e59, 0x893e59, 0x863e5a, 0x863e5a, 0x843d5c, 0x843d5c, 0x823d5e, 0x823d5e, 0x803d60, 0x803d60, 0x7e3c62, 0x7e3c62, 0x7c3c63, 0x7c3c63, 0x7a3c65, 0x7a3c65, 0x783b67, 0x783b67, 0x763b69, 0x763b69, 0x743b6b, 0x743b6b, 0x723a6c, 0x723a6c, 0x703a6e, 0x703a6e, 0x6e3a70, 0x6e3a70, 0x6c3972, 0x6c3972, 0x6a3974, 0x6a3974, 0x683976, 0x683976, 0x653877, 0x653877, 0x633879, 0x633879, 0x61377b, 0x61377b, 0x5f377d, 0x5f377d, 0x5d377f, 0x5d377f, 0x5b3680, 0x5b3680, 0x593682, 0x593682, 0x573684, 0x573684, 0x553586, 0x553586, 0x533588, 0x533588, 0x513589, 0x513589, 0x4f348b, 0x4f348b, 0x4d348d, 0x4d348d, 0x4b348f, 0x4b348f, 0x493391, 0x493391, 0x473393, 0x473393, 0x443394, 0x443394, 0x423296, 0x423296, 0x403298, 0x403298, 0x3e329a, 0x3e329a, 0x3c319c, 0x3c319c, 0x3a319d, 0x3a319d, 0x38319f, 0x38319f, 0x3630a1, 0x3630a1, 0x3430a3, 0x3430a3, 0x3230a5, 0x3230a5, 0x302fa6, 0x302fa6, 0x2e2fa8, 0x2e2fa8, 0x2c2faa, 0x2c2faa, 0x2a2eac, 0x2a2eac, 0x282eae, 0x282eae, 0x262eb0
]

colors = [red, blue]
n = 7

def test():
    for i in range(2**n):
        si = i
        color = colors[i % 2]
        i //= 2
        for j in range(n-1):
            color = mix(color, colors[i % 2])
            i //= 2
        print(hex(color), hex(res[si]), color == res[si])

"""
Here are the colors:

683976ff 
653877ff 
653877ff 
633879ff 
633879ff 
61377bff 
61377bff 
5f377dff 
5f377dff 
5d377fff 
5d377fff 
5b3680ff 
5b3680ff 
593682ff 
593682ff 
573684ff 
573684ff 
553586ff 
553586ff 
533588ff 
533588ff 
513589ff 
513589ff 
4f348bff 
4f348bff 
4d348dff 
4d348dff 
4b348fff 
4b348fff 
493391ff 
493391ff 
473393ff 
473393ff 
443394ff 
443394ff 
423296ff 
423296ff 
403298ff 
403298ff 
3e329aff 
3e329aff 
3c319cff 
3c319cff 
3a319dff 
3a319dff 
38319fff 
38319fff 
3630a1ff 
3630a1ff 
3430a3ff 
3430a3ff 
3230a5ff 
3230a5ff 
302fa6ff 
302fa6ff 
2e2fa8ff 
2e2fa8ff 
2c2faaff 
2c2faaff 
2a2eacff 
2a2eacff 
282eaeff 
282eaeff 
262eb0ff 

aa443cff 
a7433dff 
a7433dff 
a5433fff 
a5433fff 
a34241ff 
a34241ff 
a14243ff 
a14243ff 
9f4245ff 
9f4245ff 
9d4146ff 
9d4146ff 
9b4148ff 
9b4148ff 
99414aff 
99414aff 
97404cff 
97404cff 
95404eff 
95404eff 
93404fff 
93404fff 
913f51ff 
913f51ff 
8f3f53ff 
8f3f53ff 
8d3f55ff 
8d3f55ff 
8b3e57ff 
8b3e57ff 
893e59ff 
893e59ff 
863e5aff 
863e5aff 
843d5cff 
843d5cff 
823d5eff 
823d5eff 
803d60ff 
803d60ff 
7e3c62ff 
7e3c62ff 
7c3c63ff 
7c3c63ff 
7a3c65ff 
7a3c65ff 
783b67ff 
783b67ff 
763b69ff 
763b69ff 
743b6bff 
743b6bff 
723a6cff 
723a6cff 
703a6eff 
703a6eff 
6e3a70ff 
6e3a70ff 
6c3972ff 
6c3972ff 
6a3974ff 
6a3974ff 
683976ff 

"""

"""
Okay, with that I've basically verified that bedrock uses the mix function above, which is this
c = mix(a, b):
    c.red   = floor((a.red   + b.red  )/2)
    c.green = floor((a.green + b.green)/2)
    c.blue  = floor((a.blue  + b.blue )/2)

"""


"""
mixes = {
    0xf0f0f0, 0xc3c6c6, 0xc6c683, 0x276abe, 0x2157d4, 0x1d80f9, 0x2dacfb, 0x1ea3bc, 0x197eab, 0x5c8e87, 0x7b9999, 0x63629a, 0x6a59c1, 0xe5d195, 0x6d67e0, 0x6385f6, 0x96e4f7, 0x6abacd, 0x4793a2, 0x2f7a8d, 0x3796c0, 0x3183d7, 0x2dacfb, 0x3dd8fe, 0xcd9a96, 0x2ecfbf, 0x29aaae, 0x6cba8a, 0x8bc59c, 0x738e9d, 0x7a85c3, 0x7d93e2, 0x73b1f8, 0x87dbb8, 0x5bb28e, 0xd491bc, 0x388b63, 0x20724e, 0x288d81, 0x227a98, 0x1ea3bc, 0x2ecfbf, 0x1fc780, 0x1aa16f, 0x5db14b, 0x7cbd5d, 0xd69fdb, 0x64855e, 0x6b7c84, 0x6e8aa3, 0x64a9b9, 0x83b6a7, 0x568c7d, 0x346552, 0x1b4c3d, 0x246870, 0x1e5587, 0xcdbdf1, 0x197eab, 0x29aaae, 0x1aa16f, 0x167c5e, 0x598c3a, 0x78974c, 0x60604d, 0x675773, 0x696592, 0x6083a8, 0xc3c6c6, 0xc6c683, 0x999c59, 0x77752e, 0x5e5c19, 0x67784c, 0x616563, 0x5c8e87, 0x6cba8a, 0x5db14b, 0x598c3a, 0x979d9d, 0x9c9c16, 0xbba728, 0xa37029, 0xaa674f, 0xac756e, 0xa39384, 0xe5d195, 0xb8a86b, 0x968140, 0x7d682b, 0x747672, 0x86835e, 0x807075, 0x7b9999, 0x8bc59c, 0x7cbd5d, 0x78974c, 0xbba728, 0xdab33a, 0xc27b3b, 0xc97261, 0x5c5d5d, 0xcb8080, 0xc29f96, 0xcd9a96, 0xa0706c, 0x7e4941, 0x65302c, 0x6e4c5f, 0x683976, 0x63629a, 0x738e9d, 0xa19f9b, 0x647890, 0x64855e, 0x60604d, 0xa37029, 0xc27b3b, 0xaa443c, 0xb13b62, 0xb34981, 0xaa6797, 0xd491bc, 0xa76793, 0x5e65a6, 0x854068, 0x6c2753, 0x754386, 0x6f309c, 0x6a59c1, 0x7a85c3, 0x6b7c84, 0x675773, 0xaa674f, 0xc97261, 0x5a8ecb, 0xb13b62, 0xb83289, 0xba40a8, 0xb15ebe, 0xd69fdb, 0xaa75b2, 0x874e87, 0x6f3572, 0x7751a5, 0x713ebb, 0x6abacd, 0x6d67e0, 0x7d93e2, 0x6e8aa3, 0x696592, 0xac756e, 0xcb8080, 0xb34981, 0xba40a8, 0xbd4ec7, 0xb36cdd, 0x5bb28e, 0xcdbdf1, 0xa094c8, 0x7e6d9d, 0x655488, 0x6e6fbb, 0x685cd1, 0x6385f6, 0x73b1f8, 0x64a9b9, 0x6083a8, 0x568c7d, 0xa39384, 0xc29f96, 0xaa6797, 0xb15ebe, 0xb36cdd, 0xaa8bf3, 0x999c59, 0xb8a86b, 0xa0706c, 0xa76793, 0x888686, 0xaa75b2, 0xa094c8, 0xa19f9b, 0x747672, 0x524f47, 0x393632, 0x425165, 0x3c3e7b, 0x3767a0, 0x4793a2, 0x91a2b9, 0x388b63, 0x346552, 0x77752e, 0x968140, 0x7e4941, 0x854068, 0x874e87, 0x7e6d9d, 0x888686, 0x5c5d5d, 0x8b8fd0, 0x393632, 0x211d1d, 0x293850, 0x232566, 0x1f4e8b, 0x2f7a8d, 0x20724e, 0x1b4c3d, 0x5e5c19, 0x7d682b, 0x86b8f4, 0x65302c, 0x6c2753, 0x6f3572, 0x655488, 0x91a2b9, 0x647890, 0x425165, 0x293850, 0x325483, 0x2c4199, 0x96e4f7, 0x276abe, 0x3796c0, 0x288d81, 0x246870, 0x67784c, 0x86835e, 0x6e4c5f, 0x754386, 0x7751a5, 0x6e6fbb, 0x87dbb8, 0x8b8fd0, 0x5e65a6, 0x3c3e7b, 0x232566, 0x2c4199, 0x262eb0, 0x2157d4, 0x3183d7, 0x227a98, 0x1e5587, 0x83b6a7, 0x616563, 0x807075, 0x683976, 0x6f309c, 0x713ebb, 0x685cd1, 0x86b8f4, 0x5a8ecb, 0x3767a0, 0x1f4e8b,
}

dyes = [
    0xf0f0f0, # white ;
    0x979d9d, # light gray ;
    0x325483, # gray ;
    0x211d1d, # black ;
    0x524f47, # brown ;
    0xaa443c, # red ;
    0xdab33a, # orange ;
    0x9c9c16, # yellow ;
    0x1fc780, # lime ;
    0x167c5e, # green ;
    0x1d80f9, # cyan ;
    0x3dd8fe, # light blue ;
    0x262eb0, # blue ;
    0xaa8bf3, # lime ;
    0xbd4ec7, # yellow ;
    0xb83289, # orange ;
]

test_mixes = set(mix(a,b) for a,b in zip(sum(([a]*len(dyes) for a in dyes), []), dyes*len(dyes)))

print(mixes == test_mixes)

base = [
    0xf0f0f0,
    0x979d9d,
    0x9c9c16,
    0xdab33a,
    0xaa443c,
    0xb83289,
    0xbd4ec7,
    0xaa8bf3,
    0x524f47,
    0x211d1d,
    0x325483,
    0x262eb0,
    0x1d80f9,
    0x3dd8fe,
    0x1fc780,
    0x167c5e,
]
grid = [
    0xf0f0f0,
    0xc3c6c6,
    0xc6c683,
    0x276abe,
    0x2157d4,
    0x1d80f9,
    0x2dacfb,
    0x1ea3bc,
    0x197eab,
    0x5c8e87,
    0x7b9999,
    0x63629a,
    0x6a59c1,
    0xe5d195,
    0x6d67e0,
    0x6385f6,
    0x96e4f7,
    0x6abacd,
    0x4793a2,
    0x2f7a8d,
    0x3796c0,
    0x3183d7,
    0x2dacfb,
    0x3dd8fe,
    0xcd9a96,
    0x2ecfbf,
    0x29aaae,
    0x6cba8a,
    0x8bc59c,
    0x738e9d,
    0x7a85c3,
    0x7d93e2,
    0x73b1f8,
    0x87dbb8,
    0x5bb28e,
    0xd491bc,
    0x388b63,
    0x20724e,
    0x288d81,
    0x227a98,
    0x1ea3bc,
    0x2ecfbf,
    0x1fc780,
    0x1aa16f,
    0x5db14b,
    0x7cbd5d,
    0xd69fdb,
    0x64855e,
    0x6b7c84,
    0x6e8aa3,
    0x64a9b9,
    0x83b6a7,
    0x568c7d,
    0x346552,
    0x1b4c3d,
    0x246870,
    0x1e5587,
    0xcdbdf1,
    0x197eab,
    0x29aaae,
    0x1aa16f,
    0x167c5e,
    0x598c3a,
    0x78974c,
    0x60604d,
    0x675773,
    0x696592,
    0x6083a8,
    0xc3c6c6,
    0xc6c683,
    0x999c59,
    0x77752e,
    0x5e5c19,
    0x67784c,
    0x616563,
    0x5c8e87,
    0x6cba8a,
    0x5db14b,
    0x598c3a,
    0x979d9d,
    0x9c9c16,
    0xbba728,
    0xa37029,
    0xaa674f,
    0xac756e,
    0xa39384,
    0xe5d195,
    0xb8a86b,
    0x968140,
    0x7d682b,
    0x747672,
    0x86835e,
    0x807075,
    0x7b9999,
    0x8bc59c,
    0x7cbd5d,
    0x78974c,
    0xbba728,
    0xdab33a,
    0xc27b3b,
    0xc97261,
    0x5c5d5d,
    0xcb8080,
    0xc29f96,
    0xcd9a96,
    0xa0706c,
    0x7e4941,
    0x65302c,
    0x6e4c5f,
    0x683976,
    0x63629a,
    0x738e9d,
    0xa19f9b,
    0x647890,
    0x64855e,
    0x60604d,
    0xa37029,
    0xc27b3b,
    0xaa443c,
    0xb13b62,
    0xb34981,
    0xaa6797,
    0xd491bc,
    0xa76793,
    0x5e65a6,
    0x854068,
    0x6c2753,
    0x754386,
    0x6f309c,
    0x6a59c1,
    0x7a85c3,
    0x6b7c84,
    0x675773,
    0xaa674f,
    0xc97261,
    0x5a8ecb,
    0xb13b62,
    0xb83289,
    0xba40a8,
    0xb15ebe,
    0xd69fdb,
    0xaa75b2,
    0x874e87,
    0x6f3572,
    0x7751a5,
    0x713ebb,
    0x6abacd,
    0x6d67e0,
    0x7d93e2,
    0x6e8aa3,
    0x696592,
    0xac756e,
    0xcb8080,
    0xb34981,
    0xba40a8,
    0xbd4ec7,
    0xb36cdd,
    0x5bb28e,
    0xcdbdf1,
    0xa094c8,
    0x7e6d9d,
    0x655488,
    0x6e6fbb,
    0x685cd1,
    0x6385f6,
    0x73b1f8,
    0x64a9b9,
    0x6083a8,
    0x568c7d,
    0xa39384,
    0xc29f96,
    0xaa6797,
    0xb15ebe,
    0xb36cdd,
    0xaa8bf3,
    0x999c59,
    0xb8a86b,
    0xa0706c,
    0xa76793,
    0x888686,
    0xaa75b2,
    0xa094c8,
    0xa19f9b,
    0x747672,
    0x524f47,
    0x393632,
    0x425165,
    0x3c3e7b,
    0x3767a0,
    0x4793a2,
    0x91a2b9,
    0x388b63,
    0x346552,
    0x77752e,
    0x968140,
    0x7e4941,
    0x854068,
    0x874e87,
    0x7e6d9d,
    0x888686,
    0x5c5d5d,
    0x8b8fd0,
    0x393632,
    0x211d1d,
    0x293850,
    0x232566,
    0x1f4e8b,
    0x2f7a8d,
    0x20724e,
    0x1b4c3d,
    0x5e5c19,
    0x7d682b,
    0x86b8f4,
    0x65302c,
    0x6c2753,
    0x6f3572,
    0x655488,
    0x91a2b9,
    0x647890,
    0x425165,
    0x293850,
    0x325483,
    0x2c4199,
    0x96e4f7,
    0x276abe,
    0x3796c0,
    0x288d81,
    0x246870,
    0x67784c,
    0x86835e,
    0x6e4c5f,
    0x754386,
    0x7751a5,
    0x6e6fbb,
    0x87dbb8,
    0x8b8fd0,
    0x5e65a6,
    0x3c3e7b,
    0x232566,
    0x2c4199,
    0x262eb0,
    0x2157d4,
    0x3183d7,
    0x227a98,
    0x1e5587,
    0x83b6a7,
    0x616563,
    0x807075,
    0x683976,
    0x6f309c,
    0x713ebb,
    0x685cd1,
    0x86b8f4,
    0x5a8ecb,
    0x3767a0,
    0x1f4e8b,
]

mixed = {}
for a in base:
    for b in base:
        mixed[mix(a,b)] = [a,b]

n_grid = []
for g in grid:
    if(g in mixed):
        n_grid += [[g, "Y"]]
    else:
        n_grid += [[g, "n"]]

grid = n_grid
print(grid)
"""


"""
#F0F0F0
#F9801D
#C74EBD
#3AB3DA
#FED83D
#80C71F
#F38BAA
#474F52
#9D9D97
#169C9C
#8932B8
#3C44AA
#835432
#5E7C16
#B02E26
#1D1D21
"""


def stuff_a(file_n, expected):
    s = []
    for line in fileinput.input(file_n, mode="rb"):
        line = [code for code in line]
        i = 0
        j = 0
        si = 0
        grab = 4
        grabbed = False
        for code in line:
            if(i == len(CustomColor)):
                if(j == grab):
                    grabbed = True
                    break
                si = 256 * si + code
                j += 1
            elif(code == CustomColor[i]):
                i += 1
            else: i = 0
        if(grabbed):
            s.append(si)
    print([hex(color) for color in s])
    s = [(
        (((color & 0xff000000) >> 24) <<  0) |
        (((color & 0x00ff0000) >> 16) <<  8) |
        (((color & 0x0000ff00) >>  8) << 16)
    ) for color in s]
    s = set([hex(color) for color in s])
    expected = set([hex(color) for color in expected])
    print(file_n + ":")
    if(s == expected):
        print("success")
    else:
        print("shared: ", s & expected)
        print("in-game only: ", s - expected)
        print("be.cpp only: ", expected - s)

def stuff_b():
    stuff_a("set1.mcstructure", [
        0x9f6e30,
        0xd95e40,
        0xa89160,
        0x764690,
        0xce8721,
        0x289081,
        0x9e39a1,
        0x31a1b1,
        0xa9aad1,
        0xbe5552,
        0xb55c62,
        0x569843,
    ])
    stuff_a("set2.mcstructure", [
        0xc6c6c3,
        0x7b3e3c,
        0xcdba6a,
        0x503829,
        0x987a22,
    ])
    stuff_a("set3.mcstructure", [
        0x9b4a24,
        0x85bf44,
        0x5e8154,
        0x663064,
        0x8d9d94,
        0xcbb7d4,
        0xf49f35,
        0x493836,
        0x749256,
    ])
    stuff_a("set4.mcstructure", [
        0xa7b723,
        0xbeddb9,
    ])

# stuff_b()
stuff()
# test()

