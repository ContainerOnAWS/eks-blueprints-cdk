#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = __importStar(require("aws-cdk-lib"));
const ecr_stack_1 = require("../lib/ecr-stack");
const config_1 = require("../../config");
const app = new cdk.App();
const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
};
const stage = app.node.tryGetContext('stage') || config_1.DEFAULT_STAGE;
const repositoryName = 'eks-cdk';
new ecr_stack_1.EcrCodeCommitStack(app, `ecr-${repositoryName}`, {
    env,
    repositoryName,
    stage,
    description: `ECR: ${repositoryName}`,
    terminationProtection: stage !== config_1.DEFAULT_STAGE
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9lY3IvYmluL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxpREFBbUM7QUFDbkMsZ0RBQXNEO0FBQ3RELHlDQUE2QztBQUU3QyxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUMxQixNQUFNLEdBQUcsR0FBRztJQUNSLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQjtJQUN4QyxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0I7Q0FDekMsQ0FBQztBQUNGLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLHNCQUFhLENBQUM7QUFDL0QsTUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDO0FBRWpDLElBQUksOEJBQWtCLENBQUMsR0FBRyxFQUFFLE9BQU8sY0FBYyxFQUFFLEVBQUU7SUFDakQsR0FBRztJQUNILGNBQWM7SUFDZCxLQUFLO0lBQ0wsV0FBVyxFQUFFLFFBQVEsY0FBYyxFQUFFO0lBQ3JDLHFCQUFxQixFQUFFLEtBQUssS0FBRyxzQkFBYTtDQUMvQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXHJcbmltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XHJcbmltcG9ydCB7IEVjckNvZGVDb21taXRTdGFjayB9IGZyb20gJy4uL2xpYi9lY3Itc3RhY2snO1xyXG5pbXBvcnQgeyBERUZBVUxUX1NUQUdFIH0gZnJvbSAnLi4vLi4vY29uZmlnJztcclxuXHJcbmNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XHJcbmNvbnN0IGVudiA9IHtcclxuICAgIGFjY291bnQ6IHByb2Nlc3MuZW52LkNES19ERUZBVUxUX0FDQ09VTlQsXHJcbiAgICByZWdpb246IHByb2Nlc3MuZW52LkNES19ERUZBVUxUX1JFR0lPTlxyXG59O1xyXG5jb25zdCBzdGFnZSA9IGFwcC5ub2RlLnRyeUdldENvbnRleHQoJ3N0YWdlJykgfHwgREVGQVVMVF9TVEFHRTtcclxuY29uc3QgcmVwb3NpdG9yeU5hbWUgPSAnZWtzLWNkayc7XHJcblxyXG5uZXcgRWNyQ29kZUNvbW1pdFN0YWNrKGFwcCwgYGVjci0ke3JlcG9zaXRvcnlOYW1lfWAsIHtcclxuICAgIGVudixcclxuICAgIHJlcG9zaXRvcnlOYW1lLFxyXG4gICAgc3RhZ2UsXHJcbiAgICBkZXNjcmlwdGlvbjogYEVDUjogJHtyZXBvc2l0b3J5TmFtZX1gLFxyXG4gICAgdGVybWluYXRpb25Qcm90ZWN0aW9uOiBzdGFnZSE9PURFRkFVTFRfU1RBR0VcclxufSk7XHJcbiJdfQ==