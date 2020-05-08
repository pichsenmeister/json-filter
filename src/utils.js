// obj1 has to be the mask
// obj2 has to be the full JSON tree
const compareObj = (obj1, obj2) => {
    // loop through properties in object 1
    for (let p in obj1) {
        // check property exists on both objects
        if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) {
            return false
        }

        switch (typeof (obj1[p])) {
            case 'object':
                if (obj1[p] instanceof RegExp && typeof obj2[p] === 'string') {
                    return obj1[p].test(obj2[p])
                }
                if (!compareObj(obj1[p], obj2[p])) return false
                break
            default:
                return obj1[p] === '$any' || obj1[p] === obj2[p]
        }
    }

    return true
};

module.exports = {
    compareObj
}

