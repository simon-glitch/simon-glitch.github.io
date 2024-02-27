
#include <cmath>

typedef int Item;
typedef unsigned long long ull;

/**
Uses sub-sequences and fancy iteration tricks to avoid having expensive shift, unshift, and splice operations.

Has none of the downsides of linked lists or vectors, but indexing is slowed down by a constant multiplier.
**/
class sequence{
private:
    // REMEMBER: vars with no set value here will use whatever value the OS leaves for them
    // if you don't see the consructor being **called** with `()` or `=`, then it's *not* being called
    
    /**
    The sub-sequences this sequence contains.
    
    The sub-sequences are all listed as one single array, for efficiency.
    **/
    Item content[];
    /** Indices in the represented **/
    ull indices[];
    /**
    Does not recursively call on construction of the parent object.
    
    This is a nested array of actual sequences. This is recursive, just like a tree.
    **/
    sequence innseq[];
    
public:
    /** The maximum padding this sequence can keep if it is scaled down a lot **/
    static double padding_down = 1.5;
    /** The minimum padding this sequence will have if it is scaled up a lot **/
    static double padding_up = 1.125;
    /** See `sequence::padding_log` **/
    static double padding_log_offset = 2;
    /** See `sequence::padding_log` **/
    static double padding_log_coeff = 1.5;
    /** See `sequence::padding_log` **/
    static double padding_log_power = 2;
    
    /** The minimum percentage of the sequence's size that can be used without requiring the sequence to change its capacity **/
    static double shrink_prop = 0.8;
    
    /** Minimum size of subsequences. This makes the sequence efficient when it is small **/
    
    /** Gives the capacity the list should right now **/
    inline ull padding_log() const {
        return ()
    }
    
private:
    void setCapacity(const ull newCap){}
}

