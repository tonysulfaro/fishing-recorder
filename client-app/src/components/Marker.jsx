import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  background-color: #ff0000;
  border: 2px solid #000;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${(props) => (props.onClick ? "pointer" : "default")};
  &:hover {
    z-index: 1;
  }
`;

const Popup = styled.span`
  visibility: show;
  width: 160px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 8px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -80px;
`;

const Marker = ({
  fishRecordId,
  fishType,
  lengthInches,
  date,
  waterTemp,
  onClick,
}) => {
  const [show, setshow] = useState(false);

  function showMarker() {
    setshow(!show);
  }

  console.log(waterTemp);

  return (
    <Wrapper alt={fishType} onClick={showMarker}>
      <Popup
        id={fishRecordId}
        style={{ visibility: show ? "visible" : "hidden" }}
      >
        <p>{fishType}</p>
        <p>{lengthInches}"</p>
        <p>{waterTemp}°F</p>
        <p>{new Date(date).toString()}</p>
      </Popup>
    </Wrapper>
  );
};

export default Marker;
