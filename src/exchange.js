// Import necessary libraries
import React, { useState } from 'react';

const CurrencyConverter = () => {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [conversionRate, setConversionRate] = useState(null);
    const [convertedAmount, setConvertedAmount] = useState(null);

    const currencies = ['USD', 'EUR', 'KRW', 'JPY', 'GBP', 'AUD'];

    const handleConvert = async () => {
        try {
            const response = await fetch(
                `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
            );
            const data = await response.json();

            if (data && data.rates) {
                const rate = data.rates[toCurrency];
                setConversionRate(rate);
                setConvertedAmount((amount * rate).toFixed(2));
            } else {
                throw new Error('Failed to fetch conversion rate');
            }
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
            alert('환율 데이터를 가져오는 데 실패했습니다.');
        }
    };

    return (
        <div style={{ fontFamily: 'Arial', textAlign: 'center', margin: '50px' }}>
            <h1>환율 계산기</h1>
            <div>
                <input
                    type="number"
                    placeholder="금액 입력"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                >
                    {currencies.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
                <span> to </span>
                <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                >
                    {currencies.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
                <button onClick={handleConvert} style={{ marginLeft: '10px' }}>
                    계산
                </button>
            </div>
            {convertedAmount && (
                <p>
                    {amount} {fromCurrency} = {convertedAmount} {toCurrency} (환율: {conversionRate})
                </p>
            )}
        </div>
    );
};

export default CurrencyConverter;
