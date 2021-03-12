import styled, { keyframes } from "styled-components";

const slideInTopStraight = keyframes`
  0% {
    -webkit-transform: translateY(-100vh);
          transform: translateY(-100vh);
  opacity: 0;
}
100% {
  -webkit-transform: translateY(0);
          transform: translateY(0);
  opacity: 1;
}
  }
`;

const slideInTopRight = keyframes`
0% {
  -webkit-transform: translateY(90vh) rotate(-90deg) scale(0.1);
          transform: translateY(90vh) rotate(-90deg) scale(0.1);
  opacity: 0;
}
50% {
  -webkit-transform: scale(0.5) rotate(-10deg);
          transform: scale(0.5) rotate(-10deg);
  opacity: 0.25;
}
80% {
  -webkit-transform: scale(1.1) rotate(5deg);
          transform: scale(1.1) rotate(5deg);
}
100% {
  -webkit-transform: translateY(0) rotate(0deg) scale(1);
          transform: translateY(0) rotate(0deg) scale(1);
  opacity: 1;
}
`;

export const pulse = keyframes`
  0% {
    opacity: 0.4
  }
  50% {
    opacity: 0.8
    
  }
  100% {
    opacity: 0.4
  }
`;

const fadeOut = keyframes`
  0% {
    opacity:1;
  }
  100% {
    opacity:0;
  }
`;

const DARKEN = `rgba(0, 0, 0, 0.1)`;

export const CardBorders = styled.div`
  box-sizing: border-box;
  background-color: ${(props) => props.theme.background};
  width: ${(props) => (props.windowwidth < 600 ? "95vw" : `33vw`)};
  height: 100%;
  max-height: 75vh;
  overflow-x: hidden;
  margin: 0.5rem;
  padding: 0.5rem;
  border: 1px solid gray;
  border-radius: 0.3rem;
  color: lightgray;
`;

export const DeckHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-width: 100%;
`;

export const CardInput = styled.input`
  background-color: ${(props) => props.theme.bright};
  color: lightgray;
  padding: 0.25em 0.15em 0.5em 0.25em;
  font-size: 1.25em;
  border: none;
`;

export const CardTextArea = styled.textarea`
  background-color: ${(props) => props.theme.bright};
  color: lightgray;
  padding: 0.25em 0.15em 0.5em 0.25em;
  border: none;
`;

export const CardSelect = styled.select`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  text-justify: center;
  text-align: center;
  font-size: 1em;
  border-radius: 3px;
  color: ${(props) => props.theme.main};
  border: 2px solid ${(props) => props.theme.main};
  background-color: ${(props) => props.theme.background};

  &:hover {
    background-color: ${DARKEN};
    box-shadow: 0 0 0 2px rgb(150, 240, 220);
    color: lightgray;
    cursor: pointer;
  }

  &:focus {
    color: lightgray;
    box-shadow: 0 0 0 1px rgb(0, 200, 50);
  }

  &:active {
    color: lightgray;
    box-shadow: 0 0 0 1px rgb(0, 200, 50);
  }
`;

export const CardOption = styled.option`
  background-color: rgba(50, 150, 255, 0.2);
  color: rgba(0, 0, 255, 1);
  &:hover {
    background-color: ${(props) => props.theme.background};
    box-shadow: 0 0 0 2px rgb(150, 240, 220);
    color: lightgray;
    cursor: pointer;
  }
`;

export const Card = styled.div`
  -webkit-animation: ${slideInTopStraight} 1s
    cubic-bezier(0.075, 0.82, 0.165, 1) both;
  animation: ${slideInTopStraight} 1s cubic-bezier(0.075, 0.82, 0.165, 1) both;
  margin: 0.25em;
  border-radius: 0.3em;
  flex: 1 1 auto;
  min-width: 300px;
  /* max-width: 500px; */
  width: 100%;
  align-self: center;
  justify-self: center;
  align-items: center;
  justify-items: center;
  align-content: center;
  justify-content: center;
`;

export const SmallCard = styled(Card)`
  width: 10rem;
  /* max-width: 35rem; */
  overflow-x: hidden;
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.25em;
`;

export const CardBodyTitle = styled.div`
  font-weight: bold;
  color: lightgray;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 0.25em;
`;

export const CardName = styled.div`
  font-size: 1.75em;
