It is 4:50 AM, the night after July 30, and for some reason I can't sleep, so I'll go ahead and write down what I've been thinking.

So a few hours ago, on July 30, I came up with a great idea for how to optimize the JE color search. It's simple. I will take each mixer, and then check it with all possible colors, but rather than actually iterating over all of them, I will use math to prove which colors the mixer can possibly reach. For the purpose of this, I can create an upper bound (to account for rounding). I can then prioritize the better mixers, and remove any mixer if I'm certain none of its colors are reachable. Also, once I have done the search once, I can save a list of bad mixers that never need to be used. Though, I'm not sure if there are any such mixers, or how many mixers even are bad. But the colors reachable by a mixer are effectively the identity of that mixer. So analyzing those is the best way to optimize the code.

I wonder why I can't sleep. Is it just my code? I literally layed down after completing everything I had set out to do today.

Anyways, first let's update the cpp code to match the wiki.

Now let's analyze how the mix function works.
* If we mix #ff0000, #00ff00, and #0000ff, the max avg is 255/3 = 85, and the avg max is 255. So the also mul is 3. This means the output color is white instead of grey. Now what if we increase the red channel of the third color by x? Now the red avg is the biggest one, being 85 + x/3, and the average maximum stays the same. The ratio then becomes 255/(85 + x/3), since the avg max is unaffected. If we look at the red channel, it's final value is then (85 + x/3)*255/(85 + x/3). Or still 255. While the other channels are slowly gradded down by that 255/(85 + x/3) factor. Once the colors become #ff0000, #00ff00, and #ff00ff, x/3=85, so the G and B channels are only being multiplied by 1.5, rather than 3.
    * #ff0000, #00ff00, and #0000ff -> #ffffff
    * #ff0000, #00ff00, and #ff00ff -> #ff7f7f
* That means that adding red basically shifted the color that weird cream red color. Now we can use math figure out more. Let's look at the eight corners of the cube:
    * #ff0000, #00ff00, and #000000 -> #aaaa00; avg_max = 170; max_avg =  85; avg = #555500;
    * #ff0000, #00ff00, and #ff0000 -> #ff7f00; avg_max = 255; max_avg = 170; avg = #aa5500;
    * #ff0000, #00ff00, and #00ff00 -> #7fff00; avg_max = 255; max_avg = 170; avg = #55aa00;
    * #ff0000, #00ff00, and #ffff00 -> #ffff00; avg_max = 255; max_avg = 170; avg = #aaaa00;
    * #ff0000, #00ff00, and #0000ff -> #ffffff; avg_max = 255; max_avg =  85; avg = #555555;
    * #ff0000, #00ff00, and #ff00ff -> #ff7f7f; avg_max = 255; max_avg = 170; avg = #aa5555;
    * #ff0000, #00ff00, and #00ffff -> #7fff7f; avg_max = 255; max_avg = 170; avg = #55aa55;
    * #ff0000, #00ff00, and #ffffff -> #ffff7f; avg_max = 255; max_avg = 170; avg = #aaaa55;

5:45 AM and it sounds like my mom is having a hard time sleeping two. Maybe it's that breakfast taco mix stuff. The sauce really tasted like vinegar and it was really disgusting. Maybe it's messing with our guts. But in a way that doesn't hurt. Like just keeping us on high alert.

Now the real question is does the cube we created have any curvature? Or at the lines straight?
* Well the unmultiplied average is a simple scaled down cube. We take the 255^3 cube and scale it down with the mixer average as the vertex. We could then just try to apply alpha to each point in that. Let's call the scaled down cube the average cube.
* First off, let's talk max_avg. It is only based on the chosen point within average cube.  We already know the average cube for any given mixer, since it's so simple.
* Now, avg_max is more tricky. Or is it? Let's think. If the mixer has n-1 dyes, and we increase the maximum of the chosen color by m, the avg_max will increase by m/n. If we increase R, G, and B in the chosen color equally, then the max_avg will also increase by m/n, since each result channel will increase by m/n.
* Therefore, moving a color in a diagonal direction with equal R, G, and B change the max_avg and avg_max by the exact same amount. That means moving towards white will decrease the multiplier, by brining it towards 1, since it is always >= 1.
* So what about moving it in other directions? Well in our example, red, green, yellow, magenta, and cyan also have the same property when we move in their directions, but blue increases avg_max while leaving max_avg alone.
* Let's write the last color R,G,B (variables) and see what the result is.
    * avg_max = (255 + 255 + max(R,G,B)) / 3
        * = 160 + max(R,G,B) / 3
    * max_avg = max((255 + R) / 3, (255 + G) / 3, B / 3)
        * that last case never wins
    avg_max / max_avg
        * = if(R == max(R,G)) then (160 + max(R,G,B) / 3) / (85 + R/3) else ((160 + max(R,G,B)) / 3) / (85 + G/3)
    * let'ss split that up by case: avg_max / max_avg =
        * if(R == max(R,G,B)): (160 + R/3) / (85 + R/3)
        * if(G == max(R,G,B)): (160 + G/3) / (85 + G/3)
        * if(B == max(R,G,B) and R == max(R,G)): (160 + B/3) / (85 + R/3)
        * if(B == max(R,G,B) and G == max(R,G)): (160 + B/3) / (85 + G/3)

