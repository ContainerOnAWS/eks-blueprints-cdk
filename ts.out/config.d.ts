import * as cdk from 'aws-cdk-lib';
export declare const SSM_PREFIX = "/eks-cdk/blueprints";
export declare const CLUSTER_NAME = "eks-blueprint";
export declare const DEFAULT_STAGE = "dev";
export interface StackCommonProps extends cdk.StackProps {
    stage: string;
}
