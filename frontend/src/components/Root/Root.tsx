import React, { ReactNode } from 'react';

import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';

import Header from 'components/Header';
import { flattenMessages } from 'services/i18n/intl';
import enMessages from 'translations/en.json';
import frMessages from 'translations/fr.json';

import { PageContent, RootContainer } from './Root.style';
import Login from '../../pages/Login';

const locales = {
  fr: flattenMessages(frMessages),
  en: flattenMessages(enMessages),
};

addLocaleData([...fr, ...en]);

interface Props {
  children: ReactNode;
  isAuthenticated: boolean;
  isCommentLoading: boolean;
  isTagsOverTimeLoading: boolean;
  loadComments: () => void;
}

const Root: React.FunctionComponent<Props> = ({
  children,
  isAuthenticated,
  isCommentLoading,
  isTagsOverTimeLoading,
  loadComments,
}) => {
  return (
    <IntlProvider locale="fr" messages={locales.fr}>
      <RootContainer>
        {isAuthenticated && (
          <Header
            isFetchingData={isCommentLoading || isTagsOverTimeLoading}
            refreshData={loadComments}
          />
        )}
        <PageContent>{isAuthenticated ? children : <Login />}</PageContent>
      </RootContainer>
    </IntlProvider>
  );
};

export default Root;
