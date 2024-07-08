import React from 'react';
import { IntlProvider,FormattedNumber } from 'react-intl';
const CurrencyFormatter =({value,currency})=>(
    <IntlProvider locale='en'>
        <FormattedNumber value={value} style='currency' currency={currency}/>
    </IntlProvider>
);
export default CurrencyFormatter