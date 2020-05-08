module.exports = {
    "match_object": {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": "Some text."
        },
        "accessory": {
            "type": "button",
            "text": {
                "type": "plain_text",
                "text": "Button",
                "emoji": true
            },
            "value": true
        },
        "primitives": {
            "number": 1,
            "boolean": true,
            "string": "str"
        }
    },
    "match_array": [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Some text."
            },
            "accessory": {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "Button",
                    "emoji": true
                },
                "value": true
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Some text."
            },
            "accessory": {
                "type": "button",
                "text": {
                    "type": "mrkdwn",
                    "text": "Button"
                },
                "value": false
            }
        },
        {
            "elements": [
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Button",
                        "emoji": true
                    },
                    "value": true
                },
                {
                    "type": "button",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Button"
                    },
                    "value": false
                }
            ]
        }
    ],
    "readme": {
        "actions": [
            {
                "type": "visit",
                "property": "website"
            },
            {
                "type": "click",
                "property": "site_signup"
            },
            {
                "type": "click",
                "property": "site_pricing"
            }
        ],
        "property": "other"
    }
}