
# Self driving cars are hard to make
(for "Oral Rhetoric" course at Calvin University)

*The title is also the thesis.*

## General outline
This is the general outlne for the longest and most complex possible form this article could have. Adding more details or section than this quite outline describes would be unnecessary at best, and annoying at worst.

### Hardware
* cost of high quality sensors
* copyright laws lower quality
* repair cost
* faulty hardware
* trade-offs of cheap hardware
* lithium

### Software
* copyrights on software and software usage
* hacking
* malware
* bugs and redundancy
* forced arrest
* user override

### Responsibility
* drivers without licenses
* pedestrians who are trolls
* skill issues
* EMP dangers
* hardware specs *(might be a duplicate / not necessary)*
* intentional outdating (older vehicles)
* tracking pedestrians by their phone *(for their safety)*
* tracking self-driving cars
* scams
    * i.e. people who intentionally incur the probems discussed throughout this article

### AI safety
* ML is not fully understood
* when are the ML model's errors okay?
* computational costs
* evolution and updates


## Article content

**This article is in its longest form. The speech trascript will probably be slimmed down quite a bit and have many of the clarifying words, such as "some", removed for simplicity.**

Also, I know that there might be too many headers in this article. My note cards for my presentation will probably 

### Intro
Do you ever get in the car and feel too tired to drive? Probably not very often, but you there are times when don't like having to pay attention to the road. Wouldn't it be nice if you could just, take your eyes off the road for a moment? A self-driving car (which goes my names: fully autonomous vehicle, driverless vehicle, and Pedestrian Slayer ^TM) can drive itself, but that's not an easy feat. The car needs training, and resources, just like you do. We also have to consider various complications with the hardware, the software, and user experience **[note a]** of the car.

### Hardware
#### Costs
The car needs eyes, just like you. Sensory equipment on self-driving cars can be obscured by the wheather, but the best equipment is much better than the human eye in all wheather. However, the best high-quality equipment is expensive, and consumers don't have unlimited money. Well, according to [Wired] [oref 1], the equipment has gone from costing thousands of dollars to just hundreds. Also, the costs vary. Ultrasonic equipment can cost as little as $15, while a high quality GPS costs $6000. Once the industry has agreed on some standards though, the price of these items will probably come down and be settled.

### Software
#### Hacking
The car can be distracted and even deceived too. Self-driving cars can use the internet to learn about their environment, instead of simply relying on digital sensors, but connecting to the internet brings security concerns. The car could be hacked or even just "DoS" attacked. There is also the risk of the user trying to tamper with the software on their vehicle.

#### Malware
For example, an impatient driver might want to install a software mod that makes the car ignore speed-limits, pass other drivers on dangerous roads, cut off other drivers, and cut corners through parking lots. This same software mod could also be malware that makes the car do things the driver did not want, like intentionally hit pedestrians.

#### Bugs and redunancy
Don't forget, software can also have bugs, and I'm not referring to cockroaches **[note b]**. **[def: bug]**. The hardware can also cause errors, but these are very rare **[note c]**. Many computers get around this by using levels of redunancy. For example, if you try to open your email, there is a program that checks to make sure everything works correctly before you even see any emails. This means we need to be able to define exactly how our software should function. This is difficult and requires dedication (see: [Munish_Gupta] [oref 2]).

#### Forced arrest
In theory, a self-driving car can be remotely controlled by the police for safety purposes [src 1: pg 2]. It would of coure be in the interest of governments to have all self-driving cars have this capability, even though it would bring some software vulnerabilities **[note d]** [src 1: pg 21, C. Malicious or Lawful Seizures?].

#### User override
The police preventing a driver from doing harmful things is one subject, and a passenger preventing an artificial driver from doing harmful things is the opposite. [note h] In fact, these 2 systems could contradict each other in the car's software, but good programming might prevent this from being an issue.

### Responsibility
#### Driverless passengers
Typically, a passenger is always accompanied by a human driver. However, a self-driving car can have human passengers without a human driver. The extreme example of this would be a car with multiple passengers who legally can't drive. If the passenger can't drive, then there is nothing they can do if the computer fails to operate the vehicle on its own. This could potentially leave a passenger stranded, and force them to try to illegally drive the car themself. This means that self-driving cars need to be able to reliably function while also considering the desires of their passengers. For example, a passenger should be allowed to tell the car which parking space to use, but should not be able to tell the car to drive over the speed limit. **[note e]** There are also examples where it's not so clear whether the passenger should be allowed to make a decision. For example: which lane to use on a relatively calm highway, or whether to go through a traffic light that is about to turn yellow.

