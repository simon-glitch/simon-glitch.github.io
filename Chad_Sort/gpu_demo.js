// GPU is a constructor and namespace for browser
const gpu = new GPU.GPU();
const multiplyMatrix = gpu.createKernel(function(a, b) {
    let sum = 0;
    for (let i = 0; i < 512; i++) {
        sum += a[this.thread.y][i] * b[i][this.thread.x];
    }
    return sum;
}).setOutput([512, 512]);

const c = multiplyMatrix(1, 1);
console.log(c);
