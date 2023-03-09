import { I_JSON_TokenFormatter } from "./I_JSON_TokenFormatter";

export class JSON_TokenFormatter implements I_JSON_TokenFormatter {
  private static readonly fields: string[] = [
    'id', 'fullName', 'shortName', 'address', 'statistics',
    'price', 'change', 'totalValueLocked', 'totalVolume', 'volumeForDay',
    'priceStampsAllTime', 'timeStamp', "icon",
  ]

  /**
   * changing fields names in result json string
   * @param jsonString input json string
   */
  format(jsonString: string): string {
    JSON_TokenFormatter.fields.map(
      fieldName => jsonString = jsonString
        .split('"_' + fieldName + '":')
        .join('"' + fieldName + '":')
    )
    return jsonString
  }
}