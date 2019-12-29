import React, { ReactNode, useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';

import Header from 'components/Header';
import { flattenMessages } from 'services/i18n/intl';
import enMessages from 'translations/en.json';
import frMessages from 'translations/fr.json';

import { PageContent, RootContainer } from './Root.style';

const locales = {
  fr: flattenMessages(frMessages),
  en: flattenMessages(enMessages),
};

const cookies = new Cookies();

addLocaleData([...fr, ...en]);

interface Props {
  children: ReactNode;
}

const Root: React.FunctionComponent<Props> = ({ children }) => {
  const [isAuthentified, setIsAuthentified] = useState(!!cookies.get('is_authentified'));
  useEffect(() => {
    const componentDidMount = async () => {
      setIsAuthentified(!!cookies.get('is_authentified'));
    };
    componentDidMount();
  }, []);
  return (
    <IntlProvider locale="fr" messages={locales.fr}>
      <RootContainer>
        {isAuthentified && <Header />}
        <PageContent>{children}</PageContent>
      </RootContainer>
    </IntlProvider>
  );
};

export default Root;
