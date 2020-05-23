import * as React from 'react';
const compact = require('lodash/compact');
const mixClasses = (...classes) => compact(classes).join(' ');
export const LayoutBuilder = (className) => (props) => (React.createElement("div", { className: mixClasses(className, props.className) }, props.children));
export const LayoutBody = LayoutBuilder('sk-layout__body');
export const LayoutResults = LayoutBuilder('sk-layout__results sk-results-list');
export const ActionBar = LayoutBuilder('sk-results-list__action-bar sk-action-bar');
export const ActionBarRow = LayoutBuilder('sk-action-bar-row');
export const SideBar = LayoutBuilder('sk-layout__filters');
export const TopBar = (props) => (React.createElement("div", { className: mixClasses('sk-layout__top-bar sk-top-bar', props.className) },
    React.createElement("div", { className: "sk-top-bar__content" }, props.children)));
export const Layout = (props) => {
    const sizeClass = props.size ? 'sk-layout__size-' + props.size : null;
    return React.createElement("div", { className: mixClasses('sk-layout', props.className, sizeClass) }, props.children);
};
//# sourceMappingURL=Layout.js.map