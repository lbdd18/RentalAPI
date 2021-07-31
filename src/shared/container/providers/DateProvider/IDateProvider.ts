interface IDateProvider {
  compareInHours(startDate: Date, endDate: Date): number;
  compareInDays(startDate: Date, endDate: Date): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
  dateAddDays(days: number): Date;
  dateAdd24Hours(): Date;
}

export { IDateProvider };
