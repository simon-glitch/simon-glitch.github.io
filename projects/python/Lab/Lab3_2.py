"""CS 108 - Lab 3.2

Describe the module here. Fix the lab number above and the name/date below.
Delete the second @author line if working solo.

@author: Simon Willover (saw52)
@author: Kenna Defersha (kdd27)
@date: Fall, 2023
"""

database_un = {
    'ab': 10,
    'ca': 8,
    'bv': 1,
    'dl': 7,
    'gp': 2,
    'he': 4
    }

ln = input("Your last name >> ")
fn = input("Your first name >> ")
username = (fn[0] + ln[0]).lower()

try:
    database_un[username] += 1
    username += str(database_un[username])
except:
    database_un[username] = 0


print("Your username is", username)
print("The new database is:")
for uname in database_un:
    print(uname, database_un[uname])
