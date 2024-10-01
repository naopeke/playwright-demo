import { test as myTest } from "@playwright/test";

type nao = {
    age: number,
    email: string
}

const myFixtureTest = myTest.extend<nao>({
    age: 22,
    email: "cayoso4147@skrak.com"
})

export const test = myFixtureTest;