Now I'm not a genius, but those look curved. So I would say the shape is curved in general. This should also apply to most mixers.

A mixer has 4 more or less separate parameters:
* total red
* total green
* total blue
* total maximum

And then the added color has its 3 parameters:
* red
* green
* blue

Given a mixer, it should be possible to anaylze the full curved object based on the 7 dimensions. It's just a hypersurface in 3D in a 10D space.

Okay, that was a joke.

Before we get caught up in that though, there is a simpler optimization we can make. I can't prove it, but the avg_max / max_avg (alpha) is always between 1 and 3. Important, it's only ever 3 at most. This means if we take an average cube and dilate it by 3x, we know its values must be in there...

Hm, well, 8 dye mixers do scale down the 256^3 cube by 8x, but scaling it back up 3x is still terrible.

What if instead we play a game called alpha maximization. This is a game where we take a mixer and try to scale its alpha as high as possible. Well I'm going to further hypotheize that the max alpha is always at #ff0000, #00ff00, #ffff00, #0000ff, #ff00ff, #00ffff, or #ffffff. So for every mixer, we just find the alpha at these points, and then use that.

So here is our code:
```cpp
class Mixer{
public:
    uint tr = 0;
    uint tg = 0;
    uint tb = 0;
    uint tm = 0;
    ushort mix_d = 0;
    uint len = 0;
    /** min value of R channel for this mixer */
    uint min_r = 0;
    /** min value of G channel for this mixer */
    uint min_g = 0;
    /** min value of B channel for this mixer */
    uint min_b = 0;
    /** max value of R channel for this mixer */
    uint max_r = 0;
    /** max value of G channel for this mixer */
    uint max_g = 0;
    /** max value of B channel for this mixer */
    uint max_b = 0;
    Mixer(){}
    Mixer(uint a_tr, uint a_tg, uint a_tb, uint a_tm, ushort a_mix_d, uint a_len){
        tr = a_tr;
        tg = a_tg;
        tb = a_tb;
        tm = a_tm;
        mix_d = a_mix_d;
        len = a_len;
    }
    void find_bounds(){
        float max_a = 0;
        max_a = max(max_a, alpha(0xff, 0x00, 0x00));
        max_a = max(max_a, alpha(0x00, 0xff, 0x00));
        max_a = max(max_a, alpha(0xff, 0xff, 0x00));
        max_a = max(max_a, alpha(0x00, 0x00, 0xff));
        max_a = max(max_a, alpha(0xff, 0x00, 0xff));
        max_a = max(max_a, alpha(0x00, 0xff, 0xff));
        max_a = max(max_a, alpha(0xff, 0xff, 0xff));
        
        min_r = uint(max_a * tr) / len;
        min_g = uint(max_a * tg) / len;
        min_b = uint(max_a * tb) / len;
        max_r = (max_a * float(tr + 0x100)) / float(len);
        max_g = (max_a * float(tg + 0x100)) / float(len);
        max_b = (max_a * float(tb + 0x100)) / float(len);
    }
    float alpha(uint r, uint g, uint b){
        uint a_tr = tr + r;
        uint a_tg = tg + g;
        uint a_tb = tb + b;
        uint ar = a_tr / len;
        uint ag = a_tg / len;
        uint ab = a_tb / len;
        float avg_max = float(tm + max(r, g, b)) / float(len);
        float max_avg = max(ar, ag, ab);
        return avg_max / max_avg;
    }
};
```

Well I literally just implemented this real quick, because there is no reason to not do so. I'm avoiding rounding down on the maximums, to hopefully ensure the range is big enough to catch all of the values.

And I have this new format for recipes in JE: Recipes are 32 bits. Each set of bits is directly a number to increment the dye index by. The 8 sets together are effectively the list of dye indices. Once the index accumulates to 16, that signifies the end of the list. Or the list just ends at the 8th item.

It's a great system.

9:30 AM and I have bad news. Something is not working.

Another good water to figure out which colors are reachable from a mixable is to only mix the colors on the edge of 256^3 cube. So that is 256^3-254^3 = 390152 colors. You can then do a poly fill from any point within that object's empty space, to get all of the colors. Before doing the polyfill, you can generate just the edges of all of the mixers, and then just do one global polyfill operation. These edges should be exact, unlike my get_bounds method. But the operation is also much more expensive, so it would only be good to run it after somehow reducing the number of mixers. And you would have to reduce the mixers confidently.
