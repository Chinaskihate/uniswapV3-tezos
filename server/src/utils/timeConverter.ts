import { UnitOfTime } from "./unitOfTime";

export class TimeConverter {
  /**
   * converting unix millisecond timestamp to target unit of time
   * @param milliseconds input timestamp
   * @param unitOfTime target unit of time
   */
  static convert(milliseconds: number, unitOfTime: UnitOfTime): number {
    switch (unitOfTime) {
      case UnitOfTime.HOUR: return this.millisecondsToHours(milliseconds)
      case UnitOfTime.DAY: return this.millisecondsToDays(milliseconds)
      case UnitOfTime.WEEK: return this.millisecondsToWeeks(milliseconds)
      case UnitOfTime.YEAR: return this.millisecondsToYears(milliseconds)
    }
  }

  private static millisecondsToHours(milliseconds: number): number {
    return milliseconds / (1000 * 60 * 60)
  }

  private static millisecondsToDays(milliseconds: number): number {
    return milliseconds / (1000 * 60 * 60 * 24)
  }

  private static millisecondsToWeeks(milliseconds: number): number {
    return milliseconds / (1000 * 60 * 60 * 24 * 7)
  }

  private static millisecondsToYears(milliseconds: number): number {
    return milliseconds / (1000 * 60 * 60 * 24 * 365)
  }
}