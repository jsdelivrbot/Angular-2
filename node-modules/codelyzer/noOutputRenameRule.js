"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var sprintf_js_1 = require("sprintf-js");
var ngWalker_1 = require("./angular/ngWalker");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new OutputMetadataWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
    ruleName: 'no-output-rename-rule',
    type: 'maintainability',
    description: "Disallows renaming directive outputs by providing a string to the decorator.",
    descriptionDetails: "See more at https://angular.io/styleguide#!#05-13.",
    rationale: "Two names for the same property (one private, one public) is inherently confusing.",
    options: null,
    optionsDescription: "Not configurable.",
    typescriptOnly: true,
};
Rule.FAILURE_STRING = 'In the class "%s", the directive output ' +
    'property "%s" should not be renamed.' +
    'Please, consider the following use "@Output() %s = new EventEmitter();"';
exports.Rule = Rule;
var OutputMetadataWalker = (function (_super) {
    __extends(OutputMetadataWalker, _super);
    function OutputMetadataWalker() {
        return _super.apply(this, arguments) || this;
    }
    OutputMetadataWalker.prototype.visitNgOutput = function (property, output, args) {
        var className = property.parent.name.text;
        var memberName = property.name.text;
        if (args.length !== 0 && memberName !== args[0]) {
            var failureConfig = [className, memberName, memberName];
            failureConfig.unshift(Rule.FAILURE_STRING);
            this.addFailure(this.createFailure(property.getStart(), property.getWidth(), sprintf_js_1.sprintf.apply(this, failureConfig)));
        }
    };
    return OutputMetadataWalker;
}(ngWalker_1.NgWalker));
exports.OutputMetadataWalker = OutputMetadataWalker;
