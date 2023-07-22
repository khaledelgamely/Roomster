import { useState } from 'react';

import { addDays, format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './style.css'
const pastMonth = new Date();
function Start_End_Days() {
    const defaultSelected = {
        from: pastMonth,
        to: addDays(pastMonth, 4)
    };
    const [range, setRange] = useState(defaultSelected);

    let footer = <p>Please pick the first day.</p>;
    if (range?.from) {
        if (!range.to) {
            footer = <p>{format(range.from, 'PPP')}</p>;
        } else if (range.to) {
            footer = (
                <p>
                    {format(range.from, 'PPP')}–{format(range.to, 'PPP')}
                </p>
            );
        }
    }

    return <DayPicker
        id="test"
        mode="range"
        defaultMonth={pastMonth}
        selected={range}
        footer={footer}
        onSelect={setRange}
        numberOfMonths={1}
        captionLayout="dropdown-buttons"
        fromYear={2023}
        toYear={2030}

    />;

}

export default Start_End_Days