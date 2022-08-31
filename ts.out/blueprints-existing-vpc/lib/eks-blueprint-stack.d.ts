import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
/**
 * https://github.com/aws-quickstart/cdk-eks-blueprints/issues/372
 *
 * AmazonSSMManagedInstanceCore role is added to connect to EC2 instances by using SSM on AWS web console
 */
export default class EksBlueprintStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps);
}
