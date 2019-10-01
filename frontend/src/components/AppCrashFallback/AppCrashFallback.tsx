import * as Sentry from '@sentry/browser';
import React from 'react';

import { Button, Container, HelperList, PageContent, Title } from './AppCrashFallback.style';

/**
 * Error page inspiration https://medium.com/design-ideas-thoughts/designing-error-pages-8d82e16e3472
 */

export interface IFallbackProps {
  eventId: string;
}

const reportDialog = (eventId: string) => () => Sentry.showReportDialog({ eventId });

const AppCrashFallback: React.FunctionComponent<IFallbackProps> = ({ eventId }) => {
  return (
    <main>
      {/* The <main> tag needs to wrap this component because with redux errors,
      style is not applied to the root tag of this component */}
      <Container>
        <PageContent>
          <Title>Sorry, this is not working properly.</Title>
          <br />
          <p>We know about this issue and are working to fix it.</p>
          <br />
          <p>In the meantime, here is what you can do:</p>
          <HelperList>
            <li>Refresh the page (sometimes it helps).</li>
            <li>Try again in 30 minutes.</li>
            <li>
              <Button onClick={reportDialog(eventId)}>Tell us what happened</Button>
            </li>
          </HelperList>
        </PageContent>
      </Container>
    </main>
  );
};

export default AppCrashFallback;
