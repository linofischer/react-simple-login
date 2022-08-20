import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Login from "./Login";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "ReactComponentLibrary/Login",
    component: Login,
} as ComponentMeta<typeof Login>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Login> = (args) => <Login {...args} />;

export const Credentials = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Credentials.args = {
    credentials: {
        username: 'user',
        password: '1234',
        callback: console.log
    }
};

export const FormEvents = Template.bind({});
FormEvents.args = {
    formEvents: {
        onUsernameChange: console.log,
        onPasswordChange: console.log,
        onLoginTrigger: console.log
    }
};