export const useFormatter = () => ({
    formatPrice: (price: number) => {
        return price.toLocaleString('pt-br', {
            minimumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL',
        });
    },
    formatQuantity: (qnt: number, minDigits: number) => {
        if (qnt.toString().length >= minDigits) qnt.toString();

        const remain = minDigits - qnt.toString().length;
        return `${'0'.repeat(remain)}${qnt}`;
    },
    formatDate: (date: string) => {
        return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
    },
});
