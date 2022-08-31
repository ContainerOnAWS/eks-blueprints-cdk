import * as cdk from 'aws-cdk-lib';

export const SSM_PREFIX = '/eks-cdk/blueprints';

export const CLUSTER_NAME = 'eks-blueprint';

export const DEFAULT_STAGE = 'dev';

export interface StackCommonProps extends cdk.StackProps {
    stage: string;
}