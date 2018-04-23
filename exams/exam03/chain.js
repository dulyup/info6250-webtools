const chain = {
    sum:0,
    result: function () {
        tmp = this.sum;
        this.sum = 0;
        return tmp;
    },
    one:function(){
        this.sum++;
        return this;
    },
    two:function(){
        this.sum += 2;
        return this;
    }
};

module.exports = chain;