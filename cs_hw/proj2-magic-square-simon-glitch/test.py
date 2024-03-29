import subprocess

result = subprocess.check_output("./proj2 5", shell=True).decode()
assert (result ==
'''  17  24   1   8  15
  23   5   7  14  16
   4   6  13  20  22
  10  12  19  21   3
  11  18  25   2   9
''')

result = subprocess.check_output("./proj2 15", shell=True).decode()
assert (result ==
''' 122 139 156 173 190 207 224   1  18  35  52  69  86 103 120
 138 155 172 189 206 223  15  17  34  51  68  85 102 119 121
 154 171 188 205 222  14  16  33  50  67  84 101 118 135 137
 170 187 204 221  13  30  32  49  66  83 100 117 134 136 153
 186 203 220  12  29  31  48  65  82  99 116 133 150 152 169
 202 219  11  28  45  47  64  81  98 115 132 149 151 168 185
 218  10  27  44  46  63  80  97 114 131 148 165 167 184 201
   9  26  43  60  62  79  96 113 130 147 164 166 183 200 217
  25  42  59  61  78  95 112 129 146 163 180 182 199 216   8
  41  58  75  77  94 111 128 145 162 179 181 198 215   7  24
  57  74  76  93 110 127 144 161 178 195 197 214   6  23  40
  73  90  92 109 126 143 160 177 194 196 213   5  22  39  56
  89  91 108 125 142 159 176 193 210 212   4  21  38  55  72
 105 107 124 141 158 175 192 209 211   3  20  37  54  71  88
 106 123 140 157 174 191 208 225   2  19  36  53  70  87 104
''')

try:
  subprocess.check_output("./proj2 10", shell=True).decode()
  assert False, "Code did not check for odd numbers between 1 and 15"
except:
  pass
try:
  result = subprocess.check_output("./proj2 0", shell=True).decode()
  assert (result == 'The size must be odd and between 1 and 15.')
except:
  pass
try:
  result = subprocess.check_output("./proj2 16", shell=True).decode()
  assert (result == 'The size must be odd and between 1 and 15.')
except:
  pass
try:
  result = subprocess.check_output("./proj2 17", shell=True).decode()
  assert (result == 'The size must be odd and between 1 and 15.')
except:
  pass

print("All tests passed!")