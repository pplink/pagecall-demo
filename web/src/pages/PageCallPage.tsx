import React, { FC } from 'react';
import styled from 'styled-components';

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  margin: 0px;
  border: 0px;
  padding: 0px;
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 9999999;
`;

const PageCallPage: FC = () => {
  const url = localStorage.getItem('pagecall_url');

  if (url)
    return (
      <Iframe
        name="pagecall-room"
        frameBorder="0"
        width="100%"
        height="100%"
        src={url}
        allow="camera *;microphone *"
      />
    );
  else return <></>;
};

export default PageCallPage;
