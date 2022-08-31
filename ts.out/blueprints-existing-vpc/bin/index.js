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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = __importStar(require("aws-cdk-lib"));
const eks_blueprint_stack_1 = __importDefault(require("../lib/eks-blueprint-stack"));
const cluster_config_1 = require("../lib/cluster-config");
const app = new cdk.App();
const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
};
// deploy with eks-blueprint-{stage} such as eks-blueprint-local, eks-blueprint-dev, and eks-blueprint-stg
new eks_blueprint_stack_1.default(app, `${cluster_config_1.CLUSTER_NAME}`, { env });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9ibHVlcHJpbnRzLWV4aXN0aW5nLXZwYy9iaW4vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGlEQUFtQztBQUVuQyxxRkFBMkQ7QUFFM0QsMERBQXFEO0FBRXJELE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzFCLE1BQU0sR0FBRyxHQUFHO0lBQ1IsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CO0lBQ3hDLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQjtDQUN6QyxDQUFDO0FBRUYsMEdBQTBHO0FBQzFHLElBQUksNkJBQWlCLENBQUMsR0FBRyxFQUFFLEdBQUcsNkJBQVksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcbmltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5cbmltcG9ydCBFa3NCbHVlcHJpbnRTdGFjayBmcm9tICcuLi9saWIvZWtzLWJsdWVwcmludC1zdGFjayc7XG5cbmltcG9ydCB7IENMVVNURVJfTkFNRSB9IGZyb20gJy4uL2xpYi9jbHVzdGVyLWNvbmZpZyc7XG5cbmNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG5jb25zdCBlbnYgPSB7XG4gICAgYWNjb3VudDogcHJvY2Vzcy5lbnYuQ0RLX0RFRkFVTFRfQUNDT1VOVCxcbiAgICByZWdpb246IHByb2Nlc3MuZW52LkNES19ERUZBVUxUX1JFR0lPTlxufTtcblxuLy8gZGVwbG95IHdpdGggZWtzLWJsdWVwcmludC17c3RhZ2V9IHN1Y2ggYXMgZWtzLWJsdWVwcmludC1sb2NhbCwgZWtzLWJsdWVwcmludC1kZXYsIGFuZCBla3MtYmx1ZXByaW50LXN0Z1xubmV3IEVrc0JsdWVwcmludFN0YWNrKGFwcCwgYCR7Q0xVU1RFUl9OQU1FfWAsIHsgZW52IH0pO1xuXG4iXX0=