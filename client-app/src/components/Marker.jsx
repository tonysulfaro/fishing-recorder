import React from "react";
import PropTypes from "prop-types";
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
  padding: 8px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -80px;
`;

const Marker = ({ fishType, lengthInches, date, onClick }) => (
  <Wrapper alt={fishType} onClick={onClick}>
    <Popup>
      <p>{fishType}</p>
      <p>{lengthInches}"</p>
      <p>{new Date(date).toString()}</p>
    </Popup>
  </Wrapper>
);

Marker.defaultProps = {
  onClick: function () {
    var popup = this;
    console.log(popup);
  },
};

export default Marker;
