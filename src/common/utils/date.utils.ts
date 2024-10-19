export class DateUtils {
    formatDate(yourDate: Date) {
        const offset = yourDate.getTimezoneOffset();
        yourDate = new Date(yourDate.getTime() - (offset * 60 * 1000))
        return yourDate.toISOString();
    }

    formatStringToDate(dbTime: string) {
        const date = new Date(dbTime);
        const offset = date.getTimezoneOffset();
        const time = date.getTime();
        return new Date(time + offset * 60 * 1000);
    }
}

