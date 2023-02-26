import { UnitOfTime } from "./unitOfTime";

export class TimeConverter {
  private static readonly MILLISECONDS_IN_SECOND: number = 1000
  private static readonly SECONDS_IN_MINUTE: number = 60
  private static readonly MINUTES_IN_HOUR: number = 60
  private static readonly HOURS_IN_DAY: number = 24
  private static readonly DAYS_IN_WEEK: number = 7
  private static readonly DAYS_IN_YEAR: number = 365

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
    return milliseconds / (this.MILLISECONDS_IN_SECOND * this.SECONDS_IN_MINUTE
      * this.MINUTES_IN_HOUR)
  }

  private static millisecondsToDays(milliseconds: number): number {
    return milliseconds / (this.MILLISECONDS_IN_SECOND * this.SECONDS_IN_MINUTE
      * this.MINUTES_IN_HOUR * this.HOURS_IN_DAY)
  }

  private static millisecondsToWeeks(milliseconds: number): number {
    return milliseconds / (this.MILLISECONDS_IN_SECOND * this.SECONDS_IN_MINUTE
      * this.MINUTES_IN_HOUR * this.HOURS_IN_DAY * this.DAYS_IN_WEEK)
  }

  private static millisecondsToYears(milliseconds: number): number {
    return milliseconds / (this.MILLISECONDS_IN_SECOND * this.SECONDS_IN_MINUTE
      * this.MINUTES_IN_HOUR * this.HOURS_IN_DAY * this.DAYS_IN_YEAR)
  }
}