import * as React from 'react';
import { renderComponent } from './RenderComponent';
export class NormalClickComponent extends React.PureComponent {
    render() {
        const children = this.props.children;
        return React.cloneElement(children, {
            onClick: this.props.handler
        });
    }
}
export class FastClickComponent extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.threshold = 20;
    }
    handleMouseDown(event) {
        if (this.supportsTouch)
            return;
        if (event.button === 0) {
            this.props.handler();
        }
    }
    cleanupTouch() {
        delete this.startPoint;
    }
    getSinglePoint(event) {
        const touches = event.changedTouches;
        if (touches.length === 1) {
            return {
                x: touches[0].pageX,
                y: touches[0].pageY
            };
        }
        return null;
    }
    handleTouchStart(event) {
        this.supportsTouch = true;
        this.startPoint = this.getSinglePoint(event);
    }
    pointsWithinThreshold(p1, p2) {
        return Math.abs(p1.x - p2.x) < this.threshold && Math.abs(p1.y - p2.y) < this.threshold;
    }
    handleTouchEnd(event) {
        if (this.startPoint) {
            const endPoint = this.getSinglePoint(event);
            if (this.pointsWithinThreshold(this.startPoint, endPoint)) {
                this.props.handler();
            }
            this.cleanupTouch();
        }
    }
    handleClick(event) {
        event.preventDefault();
    }
    render() {
        const children = this.props.children;
        return React.cloneElement(children, {
            onMouseDown: this.handleMouseDown.bind(this),
            onTouchStart: this.handleTouchStart.bind(this),
            onTouchEnd: this.handleTouchEnd.bind(this),
            onClick: this.handleClick.bind(this)
        });
    }
}
export class FastClick extends React.Component {
    render() {
        return renderComponent(FastClick.component, this.props, this.props.children);
    }
}
FastClick.component = NormalClickComponent;
//# sourceMappingURL=FastClick.js.map