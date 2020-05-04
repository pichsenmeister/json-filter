const utils = require('./utils')

const match = (tree, mask) => {
    if (typeof tree !== 'object') throw new Error('invalid JSON')
    if (typeof mask !== 'object') throw new Error('invalid JSON mask object')
    if (Array.isArray(mask)) throw new Error('invalid JSON mask object')

    let results = []

    switch (typeof tree) {
        case 'object':
            results = _parseMatch(tree, mask, results)
            break
    }

    return _generateResultObj(results)
}

const _generateResultObj = (results) => {
    const obj = {}
    obj.length = results.length

    obj.first = () => {
        return results.length ? results[0] : undefined
    }

    obj.last = () => {
        return results.length ? results[results.length - 1] : undefined
    }

    obj.get = (index) => {
        if (index > results.length - 1) return undefined
        return results[index]
    }

    obj.all = () => {
        return results
    }

    return obj
}

const _parseMatch = (tree, mask, results) => {
    const maskKeys = Object.keys(mask)
    switch (typeof tree) {
        case 'object':
            if (Array.isArray(tree)) {
                tree.map(item => _parseMatch(item, mask, results))
            } else {
                // get keys of current tree
                let treeKeys = Object.keys(tree)
                let isSubMask = maskKeys.filter((val) => { return treeKeys.indexOf(val) >= 0 }).length === maskKeys.length
                // check length if all maskKeys are part of this structure and their values are equal
                if (isSubMask) {
                    let filter = maskKeys.filter(item => {
                        if (typeof tree[item] === 'string' && mask[item] instanceof RegExp) {
                            return mask[item].test(tree[item])
                        } else if (typeof mask[item] !== 'object') {
                            return tree[item] === mask[item] || mask[item] === '$any'
                        }
                        return utils.compareObj(tree[item], mask[item])
                    })

                    if (filter.length === maskKeys.length) {
                        results.push(tree)
                    }
                }

                // check sub tree as well
                treeKeys.forEach(item => {
                    if (typeof tree[item] === 'object') _parseMatch(tree[item], mask, results)
                })
            }
            break
    }
    return results
}

module.exports = {
    match
}