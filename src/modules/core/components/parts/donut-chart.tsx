import { memo } from 'react';
import styled from 'styled-components';

export interface DonutSlice {
    id: number;
    percent: number;
    color: string;
    label?: string;
    onClickCb?: () => void;
}

interface DonutSliceWithCommands extends DonutSlice {
    offset: number;
    commands: string;
}

const SVG = styled.svg`
    overflow: visible;
    transform-origin: center;
    width: 100%;
    max-width: 300px;
    aspect-ratio: 1 / 1;
    cursor: pointer;

    path {
        transform-origin: center;
        opacity: 0.7;
    }
    path:hover {
        opacity: 1;
    }
`;
class CalculusHelper {
    getSlicesWithCommandsAndOffsets(
        donutSlices: DonutSlice[],
        radius: number,
        svgSize: number,
        borderSize: number
    ): DonutSliceWithCommands[] {
        let previousPercent = 0;
        return donutSlices.map((slice) => {
            const sliceWithCommands: DonutSliceWithCommands = {
                ...slice,
                commands: this.getSliceCommands(slice, radius, svgSize, borderSize),
                offset: previousPercent * 3.6 * -1,
            };
            previousPercent += slice.percent;
            return sliceWithCommands;
        });
    }

    getSliceCommands(
        donutSlice: DonutSlice,
        radius: number,
        svgSize: number,
        borderSize: number
    ): string {
        const degrees = this.percentToDegrees(donutSlice.percent);
        const longPathFlag = degrees > 180 ? 1 : 0;
        const innerRadius = radius - borderSize;

        const commands: string[] = [];
        commands.push(`M ${svgSize / 2 + radius} ${svgSize / 2}`);
        commands.push(
            `A ${radius} ${radius} 0 ${longPathFlag} 0 ${this.getCoordFromDegrees(
                degrees,
                radius,
                svgSize
            )}`
        );
        commands.push(
            `L ${this.getCoordFromDegrees(degrees, innerRadius, svgSize)}`
        );
        commands.push(
            `A ${innerRadius} ${innerRadius} 0 ${longPathFlag} 1 ${svgSize / 2 + innerRadius
            } ${svgSize / 2}`
        );
        return commands.join(' ');
    }

    getCoordFromDegrees(angle: number, radius: number, svgSize: number): string {
        const x = Math.cos((angle * Math.PI) / 180);
        const y = Math.sin((angle * Math.PI) / 180);
        const coordX = x * radius + svgSize / 2;
        const coordY = y * -radius + svgSize / 2;
        return [coordX, coordY].join(' ');
    }

    percentToDegrees(percent: number): number {
        return percent * 3.6;
    }
}

export const DonutChart = memo(({
    data,
    radius,
    viewBox,
    borderSize,
    clickCb,
}: {
    data: DonutSlice[];
    radius: number;
    viewBox: number;
    borderSize: number;
    clickCb?: (slice: DonutSlice) => void;
}) => {
    const helper = new CalculusHelper();
    return (
        data && (
            <SVG viewBox={'0 0 ' + viewBox + ' ' + viewBox}>
                {helper
                    .getSlicesWithCommandsAndOffsets(data, radius, viewBox, borderSize)
                    .map((slice, idx) => (
                        <path
                            key={idx}
                            onClick={() => clickCb && clickCb(slice)}
                            fill={slice.color}
                            d={slice.commands}
                            transform={'rotate(' + slice.offset + ')'}
                        >
                            <title>{slice.label}</title>
                        </path>
                    ))}
            </SVG>
        )
    );
})
