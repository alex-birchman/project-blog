import React from "react";
import { cookies } from "next/headers";
import { Work_Sans, Spline_Sans_Mono } from "next/font/google";
import clsx from "clsx";

import {
    LIGHT_TOKENS,
    DARK_TOKENS,
    BLOG_TITLE,
    BLOG_DESCRIPTION,
} from "@/constants";

import RespectMotionPreferences from "@/components/RespectMotionPreferences";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./styles.css";

const mainFont = Work_Sans({
    subsets: ["latin"],
    display: "fallback",
    weight: "variable",
    variable: "--font-family",
});
const monoFont = Spline_Sans_Mono({
    subsets: ["latin"],
    display: "fallback",
    weight: "variable",
    variable: "--font-family-mono",
});

export const metadata = {
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
};

function RootLayout({ children }) {
    const savedTheme = cookies().get("color-theme");
    const theme = savedTheme?.value || "light";
    const themeColor = theme === "light" ? LIGHT_TOKENS : DARK_TOKENS;

    return (
        <RespectMotionPreferences>
            <html
                lang="en"
                className={clsx(mainFont.variable, monoFont.variable)}
                data-color-theme={theme}
                style={themeColor}
            >
                <body>
                    <Header theme={theme} />
                    <main>{children}</main>
                    <Footer />
                </body>
            </html>
        </RespectMotionPreferences>
    );
}

export default RootLayout;
