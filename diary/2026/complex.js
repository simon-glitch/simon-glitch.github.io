
/**
 * Complex numbers class that demonstrates a large number of comparison operators.
 */
class Complex{
    r = 0;
    i = 0;
    constructor(r = 0, i = 0){
        this.r = r;
        this.i = i;
    }
    /**
     * Returns whether this is equal to that.
     * @param {Complex} that
     * @return {bool}
     */
    eq(that){
        return this.r === that.r && this.i === that.i;
    }
    /**
     * Returns whether this is less than that.
     * @param {Complex} that
     * @return {bool}
     */
    lt(that){
        return this.r < that.r;
    }
    /**
     * Returns whether this is greater than that.
     * @param {Complex} that
     * @return {bool}
     */
    gt(that){
        return this.r > that.r;
    }
    /**
     * Returns whether this is less than or equal to that. This operation is not the same as "not greater than" (`nge`).
     * @param {Complex} that
     * @return {bool}
     */
    lteq(that){
        return this.r < that.r || this.r === that.r && this.i === that.i;
    }
    /**
     * Returns whether this is greater than or equal to that. This operation is not the same as "not less than" (`nle`).
     * @param {Complex} that
     * @return {bool}
     */
    gteq(that){
        return this.r > that.r || this.r === that.r && this.i === that.i;
    }
    /**
     * Returns whether this is not less than that. This operation is not the same as "greater than or equal to" (`gteq`).
     * @param {Complex} that
     * @return {bool}
     */
    nlt(that){
        return this.r >= that.r;
    }
    /**
     * Returns whether this is not greater than that. This operation is not the same as "less than or equal to" (`lteq`).
     * @param {Complex} that
     * @return {bool}
     */
    ngt(that){
        return this.r <= that.r;
    }
    /**
     * Returns whether this comes before that in a total ordering. This operation is not the same as "less than" (`lt`).
     * @param {Complex} that
     * @return {bool}
     */
    before(that){
        return this.r < that.r || this.r === that.r && this.i < that.i;
    }
    /**
     * Returns whether this comes after that in a total ordering. This operation is not the same as "greater than" (`gt`).
     * @param {Complex} that
     * @return {bool}
     */
    after(that){
        return this.r > that.r || this.r === that.r && this.i > that.i;
    }
    /**
     * Returns a compare value for sorting this and that in ascending order. This operation is not the same as "complex comparison" (`compare`).
     * @param {Complex} that
     * @return {number} A negative value indicates this goes before that, a positive value indicates this goes after that, and 0 indicates this and that are equal.
     */
    compare_ord(that){
        return this.r === that.r ? this.i - that.i : this.r - that.r;
    }
    /**
     * The "complex compare" operator. Use `compare_ord` instead when sorting lists.
     * @param {Complex} that
     * @return {Complex} The result of the "complex compare" operator.
     */
    compare(that){
        const a = Math.atan2(this.i - that.i, this.r - that.r);
        return new Complex(Math.cos(a), Math.sin(a));
    }
    /**
     * Returns whether this is coreal to that. This operation is the same as "not less than and not greater than".
     * @param {Complex} that
     * @return {bool}
     */
    cr(that){
        return this.r === that.r;
    }
    /**
     * Returns whether this is coimaginary to that. This operation is the same as "not above and not below" (`nabbe`).
     * @param {Complex} that
     * @return {bool}
     */
    ci(that){
        return this.i === that.i;
    }
    /**
     * Returns whether this is above that.
     * @param {Complex} that
     * @return {bool}
     */
    ab(that){
        return this.i > that.i;
    }
    /**
     * Returns whether this is below that.
     * @param {Complex} that
     * @return {bool}
     */
    be(that){
        return this.i < that.i;
    }
    /**
     * Returns whether this is above or equal to that.
     * @param {Complex} that
     * @return {bool}
     */
    abeq(that){
        return this.i > that.i || this.i === that.i && this.r === that.r;
    }
    /**
     * Returns whether this is below or equal to that.
     * @param {Complex} that
     * @return {bool}
     */
    beeq(that){
        return this.i < that.i || this.i === that.i && this.r === that.r;
    }
    /**
     * Returns whether this is not above that.
     * @param {Complex} that
     * @return {bool}
     */
    nab(that){
        return this.i <= that.i;
    }
    /**
     * Returns whether this is not below that.
     * @param {Complex} that
     * @return {bool}
     */
    nbe(that){
        return this.i >= that.i;
    }
    /**
     * Returns whether this is not below and not below that.
     * @param {Complex} that
     * @return {bool}
     */
    nabbe(that){
        return this.i === that.i;
    }
    /** Just returns the real part of the complex number, or NaN if the complex number is not finite. */
    valueOf(){
        return isFinite(this.i) ? this.r : NaN;
    }
    toString(radix){
        if(!(isFinite(this.r) && isFinite(this.i))){
            return (this.r + this.i).toString();
        }
        return this.r.toString(radix) + "+-"[this.i < 0] + this.i.toString(radix) + "i";
    }
}

