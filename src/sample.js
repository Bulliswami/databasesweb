const pt = [
    {
        "propertyName": "abc",
        "propertyQuestion": "cs",
        "propertyallowedValue": [
            {
                "allowedValue": "da",
                "allowedValueCode": "da"
            },
            {
                "allowedValue": "dasa",
                "allowedValueCode": "dsaa"
            },
            {
                "allowedValue": "dqwa",
                "allowedValueCode": "dqwqa"
            }
        ],
        "displayOrder": "adda",
        "propertyDisplayType": "asd"
    },
    {
        "propertyName": "asdfwe",
        "propertyQuestion": "sdcsd",
        "propertyallowedValue": [
            {
                "allowedValue": "dsa",
                "allowedValueCode": "dad"
            },
            {
                "allowedValue": "ad23",
                "allowedValueCode": "r454"
            },
            {
                "allowedValue": "345",
                "allowedValueCode": "psad"
            }
        ],
        "displayOrder": "asd23",
        "propertyDisplayType": "vs"
    }
]
let properties = []
pt.forEach(ele => {
    let pval = [];
    ele.propertyallowedValue.forEach((et) => {
        pval.push({
            name: et.allowedValue,
            val: et.allowedValueCode
        })
    })
    properties.push({
        name: ele.propertyName,
        values: pval
    })
})

