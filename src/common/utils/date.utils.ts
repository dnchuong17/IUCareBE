export class DateUtils {
    formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    formatStringToDate(dbTime: string) {
        const date = new Date(dbTime);
        const offset = date.getTimezoneOffset();
        const time = date.getTime();
        return new Date(time + offset * 60 * 1000);
    }




}

