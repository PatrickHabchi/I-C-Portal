const formatNumberWithCommas = (number, decimalPlaces = 0) => {
    const cleanString = typeof number !== "number" ? parseFormattedNumber(number): number;
    const fixedNumber = Number(cleanString).toFixed(decimalPlaces);
    const parts = fixedNumber.toString().split(".");
    parts[0] = parts[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
};

export const formatNum = (number) => {
    const parts = number.toString().split('.');
    const formattedInteger = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return parts.length === 2 ? `${formattedInteger}.${parts[1]}` : formattedInteger;
}

export const formatLBP = (number) => {
    return formatNumberWithCommas(number, 0);
};

export const formatUSD = (number) => {
    return formatNumberWithCommas(number, 2);
};

export const formatCurrency = (number) => {
    if (!number) {
        return "";
    }

    const value = number.toString();

    if (value?.includes("USD")) {
        const number = value?.replace("USD", "");
        return `$ ${formatUSD(number)}`;
    }

    if (value?.includes("$")) {
        const number = value?.replace("$", "");
        return `$ ${formatUSD(number)}`;
    }

    if (value?.includes("LBP")) {
        const number = value?.replace("LBP", "");
        return `L.L ${formatLBP(number)}`;
    }

    if (value?.includes("LL") || value.includes("L.L")) {
        const number = value?.replace("LL", "");
        const number1 = number?.replace("L.L", "");
        return `L.L ${formatLBP(number1)}`;
    }
    return value;
};

export const formatAccount = (value, currencyID) => {
    if(value === 0){
        return (currencyID === 1? '$':'L.L') + 0;
    }
    if(!value) return 0;
    if (currencyID === 1) {
        return `$ ${formatUSD(value)}`;
    }
    if (currencyID === 2) {
        return `L.L ${formatLBP(value)}`;
    }
}

export const formatAccountRev = (value, currencyID) => {
    if (currencyID === 1) {
        return `$ ${formatUSD(value)}`;
    }
    if (currencyID === 2) {
        return `L.L ${formatLBP(value)}`;
    }
}



export const formatSignedCurrency = (value, currencyId, sign) => {
    if (currencyId === 1) {
        return sign === -1 ? `- ${formatUSD(Math.abs(value))}` : ` ${formatUSD(value)}`;
    }
    if (currencyId === 2) {
        return sign === -1 ? `- ${formatLBP(Math.abs(value))}` : ` ${formatLBP(value)}`;
    }
}

export const parseFormattedNumber = (formattedNumber) => {
    const numberString = formattedNumber?.replace(/,/g, "");
    return Number(numberString);
};

export const capitalizeFirstLetters = (inputString) => {
    let words;
    if (inputString) {
        words = inputString.split(' ');

        const capitalizedWords = words.map(word => {
            const firstChar = word.charAt(0).toUpperCase();
            const restOfWord = word.slice(1).toLowerCase();
            return firstChar + restOfWord;
        });

        return capitalizedWords.join(' ');
    } else {
        return inputString;
    }

}

export const dateFormat = (dateString) => {
    if(!dateString) return "";
    else{
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }
};

export const timeFormat = (dateString) => {
    const date = new Date(dateString);
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleTimeString('en-US', options);
}

export const keyFormat = (key) => {
    return key.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1');
}

export const NumberToStringWithSpaces = (number) => {
    if (!number) return;
    const numberString = number.toString();
    const characters = numberString.split('');

    return characters.join(' ');
};

export const getCurrencyIdFromAmount = (amount) => {
    if (amount.includes('$') || amount.includes('USD')) {
        return 1;
    }

    if (amount.includes('L.L') || amount.includes('LBP') || amount.includes('LL')) {
        return 2;
    }

    return 0;
};

export const formatReference = (reference, currencyId) => {

    if(currencyId === 1) {
        return reference + '001';
    }else if (currencyId === 2) {
        return reference + '002';
    }else {
        return reference;
    }
}

export const formatCurrencyWithId = (currencies, amount, currencyId) => {
    //{ ID: 1, Name: "USD", Symbol: "$", Precision: 2 },
    const currency = currencies?.find(c => c.ID === Number(currencyId));
    if (!currency) {
        return amount;
    }

    return `${currency?.Symbol} ${formatNumberWithCommas(amount, currency?.Precision)}`;
}

export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const formatMobileNumber = (value) => {
    const digitsOnly = value.replace(/\D/g, "");
    const truncatedValue = digitsOnly.slice(0, 8);

    if (digitsOnly.length === 0) {
        return "";
    }
    if (truncatedValue[0] !== "undefined" && truncatedValue[0] !== "0" && truncatedValue[0] !== "7" && truncatedValue[0] !== "8") {
        return "0" + truncatedValue;
    }
    if (truncatedValue.length > 3) {
        return truncatedValue.replace(/(\d{2})(\d{3})(\d{3})/, "$1 $2 $3");
    }
    return truncatedValue;
};
