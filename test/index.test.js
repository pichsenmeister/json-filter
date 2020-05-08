const JSONMask = require("../dist/index")
const payload = require("./payload")

/**
 * 
 * match() tests
 *  
 */

test("it should throw an `invalid JSON` error if payload is not valid JSON", () => {
    expect(() => {
        JSONMask.match("string", {})
    }).toThrow("invalid JSON")

    expect(() => {
        JSONMask.match(undefined, {})
    }).toThrow("invalid JSON")

    expect(() => {
        JSONMask.match(3, {})
    }).toThrow("invalid JSON")

    expect(() => {
        JSONMask.match(() => { }, {})
    }).toThrow("invalid JSON")
})

test("it should throw an `invalid JSON mask object` error if JSON mask is not valid JSON", () => {
    expect(() => {
        JSONMask.match({}, 'string')
    }).toThrow("invalid JSON mask object")

    expect(() => {
        JSONMask.match({}, 3)
    }).toThrow("invalid JSON mask object")

    expect(() => {
        JSONMask.match({}, undefined)
    }).toThrow("invalid JSON mask object")

    expect(() => {
        JSONMask.match({}, [])
    }).toThrow("invalid JSON mask object")

    expect(() => {
        JSONMask.match({}, () => { })
    }).toThrow("invalid JSON mask object")

})

test("it should match all elements on a JSON object with empty mask", () => {
    const mask = JSONMask.match(payload.match_object, {})

    // return array should have 5 elements
    expect(mask.length).toBe(5)
})

test("it should match all elements on a JSON array with empty mask", () => {
    const mask = JSONMask.match(payload.match_array, {})

    // return array should have 13 elements
    expect(mask.length).toBe(13)
})

test("it should match strings", () => {
    const mask = JSONMask.match(payload.match_object, {
        string: "str"
    })

    // return array should have 1 element
    expect(mask.length).toBe(1)

    expect(JSON.stringify(mask.first())).toBe(JSON.stringify({
        "number": 1,
        "boolean": true,
        "string": "str"
    }))
})

test("it should match numbers", () => {
    const mask = JSONMask.match(payload.match_object, {
        number: 1
    })

    // return array should have 1 element
    expect(mask.length).toBe(1)

    expect(JSON.stringify(mask.first())).toBe(JSON.stringify({
        "number": 1,
        "boolean": true,
        "string": "str"
    }))
})

test("it should match booleans", () => {
    const mask = JSONMask.match(payload.match_object, {
        boolean: true
    })

    // return array should have 1 element
    expect(mask.length).toBe(1)

    expect(JSON.stringify(mask.first())).toBe(JSON.stringify({
        "number": 1,
        "boolean": true,
        "string": "str"
    }))
})

test("it should return the same element for `first()`, `last()` and `get(0)` if there's only 1 element", () => {
    const mask = JSONMask.match(payload.match_object, {
        boolean: true
    })

    // return array should have 1 element
    expect(mask.length).toBe(1)

    expect(JSON.stringify(mask.first())).toBe(JSON.stringify(mask.last()))
    expect(JSON.stringify(mask.first())).toBe(JSON.stringify(mask.get(0)))
})

test("it should match a high level mask in a JSON object", () => {
    const mask = JSONMask.match(payload.match_object, { type: 'button' })

    // return array should have 1 element
    expect(mask.length).toBe(1)

    expect(JSON.stringify(mask.first())).toBe(JSON.stringify({
        "type": "button",
        "text": {
            "type": "plain_text",
            "text": "Button",
            "emoji": true
        },
        "value": true
    }))
})

test("it should match a sub structure mask in a JSON object", () => {
    const mask = JSONMask.match(payload.match_object, {
        text: {
            type: "plain_text",
            text: "Button"
        }
    })

    // return array should have 1 element
    expect(mask.length).toBe(1)

    expect(JSON.stringify(mask.first())).toBe(JSON.stringify({
        "type": "button",
        "text": {
            "type": "plain_text",
            "text": "Button",
            "emoji": true
        },
        "value": true
    }))
})

test("it should match a sub structure mask in a JSON object", () => {
    const mask = JSONMask.match(payload.match_object, {
        accessory: {
            text: {
                type: 'plain_text'
            }
        }
    })

    // return array should have 1 element
    expect(mask.length).toBe(1)
})

test("it should match a sub structure mask in a JSON array", () => {
    const mask = JSONMask.match(payload.match_array, {
        accessory: {
            text: {
                type: 'plain_text'
            }
        }
    })

    // return array should have 1 element
    expect(mask.length).toBe(1)
})

