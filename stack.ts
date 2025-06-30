import { StackClientApp } from "@stackframe/react";

export const stackClientApp = new StackClientApp({
  projectId: process.env.VITE_STACK_PROJECT_ID!,
  publishableClientKey: process.env.VITE_STACK_PUBLISHABLE_CLIENT_KEY!,
  tokenStore: "memory", // Compatible Expo/React Native
  // redirectMethod n'est pas utilisé sur React Native/Expo
});
