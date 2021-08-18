import styled from 'styled-components';

const bgContainer = '#e6e6e6';
const bgContainerFill = 'linear-gradient(to right, color[0], color[0])';

const borderRadius = "6px";
const progressbarHeight = '6px';
const color = "#453F3F";


export const Container = styled.div`
    flex: 0 1 200px;
    max-width: 100%;
    padding: 20px;
    font-size: 13px;
    text-align: center;
    color: ${ color };

    @media (min-width: 992px) {
        padding: 0;
    }
`;

export const Progressbar = styled.div`
    width: 100%;
    height: ${ progressbarHeight };
    margin: 20px 0;
    border-radius: ${ borderRadius };
    background: ${ bgContainer };
`;

export const ProgressbarFill = styled.div`
    position: relative;
    display: block;
    width: ${ (props) => props.width };
    height: 100%;
    border-radius: ${ borderRadius };
    background: ${ bgContainerFill };

    .icon {
        position: absolute;
        top: 50%;
        right: -8px;
        width: 17px;
        height: 19px;
        transform: translateY(-50%);
    }
`;

export const Label = styled.span``;

export const LabelPrice = styled.span`
    font-weight: 700;
    color: color[0];
`;

export const LabelDescription = styled.strong`
    display: block;
    font-size: 15px;
    font-weight: 600;
    color: color[0];
`;