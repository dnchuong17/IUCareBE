export class DateUtils {
    formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    formatStringToDate(dbTime: string): Date {
        const date = new Date(dbTime);
        const offset = date.getTimezoneOffset() * 60000;
        return new Date(date.getTime() - offset);
    }

    formatTimeZone(date: Date, timeZone: string = 'Asia/Ho_Chi_Minh'): string {
        // Use Intl.DateTimeFormat to format the date with the desired time zone
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short',
        };

        const formatter = new Intl.DateTimeFormat('en-US', { ...options, timeZone });
        return formatter.format(date);
    }
}