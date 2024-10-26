import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  if (!isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Sorry! An unexpected error occured.</h1>
        <p>{error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Sorry! {error.status}</h1>
      <p>{error.statusText}</p>
      {error.data && <p>{error.data.message}</p>}
    </div>
  );
}

export default ErrorPage;