import React from 'react';
import { Helmet } from 'react-helmet-async';

const Snippet = ({ pageName }) => {
  return (
    <Helmet>
      <title>{`Jobkler | ${pageName}`}</title>
    </Helmet>
  );
};

export default Snippet;