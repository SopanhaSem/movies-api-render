import React from "react";
import LoadingStyle from "../css/loading.module.css";
export const LoadingComponents = () => {
  return (
    <section class={LoadingStyle.dots_container}>
      <div class={LoadingStyle.dot}></div>
      <div class={LoadingStyle.dot}></div>
      <div class={LoadingStyle.dot}></div>
      <div class={LoadingStyle.dot}></div>
      <div class={LoadingStyle.dot}></div>
    </section>
  );
};
