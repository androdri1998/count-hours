/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px;

  background-color: #fafcfb;
`;

interface IPropsContainerHeader {
  color: string;
}

export const ContainerHeader = styled.header<IPropsContainerHeader>`
  display: flex;
  align-items: center;

  padding: 30px 20px;

  .header-general__title {
    font-weight: 700;
    color: ${props => props.color};
  }

  .header-general__nav {
    flex: 1;
    display: flex;
    margin-left: 30px;

    align-items: center;
    justify-content: flex-end;

    padding: 10px;
  }
`;

interface IPropsItemNav {
  color: string;
}

export const ItemNav = styled(Link)<IPropsItemNav>`
  margin-left: 10px;

  font-size: 1.2em;
  font-weight: 400;
  cursor: pointer;
  color: ${props => props.color};
  text-decoration: none;
`;