#### Skill issues
**[note g]**
Driving skills are really important to human drivers in modern society, and they are equally important to artificial drivers. A self-driving car needs to be really skilled, and it needs to know how skilled it is. If the car's software is too confident, it might try an overly risky turn or manuever for the sake of saving time, and accidentally break something or injure someone. If the software isn't confident enough, it might tense up and fail to get passengers out of a dangerous situation. So, the software needs to be able to evaluate both the risks of the current situation and the risks of its potential solutions failing. This becomes even more complicated when you allow for a human driver override. The car might think that it's decision is optimal and the situation is too risky to let a human driver take control. A company might get sued if their software allows a human driver override and the prosecutor argues that the software actually would have made a better decision if allowed to handle the situation on its own.

In conclusion, the software having the right level of confidence is super important. The software needs to know when the driver has "skill issues", and also when the software might have "skill issues" that the driver does not have.

#### Income and traffic safety
Low- and middle-income level contries will have a harder time accessing and using self-driving vehicles, which means they won't benefit as much from the safety and convenience of self-driving vehicles. However, the CDC has already found that even though "only 60% of the world's vehicles are in low- and middle-income countries, 93% of [fatal incidents] occur in these countries" [src 3]. **[note f]** This means that these financially disadvantaged countries experience 55% more deaths per car than the average country does. If self-driving cars are not properly distributes to these countries, that percentage could be higher. That would mean the financially disadvantaged would be even more disadvantaged, in comparison to the norm, even though they wouldn't be worse off absolutely speaking.

# Definitions
## Bug
In software *(the field)*, a bug is a problem or flaw in the software that causes it to function incorrectly.

# Overall meta comment
I don't like any of the paragraphs would benefit from being longer. I would have to go into niche things, and dicuss boring details from academic sources in order to expand on any of the content at all.

# Notes
**[a]:** This refers to the "experience" of responsibilty (or the lack of it) that users have when using a self-driving vehicle.
**[b]:** This seems off topic.
**[c]:** Why are we mentioning it if it is so rare?
**[d]:** The vulnerability would be that back door access could extend this capability beyond the police and allow bad actors to remotely control the car.
**[e]:** The rest of the paragraph might be excessive / overly verbose.
**[f]:** This might be distracting, since it changes from the topic of the thesis to the topic of some people being unfairly disadvantaged.
**[g]:** The "Skill issues" section is kinda auxiliary, but it's still an interesting point and fits in very well (at least, in a longer speech).
**[h]:** Not much can be said on a topic that is so abstract and related to details with the software implementation. Talking about this is like talking about the *Trolley Problem*, but worse, because **the subject** is software details and not ethics.

# This file
This article is hosted on GitHub:
* https://github.com/simon-glitch/simon-glitch.github.io/tree/master/My_Way_of_Life/random_stuff/self_driving_cars.md

Unfortunately, GitHub won't put the "Preview" in full screen for you.

# Other references
* 1:
    * name: Wired
    * ~"ultrasonic sensors are cheap, ranging from as little as $15 to $200"
    * ~"GPS ... its cost needs to come down significantly from the current $6,000 figure"
    * https://www.wired.com/2015/04/cost-of-sensors-autonomous-cars/
* 2:
    * name: Munish Gupta
    * site: Linked in
    * To be honest
    * https://www.linkedin.com/pulse/error-handling-large-scale-applications-munish-gupta-euutc/

# Sources
* 1:
    * name: ELIZABETH E. JOH*
    * https://www.nyulawreview.org/wp-content/uploads/2019/10/NYULawReview-94-Joh.pdf
* 2:
    * name: ???
    * https://link.springer.com/article/10.1007/s13347-022-00551-1
* 3:
    * name: CDC
    * text: Annually, ≈1.35 million people are killed (≈3,740 people every day) and an additional 20–50 million are injured in motor vehicle crashes. Road traffic injuries have become the leading cause of death for children and young adults aged 5–29 years. Although only 60% of the world’s vehicles are in low- and middle-income countries, 93% of the world’s crash deaths occur in these countries. More than half of people who die on the world’s roads each year are cyclists, motorcyclists, and pedestrians, also called vulnerable road users.
    * https://wwwnc.cdc.gov/travel/yellowbook/2024/air-land-sea/road-and-traffic-safety

