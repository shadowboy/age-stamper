import moment from "moment";

/**
 *增加特殊事件判断
 *一周岁
 *100天
 *一周年
 *10周年
 *999天
 */

const _AgeFormat = "age";
// const _YearFormat = "year";

class TimeUtils {
  private startDateOriginal: string;
  private startTime: moment.Moment;
  private endTime: moment.Moment;
  private format: string;
  private yearMark: string;

  /**
   *
   *@param {String} startTime
   *@param {String} endTime default is now
   *@param {String} format show different format
   */
  constructor(startTime: string, format = "year", endTime = 0, offsetDays = 0) {
    this.startDateOriginal = startTime;
    this.startTime = moment(startTime);
    if (endTime === 0) {
      this.endTime = moment();
    } else {
      this.endTime = moment(endTime);
    }
    if (offsetDays > 0) {
      this.endTime = this.endTime.add(offsetDays, "days");
    } else if (offsetDays < 0) {
      this.endTime = this.endTime.subtract(-offsetDays, "days");
    }
    this.format = format;
    switch (this.format) {
      case _AgeFormat:
        this.yearMark = "岁"; //岁
        break;
      default:
        this.yearMark = "年"; //年
        break;
    }
  }

  getYearsMonthsAndDays() {
    return this.getAdaptive() + "(" + this.getDays() + ")";
  }

  getByFormat(format: string) {
    let timeString = "";
    switch (format) {
      case "adaption":
        timeString = this.getAdaptive();
        break;
      case "year":
        timeString = this.getYearMonth();
        break;
      case "month":
        timeString = this.getMonths();
        break;
      case "week":
        timeString = this.getWeeks();
        break;
      case "day":
        timeString = this.getDays();
        break;
      case "second":
        timeString = this.getSeconds();
        break;
      default:
        timeString = this.getAdaptive();
        break;
    }
    return timeString;
  }

  /**
   * Get full descripe
   *
   */
  getAdaptive() {
    const year = this.endTime.diff(this.startTime, "years");
    const withoutYearsDate = this.startTime.add(year, "year");
    const months = this.endTime.diff(withoutYearsDate, "months");
    const withoutMonthsDate = withoutYearsDate.add(months, "months");
    let days = this.endTime.diff(withoutMonthsDate, "days");
    console.log("withoutYearsDate :" + withoutYearsDate.format("YYYY-MM-DD"));
    console.log("withoutMonthsDate :" + withoutMonthsDate.format("YYYY-MM-DD"));
    let output = "";
    if (year > 0) {
      if (months === 0 && days === 0) {
        //周年判断
        output += year + "周" + this.yearMark + " ";
      } else {
        output += year + this.yearMark;
      }
    }

    if (months > 0) {
      output += months + "个月";
    }
    if (year < 1) {
      //第二天虽然没满，但是也算是第二天
      days += 1;
      output += days + "天";
    }
    return output;
  }

  /**
   * Get year and months
   *
   * @param {boolean} withDay
   */
  getYearMonth(withDay = false): string {
    const year = this.endTime.diff(this.startTime, "years");
    const withoutYearsDate = this.startTime.add(year, "year");
    const months = this.endTime.diff(withoutYearsDate, "months");
    const withoutMonthsDate = withoutYearsDate.add(months, "months");
    let days = this.endTime.diff(withoutMonthsDate, "days");
    let output = "";
    if (year > 0) {
      if (months === 0 && days === 0) {
        //周年判断
        output += year + "周" + this.yearMark;
      } else {
        output += year + this.yearMark;
      }
    }
    if (months > 0) {
      output += months + "个月";
    }
    if (days > 0 && withDay === true) {
      days += 1;
      output += days + "天";
    }
    return output;
  }

  getMonths(): string {
    let output = "";
    const months = this.endTime.diff(this.startDateOriginal, "months");
    output += months + "个月";
    return output;
  }

  getWeeks(): string {
    let output = "";
    const weeks = this.endTime.diff(this.startDateOriginal, "weeks");
    output += weeks + "周";
    return output;
  }

  getDays(): string {
    let output = "";
    const days = this.endTime.diff(this.startDateOriginal, "days");
    output += String(days + 1) + "天"; //当天就是第一天
    return output;
  }

  getSeconds(): string {
    let output = "";
    const seconds = this.endTime.diff(this.startDateOriginal, "seconds");
    output += String(seconds + 1) + "秒"; //当天就是第一天
    return output;
  }
}

export { TimeUtils };
