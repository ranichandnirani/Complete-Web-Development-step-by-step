import React, {useId} from 'react'

function InputBox({
    lable,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectedCurrency = "usd",
    amountDisabled = false,
    currencyDisabled = false,
    className = "",
}) {
     const id = useId()
    return (
        <div className={`bg-white p-3 reounded-lg text-sm flex ${className}`}>
            <div className='w-1-2'>
                <lable htmlFor="currency" className='text-black/40 mb-2 inline-block'>{lable}</lable>

                <input type='number' 
                id={id} className='outline-none w-full bg-transparent py-1.5' placeholder='Amount' disabled={amountDisabled} value={amount} onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}></input>
            </div>
            
            <div className='w-1/2 flex flex-wrap justify-end text-right'>
                <p className='"text-black/40 mb-2 w-full '>Currency Type</p>

                <select className='rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none' value={selectedCurrency} onChange={(e) => {onCurrencyChange && onCurrencyChange(e.target.value)}} disabled={currencyDisabled}>

                    {currencyOptions.map((currency) => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}

                </select>
            </div>
        </div>
    )
}
export default InputBox