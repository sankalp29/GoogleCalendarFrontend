import dayjs from "dayjs";

export function getMonth(month = dayjs().month()) {
    month = Math.floor(month);
    const year = dayjs().year();
    const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
    let currentMonthCount = 0 - firstDayOfTheMonth;

    const daysMatrix = new Array(5).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++
            return dayjs(new Date(year, month, currentMonthCount));
        });
    });

    return daysMatrix;
}
/**

1. month = dayjs().month()
If you don’t pass a month, it takes the current month (0 = January, 11 = December).

2. const year = dayjs().year()
Gets the current year.

3. const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day()
Finds the weekday of the 1st day of that month.
Sunday → 0, Monday → 1, … Saturday → 6

4. let currentMonthCount = 0 - firstDayOfTheMonth
This sets up a counter that starts before the 1st day of the month.
For example, if the 1st is Wednesday (day = 3), it starts from -3, so the calendar can include the last few days of the previous month to fill the first week.

5. new Array(5).fill([]).map(...)
Creates 5 rows (each representing a week).

6. new Array(7).fill(null).map(...)
Inside each row, creates 7 columns (each representing a day of the week).

7. currentMonthCount++ & dayjs(new Date(year, month, currentMonthCount))
For each cell, increase the counter and create a date using that offset.
This gives you:
    Some days from the previous month (if needed),
    All days of the current month, and
    Possibly a few days from the next month to fill the last week.

8. Return → daysMatrix
Returns a 5×7 matrix of Day.js date objects — perfect for rendering a monthly calendar grid.
*/