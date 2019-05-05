import styled from "styled-components";

const Image = styled.div<{ imageUrl: string }>`
  width: 200px;
  height: 200px;
  background-image: ${({ imageUrl }: { imageUrl: string }) => `url(${imageUrl})`};
  background-size: contain;
`;

export {
  Image
};
