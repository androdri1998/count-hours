import React from 'react';

import colors from '../../utils/colors';

import { Container, ContainerHeader } from './styles';

const WrapperPagesComponent: React.FC = ({ children }) => {
  return (
    <Container>
      <ContainerHeader color={colors.light.header.title}>
        <h1 className="header-general__title">Count Hours</h1>
      </ContainerHeader>
      {children}
    </Container>
  );
};

export default WrapperPagesComponent;
