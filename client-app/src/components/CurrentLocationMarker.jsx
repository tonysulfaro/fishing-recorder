import React from 'react'
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  background-color: #0000ff;
  border: 2px solid #000;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${(props) => (props.onClick ? "pointer" : "default")};
  &:hover {
    z-index: 1;
  }
`;

const CurrentLocationMarker = () => {
  return (
    <Wrapper></Wrapper>
  )
}

export default CurrentLocationMarker
