export function FormatDateStringForClient(dateToFormat)
{
    return `${dateToFormat.getDate()}/${dateToFormat.getMonth()+1}/${dateToFormat.getFullYear()}`;
}

export function FormatDateStringForServer(dateToFormat)
{
    return `${dateToFormat.getFullYear()}-${dateToFormat.getMonth()+1}-${dateToFormat.getDate()}`;
}