`;

export const CardTrigger = styled.i`
  color: lightgray;
  padding: 0.5em;
  margin-top: -0.25em;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

export const DeckContainer = styled.div`
  width: 100%;
  /* display: flex; */
  flex-wrap: wrap;
  /* flex-direction: column; */
  align-items: flex-start;
  justify-items: center;
  align-content: flex-start;
  justify-content: center;
`;

export const MultiLineText = styled.text`
  display: flex;
`;

export const SlideDown = styled.div`
  -webkit-animation: ${slideInTopStraight} 1s
    cubic-bezier(0.075, 0.82, 0.165, 1) both;
  animation: ${slideInTopStraight} 1s cubic-bezier(0.075, 0.82, 0.165, 1) both;
`;

export const Button = styled.button`
  -webkit-animation: ${slideInTopStraight} 1s
    cubic-bezier(0.075, 0.82, 0.165, 1) both;
  animation: ${slideInTopStraight} 1s cubic-bezier(0.075, 0.82, 0.165, 1) both;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  text-justify: center;
  text-align: center;
  font-size: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;

  /* Color the border and text with theme.main */
  color: ${(props) => props.theme.main};
  border: 1px solid rgba(23, 51, 78, 1);
  background-color: ${(props) => props.theme.bright};

  &:hover {
    background-color: ${(props) => props.theme.background};
    box-shadow: 0 0 0 2px ${(props) => props.theme.shadow};
    color: lightgray;
    cursor: pointer;
  }

  &:focus {
    color: lightgray;
    box-shadow: 0 0 0 1px rgb(0, 200, 50);
  }

  &:active {
    color: lightgray;
    box-shadow: 0 0 0 1px rgb(0, 200, 50);
  }
`;

export const SmallButton = styled(Button)`
  padding: 0.15rem;
  width: 100%;
  height: auto;
  font-size: 0.9rem;
  overflow: hidden;
`;

export const RollButton = styled(Button)`
  background-color: ${(props) => props.theme.shade};
  border: 2px solid ${(props) => props.theme.main};
  border-radius: 5px;
  font-weight: bold;
  background-color: ${(props) => props.theme.background};
`;

export const Toolbar = styled.div`
  padding: 0.2rem;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;

  /* pointer-events: none; */
`;

export const ToolbarBG = styled.div`
  background-color: midnightblue;
  width: 100%;
  height: 40%;
  position: absolute;
  bottom: 0;
  z-index: -1;
  box-sizing: border-box;
`;

export const ToolbarOption = styled.div`
  box-sizing: border-box;
  pointer-events: auto;
  cursor: pointer;
  border-radius: 50%;
  border-top: ${(props) =>
    props.currentselection ? `1px solid powderblue` : "1px solid gray"};
  padding: 0.5rem;
  background-color: ${(props) =>
    props.currentselection ? "rgb(50, 50, 150)" : "black"};
  height: 3rem;
  width: 3rem;
  &:focus {
    background-color: rgb(0, 0, 10);
    box-shadow: none;
    border: none;
    outline: none;
    border-radius: 50%;
    border-top: 1px solid white;
  }

  &:active {
    background-color: rgb(0, 0, 10);
    box-shadow: none;
    border: none;
    outline: none;
    border-radius: 50%;
    border-top: 1px solid white;
  }

  &:hover {
    background-color: rgb(50, 50, 150);
    border: none;
    outline: none;
    border-radius: 50%;
    border-top: 1px solid powderblue;
  }
`;

export const ToolbarMargin = styled.div`
  min-height: 3rem;
  min-width: 0.1rem;
  padding-top: 3rem;
`;

export const SmallIcon = styled.div`
  border: 4px solid midnightblue;
  border-radius: 50%;
  width: 2.5rem;
  min-width: 2.5rem;
  height: 2.5rem;
  min-height: 2.5rem;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
  }
`;

export const ConnectionsHeader = styled(CardHeader)`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${(props) => props.theme.background};
`;

export const BackgroundWrapper = styled.div`
  z-index: 0;
  position: fixed;
  left: 0;
  top: 0;
  background: black;
  overflow: hidden;
  min-height: 100vh;
  max-height: 100vh;
  min-width: 100vw;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  animation: ${pulse};
  input {
    margin: 1rem;
    font-size: 1.5rem;
    text-align: center;
    border-radius: 5px;
    background-color: rgba(125, 0, 245, 0.6);
    color: black;
  }
`;
