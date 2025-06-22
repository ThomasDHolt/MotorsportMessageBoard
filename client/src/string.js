export function FormatDateString(dateToFormat)
{
    return `${dateToFormat.getDate()}/${dateToFormat.getMonth()+1}/${dateToFormat.getFullYear()}`;
}