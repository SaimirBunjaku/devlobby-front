import React from "react";
import "./ContentModule.scss";
import ContentModuleChat from "./ContentModuleChat/ContentModuleChat";
import StatsComponent from "./ContentModuleChat/StatsComponent";
import ContentModuleBlog from "./ContentModuleBlog/ContentModuleBlog";
import ContentModuleAbout from "./ContentModuleAbout/ContentModuleAbout";
import ContentModuleContactUs from "./ContentModuleContactUs/ContentModuleContactUs";

const ContentModule = () => {
  return (
    <div>
      <ContentModuleChat />
      <StatsComponent />
      <ContentModuleBlog />
      <ContentModuleAbout />
      <ContentModuleContactUs />
    </div>
  );
};

export default ContentModule;
