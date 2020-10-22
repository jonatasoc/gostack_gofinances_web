const formatValue = (value: number): string =>
  Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value); // TODO

const dateOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
  timeZone: 'America/Sao_Paulo',
};

export const formatDate = (date: Date): string =>
  Intl.DateTimeFormat('pt-br', dateOptions).format(date);

export default formatValue;
