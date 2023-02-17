import { IjsonTokenFormatter } from "./IjsonTokenFormatter";

export class JsonTokenFormatter implements IjsonTokenFormatter {
  private static readonly fields: string[] = [
    'id', 'fullName', 'shortName', 'address', 'statistics',
    'price', 'change', 'totalValueLocked', 'totalVolume', 'volumeForDay',
    'priceStampsAllTime', '', 'timeStamp', "icon",
  ]

  /**
   * changing fields names in result json string
   * @param jsonString input json string
   */
  format(jsonString: string): string {
    JsonTokenFormatter.fields.map(
      fieldName => jsonString = jsonString
        .split('"_' + fieldName + '":')
        .join('"' + fieldName + '":')
    )
    return jsonString
  }
}