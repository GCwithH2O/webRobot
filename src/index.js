import "./index.css"
import "./index.html"

const add = (x, y) => x + y

console.log(add(3, 4))

const add2 = function add2(x, y) {
    return x + y
}

const p_for_pro = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("1111111")
        resolve()
    }, 1000)
})

console.log(p_for_pro)
