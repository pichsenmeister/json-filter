module.exports = {
    "string": "This is a ${banana}, an ${apple} and another banana.",

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
    ]
}