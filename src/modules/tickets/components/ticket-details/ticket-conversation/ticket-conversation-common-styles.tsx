import styled from "styled-components";

export const Container = styled.div`
    height:100%; 
    background: ${() => {
        const dotBg = '#fafafa';
        const dotColor = '#c4c4c4';
        const dotSize = '2px';
        const dotSpace = '20px';
        return `
            linear-gradient(90deg, ${dotBg} calc(${dotSpace} - ${dotSize}), transparent 1%) center / ${dotSpace} ${dotSpace},
            linear-gradient(${dotBg} calc(${dotSpace} - ${dotSize}), transparent 1%) center / ${dotSpace} ${dotSpace},
            ${dotColor}
        `
    }};
`;