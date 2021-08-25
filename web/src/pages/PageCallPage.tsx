import React, { FC, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { request } from '../helpers';
import qs from 'qs';

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

const PageCallPage: FC<RouteComponentProps<{ roomId: string }>> = ({
  match,
  location,
}) => {
  const [pagecallUrl, setPagecallUrl] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;
    const query = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    console.log(JSON.stringify(query));

    request
      .post<{ url: string }>(`/rooms/${match.params.roomId}`, {
        nickname: query.nickname,
      })
      .then(({ url }) => {
        if (isCancelled) return;
        setPagecallUrl(url);
      });

    return () => {
      isCancelled = true;
      setPagecallUrl(null);
    };
  }, [location.search, match.params.roomId]);

  if (pagecallUrl)
    return (
      <Iframe
        name="pagecall-room"
        frameBorder="0"
        width="100%"
        height="100%"
        src={pagecallUrl}
        allow="camera *;microphone *"
      />
    );
  else return <></>;
};

export default PageCallPage;
