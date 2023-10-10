"use client";
import React from "react";
import clsx from "clsx";
import { motion, LayoutGroup } from "framer-motion";

import { range } from "@/utils";
import Card from "@/components/Card";
import SliderControl from "@/components/SliderControl";

import Equation from "./Equation";
import styles from "./DivisionGroupsDemo.module.css";

const SPRING_ANIMATION = {
    type: "string",
    damping: 500,
    stiffness: 50,
};

function DivisionGroupsDemo({
    numOfItems = 12,
    initialNumOfGroups = 1,
    includeRemainderArea,
}) {
    const [items, setItems] = React.useState(() => {
        return range(numOfItems).map((index) => ({
            id: crypto.randomUUID(),
            index,
        }));
    });

    const [remainder, setRemainder] = React.useState(() => {
        if (!includeRemainderArea) {
            return [];
        }
        const remaindedItems = items.length % initialNumOfGroups;
        return items.splice(items.length - remaindedItems, remaindedItems);
    });

    const [numOfGroups, setNumOfGroups] = React.useState(initialNumOfGroups);

    const numOfItemsPerGroup = Math.floor(items.length / numOfGroups);

    function proccessItems(value) {
        setNumOfGroups(value);

        if (!includeRemainderArea) {
            return;
        }

        const nextItems = [...items];
        const nextReminder = [...remainder];
        const remindedItems = nextItems.length % value;

        if (value > numOfGroups) {
            const poppedItems = nextItems.splice(
                nextItems.length - remindedItems,
                remindedItems
            );
            nextReminder.push(...poppedItems);
        } else if (value < numOfGroups) {
            const poppedReminderItems = nextReminder.splice(
                remindedItems,
                nextReminder.length - remindedItems
            );
            nextItems.push(...poppedReminderItems);
        }

        setItems(nextItems);
        setRemainder(nextReminder);
    }

    // When we're splitting into 1-3 groups, display side-by-side
    // columns. When we get to 4, it should switch to a 2x2 grid.
    const gridStructure =
        numOfGroups < 4
            ? {
                  gridTemplateColumns: `repeat(${numOfGroups}, 1fr)`,
              }
            : {
                  gridTemplateColumns: "1fr 1fr",
                  gridTemplateRows: "1fr 1fr",
              };

    return (
        <LayoutGroup>
            <Card as="section" className={styles.wrapper}>
                <header className={styles.header}>
                    <SliderControl
                        label="Number of Groups"
                        className={styles.slider}
                        step={1}
                        min={1}
                        max={4}
                        value={numOfGroups}
                        onChange={(ev) => {
                            proccessItems(Number(ev.target.value));
                        }}
                    />
                </header>

                <div className={styles.demoWrapper}>
                    <div
                        className={clsx(styles.demoArea)}
                        style={gridStructure}
                    >
                        {range(numOfGroups).map((groupIndex) => (
                            <div key={groupIndex} className={styles.group}>
                                {items
                                    .slice(
                                        groupIndex * numOfItemsPerGroup,
                                        groupIndex * numOfItemsPerGroup +
                                            numOfItemsPerGroup
                                    )
                                    .map((item) => {
                                        const layoutId = item.id;
                                        return (
                                            <motion.div
                                                className={styles.item}
                                                key={layoutId}
                                                layoutId={layoutId}
                                                transition={SPRING_ANIMATION}
                                            />
                                        );
                                    })}
                            </div>
                        ))}
                    </div>
                </div>

                {includeRemainderArea && (
                    <div className={styles.remainderArea}>
                        <p className={styles.remainderHeading}>
                            Remainder Area
                        </p>

                        {remainder.map((item) => {
                            const layoutId = item.id;
                            return (
                                <motion.div
                                    className={styles.item}
                                    key={layoutId}
                                    layoutId={layoutId}
                                    transition={SPRING_ANIMATION}
                                />
                            );
                        })}
                    </div>
                )}

                <Equation
                    dividend={numOfItems}
                    divisor={numOfGroups}
                    remainder={remainder.length}
                />
            </Card>
        </LayoutGroup>
    );
}

export default DivisionGroupsDemo;
