/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  .checkpoints-list__title {
    font-size: 1.4em;
    font-weight: 300;
    color: #555756;
    margin: 20px 0;
    text-align: center;
  }

  height: 100%;
  padding: 10px;
`;

export const ContainerInputs = styled.section`
  width: 100%;
  display: flex;

  justify-content: center;
  align-items: center;
`;

interface IInputDateProps {
  width?: number;
}

export const Input = styled.input<IInputDateProps>`
  padding: 10px;
  margin-right: 10px;
  height: 50px;
  width: ${props => `${props.width}px` || 'auto'};

  border-radius: 10px;
  font-size: 1.2em;
  border: 2px solid #ccc;
  text-align: center;
`;

export const Select = styled.select`
  padding: 10px;
  margin-right: 10px;
  height: 50px;

  border-radius: 10px;
  font-size: 1.2em;
  border: 2px solid #ccc;
`;

export const AddButton = styled.button`
  padding: 10px;
  height: 50px;

  border-radius: 10px;
  font-size: 1.2em;
  color: #fff;
  border: none;
  background-color: #5f00ad;

  &:hover {
    transition: 0.6s;
    background-color: #43007a;
  }
`;

export const ContainerFilters = styled.section`
  display: flex;
  align-items: center;
`;
