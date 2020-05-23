var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var query_dsl_1 = require("../query_dsl");
var FieldContext_1 = require("./FieldContext");
var get = require('lodash/get');
var ChildrenFieldContext = /** @class */ (function (_super) {
    __extends(ChildrenFieldContext, _super);
    function ChildrenFieldContext(fieldOptions) {
        var _this = _super.call(this, fieldOptions) || this;
        if (!get(_this.fieldOptions, 'options.childType')) {
            throw new Error('fieldOptions type:children requires options.childType');
        }
        return _this;
    }
    ChildrenFieldContext.prototype.getAggregationPath = function () {
        return 'inner';
    };
    ChildrenFieldContext.prototype.wrapAggregations = function () {
        var aggregations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            aggregations[_i] = arguments[_i];
        }
        return [query_dsl_1.ChildrenBucket.apply(void 0, __spreadArrays(['inner', this.fieldOptions.options.childType], aggregations))];
    };
    ChildrenFieldContext.prototype.wrapFilter = function (filter) {
        return query_dsl_1.HasChildQuery(this.fieldOptions.options.childType, filter, this.fieldOptions.options);
    };
    return ChildrenFieldContext;
}(FieldContext_1.FieldContext));
exports.ChildrenFieldContext = ChildrenFieldContext;
//# sourceMappingURL=ChildrenFieldContext.js.map