test("it should match a sub structure mask in a JSON array with $any", () => {
    const mask = JSONMask.match(payload.match_array, {
        accessory: {
            text: {
                type: '$any'
            }
        }
    })

    // return array should have 2 elements
    expect(mask.length).toBe(2)
})

test("it should match a sub structure mask in a JSON array with existing RegEx", () => {
    const mask = JSONMask.match(payload.match_array, {
        accessory: {
            text: {
                type: /^plain_\w*$/
            }
        }
    })

    // return array should have 1 element
    expect(mask.length).toBe(1)
})

test("it should match a sub structure mask in a JSON array with not existing RegEx", () => {
    const mask = JSONMask.match(payload.match_array, {
        accessory: {
            text: {
                type: /^other\w*$/
            }
        }
    })

    // return array should have 0 elements
    expect(mask.length).toBe(0)
})

test("it should match all values in a JSON array", () => {
    const mask = JSONMask.match(payload.match_array, { type: 'button' })

    // return array should have 1 elements
    expect(mask.length).toBe(4)

    expect(JSON.stringify(mask.first())).toBe(JSON.stringify({
        "type": "button",
        "text": {
            "type": "plain_text",
            "text": "Button",
            "emoji": true
        },
        "value": true
    }))

    expect(JSON.stringify(mask.get(1))).toBe(JSON.stringify({
        "type": "button",
        "text": {
            "type": "mrkdwn",
            "text": "Button"
        },
        "value": false
    }))

    expect(JSON.stringify(mask.get(2))).toBe(JSON.stringify({
        "type": "button",
        "text": {
            "type": "plain_text",
            "text": "Button",
            "emoji": true
        },
        "value": true
    }))

    expect(JSON.stringify(mask.last())).toBe(JSON.stringify({
        "type": "button",
        "text": {
            "type": "mrkdwn",
            "text": "Button"
        },
        "value": false
    }))
})

test("it should match all values in a JSON array using `all()`", () => {
    const mask = JSONMask.match(payload.match_array, { type: 'button' })

    // return array should have 1 elements
    expect(mask.length).toBe(4)

    const all = mask.all()

    expect(JSON.stringify(all[0])).toBe(JSON.stringify({
        "type": "button",
        "text": {
            "type": "plain_text",
            "text": "Button",
            "emoji": true
        },
        "value": true
    }))

    expect(JSON.stringify(all[1])).toBe(JSON.stringify({
        "type": "button",
        "text": {
            "type": "mrkdwn",
            "text": "Button"
        },
        "value": false
    }))

    expect(JSON.stringify(all[2])).toBe(JSON.stringify({
        "type": "button",
        "text": {
            "type": "plain_text",
            "text": "Button",
            "emoji": true
        },
        "value": true
    }))

    expect(JSON.stringify(all[3])).toBe(JSON.stringify({
        "type": "button",
        "text": {
            "type": "mrkdwn",
            "text": "Button"
        },
        "value": false
    }))
})

test("it should match all values in a JSON array", () => {
    const mask = JSONMask.match(payload.match_array, {
        type: "button",
        text: {
            type: "plain_text",
            text: "Button"
        }
    })

    // return array should have 2 elements
    expect(mask.length).toBe(2)

    expect(JSON.stringify(mask.first())).toBe(JSON.stringify({
        "type": "button",
        "text": {
            "type": "plain_text",
            "text": "Button",
            "emoji": true
        },
        "value": true
    }))

    expect(JSON.stringify(mask.last())).toBe(JSON.stringify({
        "type": "button",
        "text": {
            "type": "plain_text",
            "text": "Button",
            "emoji": true
        },
        "value": true
    }))
})

test("it should match all values with `$any` in a JSON array", () => {
    const mask = JSONMask.match(payload.match_array, {
        type: "button",
        text: "$any"
    })

    // return array should have 3 elements
    expect(mask.length).toBe(4)

    expect(JSON.stringify(mask.first())).toBe(JSON.stringify({
        "type": "button",
        "text": {
            "type": "plain_text",
            "text": "Button",
            "emoji": true
        },
        "value": true
    }))

    expect(JSON.stringify(mask.get(1))).toBe(JSON.stringify({
        "type": "button",
        "text": {
            "type": "mrkdwn",
            "text": "Button"
        },
        "value": false
    }))

    expect(JSON.stringify(mask.get(2))).toBe(JSON.stringify({
        "type": "button",
        "text": {
            "type": "plain_text",
            "text": "Button",
            "emoji": true
        },
        "value": true
    }))


    expect(JSON.stringify(mask.last())).toBe(JSON.stringify({
        "type": "button",
        "text": {
            "type": "mrkdwn",
            "text": "Button"
        },
        "value": false
    }))
})

