import {JSON_TokenFormatter} from "../../../src/utils/token_formatter/JSON_TokenFormatter";
import {AssertionError} from "assert";

describe('x', () => {
    const formatter: JSON_TokenFormatter = new JSON_TokenFormatter()
    const testToken =
        "{\n" +
        "    \"_id\": 1,\n" +
        "    \"_fullName\": \"TestToken1\",\n" +
        "    \"_shortName\": \"Test1\",\n" +
        "    \"_address\": \"TestAddress1\",\n" +
        "    \"_statistics\": {\n" +
        "        \"_price\": 10,\n" +
        "        \"_change\": 5,\n" +
        "        \"_totalValueLocked\": 0,\n" +
        "        \"_totalVolume\": 0,\n" +
        "        \"_volumeForDay\": 0,\n" +
        "        \"_icon\": \"base64string1\"\n" +
        "    },\n" +
        "    \"_priceStampsAllTime\": [\n" +
        "        {\n" +
        "            \"_price\": 1,\n" +
        "            \"_timeStamp\": \"2023-02-17T13:07:59.518Z\"\n" +
        "        },\n" +
        "        {\n" +
        "            \"_price\": 33,\n" +
        "            \"_timeStamp\": \"2023-02-17T13:07:59.633Z\"\n" +
        "        },\n" +
        "        {\n" +
        "            \"_price\": 90,\n" +
        "            \"_timeStamp\": \"2023-02-17T13:43:02.998Z\"\n" +
        "        }\n" +
        "    ]\n" +
        "}"

    const fields: string[] = [
        'id', 'fullName', 'shortName', 'address', 'statistics',
        'price', 'change', 'totalValueLocked', 'totalVolume', 'volumeForDay',
        'priceStampsAllTime', 'timeStamp', "icon"
    ]

    test('formatterTest', () => {
        const formattedToken: string = formatter.format(testToken)
        expect(() => fields.map(field => {
                if (!formattedToken.includes('\"' + field + '\"') ||
                    formattedToken.includes('\"_'+ field + '\"')) {
                    throw new AssertionError()
                }
            })
        ).not.toThrowError()
    })
})