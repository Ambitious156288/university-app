import { createGlobalStyle } from 'styled-components';
import backgroundImage from '../assets/backgroundImage.png';

const Background = createGlobalStyle`
    body{ 
        background: url(${backgroundImage}) center;
        background-attachment: fixed;
    }
`;

export default Background;