test("it should match all values with `$any` in a JSON object", () => {
    const mask = JSONMask.match(payload.match_object, {
        type: "$any"
    })

    // return array should have 4 elements
    expect(mask.length).toBe(4)
})

test("it should match all values with regex in a JSON object", () => {
    const mask = JSONMask.match(payload.match_object, {
        type: /^plain_\w*$/
    })

    // return array should have 1 element
    expect(mask.length).toBe(1)

    expect(JSON.stringify(mask.first())).toBe(JSON.stringify({
        "type": "plain_text",
        "text": "Button",
        "emoji": true
    }))
})

test("it should match all given values in a JSON object", () => {

    const mask = JSONMask.match(payload.match_object, { type: 'button', value: true })

    // return array should have 1 element
    expect(mask.length).toBe(1)

    expect(JSON.stringify(mask.first())).toBe(JSON.stringify({
        "type": "button",
        "text": {
            "type": "plain_text",
            "text": "Button",
            "emoji": true
        },
        "value": true
    }))
})

test("it should match all given values in a JSON array", () => {

    const mask = JSONMask.match(payload.match_array, { type: 'button', value: true })

    // return array should have 2 elements
    expect(mask.length).toBe(2)

    // all of them should have the value "string"
    expect(JSON.stringify(mask.first())).toBe(JSON.stringify({
        "type": "button",
        "text": {
            "type": "plain_text",
            "text": "Button",
            "emoji": true
        },
        "value": true
    }))

    expect(JSON.stringify(mask.last())).toBe(JSON.stringify({
        "type": "button",
        "text": {
            "type": "plain_text",
            "text": "Button",
            "emoji": true
        },
        "value": true
    }))
})

test("it should return undefined for out-of-bounds index in JSON object", () => {

    const mask = JSONMask.match(payload.match_object, { type: 'button', value: true })

    // return array should have 1 element
    expect(mask.length).toBe(1)

    expect(JSON.stringify(mask.get(1))).toBe(undefined)
})

test("it should return undefined for out-of-bounds index in JSON array", () => {

    const mask = JSONMask.match(payload.match_array, { type: 'button', value: true })

    // return array should have 2 elements
    expect(mask.length).toBe(2)

    expect(JSON.stringify(mask.get(2))).toBe(undefined)
})

test("it should return undefined for `first()` if no results found", () => {

    const mask = JSONMask.match(payload.match_array, { type: 'button', key: 'has-no-match' })

    // return array should have 0 elements
    expect(mask.length).toBe(0)

    expect(JSON.stringify(mask.first())).toBe(undefined)
})

test("it should return undefined for `last()` if no results found", () => {

    const mask = JSONMask.match(payload.match_array, { type: 'button', key: 'has-no-match' })

    // return array should have 0 elements
    expect(mask.length).toBe(0)

    expect(JSON.stringify(mask.last())).toBe(undefined)
})

test("it should have same length of `length` property and length of `all()` ", () => {
    const mask = JSONMask.match(payload.match_array, { type: 'button', value: true })

    // return array should have 2 elements
    expect(mask.length).toBe(2)
    expect(mask.length).toBe(mask.all().length)
})

test("it should validate the README example because that would be embarrassing", () => {
    let mask = JSONMask.match(payload.readme, { type: 'click' })

    // return array should have 2 elements
    expect(mask.length).toBe(2)
    expect(JSON.stringify(mask.first())).toBe(JSON.stringify({
        type: 'click',
        property: 'site_signup'
    }))
    expect(JSON.stringify(mask.last())).toBe(JSON.stringify({
        type: 'click',
        property: 'site_pricing'
    }))

    mask = JSONMask.match(payload.readme, { type: '$any' })
    expect(mask.length).toBe(3)

    mask = JSONMask.match(payload.readme, { property: /^site_\w*$/ })
    expect(mask.length).toBe(2)
    expect(JSON.stringify(mask.first())).toBe(JSON.stringify({
        type: 'click',
        property: 'site_signup'
    }))
    expect(JSON.stringify(mask.last())).toBe(JSON.stringify({
        type: 'click',
        property: 'site_pricing'
    }))
})




