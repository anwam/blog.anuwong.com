import { parseISO, format } from "date-fns";

type Props = {
  dateString: string;
};

const DateFormatter = ({ dateString }: Props) => {
  const d = parseISO(dateString);
  const date = format(d, "LLLL	d, yyyy");
  return <time dateTime={date}>{date}</time>;
};

export default DateFormatter;
