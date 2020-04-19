import React, { Fragment } from 'react';

import { Section, Login } from '../../components';

export class Home extends React.Component {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <Fragment>
        <Section headerText={'Welcome!'} subText={'Please login with your spotify credentials to continue.'}>
          <Login></Login>
        </Section>
      </Fragment>
    );
  }
}
