"use client";

import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw } from "react-feather";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";

const COLORS = [
    { label: "red", value: "hsl(348deg 100% 60%)" },
    { label: "yellow", value: "hsl(50deg 100% 55%)" },
    { label: "blue", value: "hsl(235deg 100% 65%)" },
];

const SPRING_ANIMATION = {
    type: "string",
    damping: 600,
    stiffness: 80,
};

function getColor({ timeElapsed }) {
    const colorIndex = timeElapsed % COLORS.length;

    return COLORS[colorIndex];
}

function CircularColorsDemo({ initialValue = 0 }) {
    const [timeElapsed, setTimeElapsed] = React.useState(initialValue);
    const [isEnabled, setIsEnabled] = React.useState(false);

    const selectedColor = getColor({ timeElapsed });

    React.useEffect(() => {
        if (!isEnabled) {
            return;
        }
        const intervalId = window.setInterval(() => {
            setTimeElapsed((currentValue) => currentValue + 1);
        }, 1000);
        return () => {
            window.clearInterval(intervalId);
        };
    }, [isEnabled]);

    return (
        <Card as="section" className={styles.wrapper}>
            <ul className={styles.colorsWrapper}>
                {COLORS.map((color, index) => {
                    const isSelected = color.value === selectedColor.value;

                    return (
                        <li className={styles.color} key={index}>
                            {isSelected && (
                                <motion.div
                                    className={styles.selectedColorOutline}
                                    layoutId="colored-block"
                                    transition={SPRING_ANIMATION}
                                />
                            )}
                            <div
                                className={clsx(
                                    styles.colorBox,
                                    isSelected && styles.selectedColorBox
                                )}
                                style={{
                                    backgroundColor: color.value,
                                }}
                            >
                                <VisuallyHidden>{color.label}</VisuallyHidden>
                            </div>
                        </li>
                    );
                })}
            </ul>

            <div className={styles.timeWrapper}>
                <dl className={styles.timeDisplay}>
                    <dt>Time Elapsed</dt>
                    <dd>{timeElapsed}</dd>
                </dl>
                <div className={styles.actions}>
                    <button
                        onClick={() => {
                            setIsEnabled(!isEnabled);
                        }}
                    >
                        {isEnabled ? <Pause /> : <Play />}
                        <VisuallyHidden>
                            {isEnabled ? "Pause" : "Play"}
                        </VisuallyHidden>
                    </button>
                    <button
                        onClick={() => {
                            setTimeElapsed(initialValue);
                        }}
                    >
                        <RotateCcw />
                        <VisuallyHidden>Reset</VisuallyHidden>
                    </button>
                </div>
            </div>
        </Card>
    );
}

export default CircularColorsDemo;
