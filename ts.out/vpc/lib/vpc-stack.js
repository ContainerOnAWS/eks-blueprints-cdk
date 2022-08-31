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
exports.VpcStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const ec2 = __importStar(require("aws-cdk-lib/aws-ec2"));
const ssm = __importStar(require("aws-cdk-lib/aws-ssm"));
/**
 *
 */
class VpcStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const cidr = `10.100.0.0/16`;
        const vpc = new ec2.Vpc(this, 'Vpc', {
            maxAzs: 3,
            natGateways: 3,
            cidr,
            subnetConfiguration: [
                {
                    cidrMask: 20,
                    name: 'public',
                    subnetType: ec2.SubnetType.PUBLIC,
                },
                {
                    cidrMask: 20,
                    name: 'private',
                    subnetType: ec2.SubnetType.PRIVATE_WITH_NAT,
                }
            ]
        });
        const tagAllSubnets = (subnets, tagName, tagValue) => {
            for (const subnet of subnets) {
                aws_cdk_lib_1.Tags.of(subnet).add(tagName, tagValue);
            }
        };
        // To use the auto-discover subnets, kubernetes.io/role/elb, kubernetes.io/role/internal-elb tags should be set as 1
        tagAllSubnets(vpc.publicSubnets, 'kubernetes.io/role/elb', '1');
        tagAllSubnets(vpc.privateSubnets, 'kubernetes.io/role/internal-elb', '1');
        const parameter = new ssm.StringParameter(this, 'SSMVPCID', { parameterName: '/cdk-eks-blueprints/vpc-id', stringValue: vpc.vpcId });
        new aws_cdk_lib_1.CfnOutput(this, 'VPC', { value: vpc.vpcId });
        new aws_cdk_lib_1.CfnOutput(this, 'SSMParameter', { value: parameter.parameterName });
        new aws_cdk_lib_1.CfnOutput(this, 'SSMParameterValue', { value: vpc.vpcId });
        new aws_cdk_lib_1.CfnOutput(this, 'SSMURL', { value: `https://${this.region}.console.aws.amazon.com/systems-manager/parameters/` });
    }
}
exports.VpcStack = VpcStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnBjLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdnBjL2xpYi92cGMtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUFpRTtBQUdqRSx5REFBMkM7QUFDM0MseURBQTJDO0FBRTNDOztHQUVHO0FBQ0gsTUFBYSxRQUFTLFNBQVEsbUJBQUs7SUFDL0IsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUN4RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLElBQUksR0FBRyxlQUFlLENBQUM7UUFDN0IsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7WUFDakMsTUFBTSxFQUFFLENBQUM7WUFDVCxXQUFXLEVBQUUsQ0FBQztZQUNkLElBQUk7WUFDSixtQkFBbUIsRUFBRTtnQkFDakI7b0JBQ0ksUUFBUSxFQUFFLEVBQUU7b0JBQ1osSUFBSSxFQUFFLFFBQVE7b0JBQ2QsVUFBVSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTTtpQkFDcEM7Z0JBQ0Q7b0JBQ0ksUUFBUSxFQUFFLEVBQUU7b0JBQ1osSUFBSSxFQUFFLFNBQVM7b0JBQ2YsVUFBVSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCO2lCQUM5QzthQUNKO1NBQ0osQ0FBQyxDQUFDO1FBRUgsTUFBTSxhQUFhLEdBQUcsQ0FDbEIsT0FBc0IsRUFDdEIsT0FBZSxFQUNmLFFBQWdCLEVBQ2hCLEVBQUU7WUFDRixLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRTtnQkFDNUIsa0JBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUNqQixPQUFPLEVBQ1AsUUFBUSxDQUNULENBQUM7YUFDSDtRQUNMLENBQUMsQ0FBQztRQUNGLG9IQUFvSDtRQUNwSCxhQUFhLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSx3QkFBd0IsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNoRSxhQUFhLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxpQ0FBaUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUUxRSxNQUFNLFNBQVMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUFFLGFBQWEsRUFBRSw0QkFBNEIsRUFBRSxXQUFXLEVBQUUsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDckksSUFBSSx1QkFBUyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDakQsSUFBSSx1QkFBUyxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUUsRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFDeEUsSUFBSSx1QkFBUyxDQUFDLElBQUksRUFBRSxtQkFBbUIsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUMvRCxJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxXQUFXLElBQUksQ0FBQyxNQUFNLHFEQUFxRCxFQUFFLENBQUMsQ0FBQztJQUMxSCxDQUFDO0NBQ0o7QUE3Q0QsNEJBNkNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RhY2ssIFN0YWNrUHJvcHMsIENmbk91dHB1dCwgVGFncyB9IGZyb20gJ2F3cy1jZGstbGliJztcclxuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XHJcblxyXG5pbXBvcnQgKiBhcyBlYzIgZnJvbSAnYXdzLWNkay1saWIvYXdzLWVjMic7XHJcbmltcG9ydCAqIGFzIHNzbSBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtc3NtJztcclxuXHJcbi8qKlxyXG4gKiBcclxuICovXHJcbmV4cG9ydCBjbGFzcyBWcGNTdGFjayBleHRlbmRzIFN0YWNrIHtcclxuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGNpZHIgPSBgMTAuMTAwLjAuMC8xNmA7XHJcbiAgICAgICAgY29uc3QgdnBjID0gbmV3IGVjMi5WcGModGhpcywgJ1ZwYycsIHtcclxuICAgICAgICAgICAgbWF4QXpzOiAzLFxyXG4gICAgICAgICAgICBuYXRHYXRld2F5czogMyxcclxuICAgICAgICAgICAgY2lkcixcclxuICAgICAgICAgICAgc3VibmV0Q29uZmlndXJhdGlvbjogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNpZHJNYXNrOiAyMCxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAncHVibGljJyxcclxuICAgICAgICAgICAgICAgICAgICBzdWJuZXRUeXBlOiBlYzIuU3VibmV0VHlwZS5QVUJMSUMsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNpZHJNYXNrOiAyMCxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAncHJpdmF0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VibmV0VHlwZTogZWMyLlN1Ym5ldFR5cGUuUFJJVkFURV9XSVRIX05BVCxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCB0YWdBbGxTdWJuZXRzID0gKFxyXG4gICAgICAgICAgICBzdWJuZXRzOiBlYzIuSVN1Ym5ldFtdLFxyXG4gICAgICAgICAgICB0YWdOYW1lOiBzdHJpbmcsXHJcbiAgICAgICAgICAgIHRhZ1ZhbHVlOiBzdHJpbmcsXHJcbiAgICAgICAgICApID0+IHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBzdWJuZXQgb2Ygc3VibmV0cykge1xyXG4gICAgICAgICAgICAgIFRhZ3Mub2Yoc3VibmV0KS5hZGQoXHJcbiAgICAgICAgICAgICAgICB0YWdOYW1lLFxyXG4gICAgICAgICAgICAgICAgdGFnVmFsdWVcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBUbyB1c2UgdGhlIGF1dG8tZGlzY292ZXIgc3VibmV0cywga3ViZXJuZXRlcy5pby9yb2xlL2VsYiwga3ViZXJuZXRlcy5pby9yb2xlL2ludGVybmFsLWVsYiB0YWdzIHNob3VsZCBiZSBzZXQgYXMgMVxyXG4gICAgICAgIHRhZ0FsbFN1Ym5ldHModnBjLnB1YmxpY1N1Ym5ldHMsICdrdWJlcm5ldGVzLmlvL3JvbGUvZWxiJywgJzEnKTtcclxuICAgICAgICB0YWdBbGxTdWJuZXRzKHZwYy5wcml2YXRlU3VibmV0cywgJ2t1YmVybmV0ZXMuaW8vcm9sZS9pbnRlcm5hbC1lbGInLCAnMScpO1xyXG5cclxuICAgICAgICBjb25zdCBwYXJhbWV0ZXIgPSBuZXcgc3NtLlN0cmluZ1BhcmFtZXRlcih0aGlzLCAnU1NNVlBDSUQnLCB7IHBhcmFtZXRlck5hbWU6ICcvY2RrLWVrcy1ibHVlcHJpbnRzL3ZwYy1pZCcsIHN0cmluZ1ZhbHVlOiB2cGMudnBjSWQgfSk7XHJcbiAgICAgICAgbmV3IENmbk91dHB1dCh0aGlzLCAnVlBDJywgeyB2YWx1ZTogdnBjLnZwY0lkIH0pO1xyXG4gICAgICAgIG5ldyBDZm5PdXRwdXQodGhpcywgJ1NTTVBhcmFtZXRlcicsIHsgdmFsdWU6IHBhcmFtZXRlci5wYXJhbWV0ZXJOYW1lIH0pO1xyXG4gICAgICAgIG5ldyBDZm5PdXRwdXQodGhpcywgJ1NTTVBhcmFtZXRlclZhbHVlJywgeyB2YWx1ZTogdnBjLnZwY0lkIH0pO1xyXG4gICAgICAgIG5ldyBDZm5PdXRwdXQodGhpcywgJ1NTTVVSTCcsIHsgdmFsdWU6IGBodHRwczovLyR7dGhpcy5yZWdpb259LmNvbnNvbGUuYXdzLmFtYXpvbi5jb20vc3lzdGVtcy1tYW5hZ2VyL3BhcmFtZXRlcnMvYCB9KTtcclxuICAgIH1cclxufSJdfQ==