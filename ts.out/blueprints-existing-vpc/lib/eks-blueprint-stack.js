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
const aws_cdk_lib_1 = require("aws-cdk-lib");
const blueprints = __importStar(require("@aws-quickstart/eks-blueprints"));
const eks = __importStar(require("aws-cdk-lib/aws-eks"));
const ssm = __importStar(require("aws-cdk-lib/aws-ssm"));
const iam = __importStar(require("aws-cdk-lib/aws-iam"));
/**
 * https://github.com/aws-quickstart/cdk-eks-blueprints/issues/372
 *
 * AmazonSSMManagedInstanceCore role is added to connect to EC2 instances by using SSM on AWS web console
 */
class EksBlueprintStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        var _a;
        super(scope, id, props);
        const stage = this.node.tryGetContext('stage') || 'local';
        const vpcId = this.node.tryGetContext('vpcId') || ssm.StringParameter.valueFromLookup(this, '/cdk-eks-blueprints/vpc-id');
        const addOns = [
            new blueprints.addons.ClusterAutoScalerAddOn,
            new blueprints.addons.AwsLoadBalancerControllerAddOn,
            new blueprints.addons.MetricsServerAddOn,
            new blueprints.addons.ContainerInsightsAddOn,
            new blueprints.addons.VpcCniAddOn,
            new blueprints.addons.CoreDnsAddOn,
            new blueprints.addons.KubeProxyAddOn
        ];
        const clusterProvider = new blueprints.GenericClusterProvider({
            version: eks.KubernetesVersion.V1_21,
            managedNodeGroups: [{
                    id: "cpu",
                    minSize: 2,
                    maxSize: 10,
                    diskSize: 25,
                    // instanceTypes: [new ec2.InstanceType('c5.large')],
                    nodeGroupCapacityType: eks.CapacityType.SPOT,
                }]
        });
        const eksBlueprint = blueprints.EksBlueprint.builder()
            .addOns(...addOns)
            .resourceProvider(blueprints.GlobalResources.Vpc, new blueprints.VpcProvider(vpcId))
            .clusterProvider(clusterProvider)
            // .enableControlPlaneLogTypes('api')
            .build(this, stage, props);
        (_a = eksBlueprint.getClusterInfo().nodeGroups) === null || _a === void 0 ? void 0 : _a.forEach(n => {
            n.role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'));
        });
        new aws_cdk_lib_1.CfnOutput(this, 'ClusterName', { value: eksBlueprint.getClusterInfo().cluster.clusterName });
        new aws_cdk_lib_1.CfnOutput(this, 'ClusterArn', { value: eksBlueprint.getClusterInfo().cluster.clusterArn });
    }
}
exports.default = EksBlueprintStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWtzLWJsdWVwcmludC1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2JsdWVwcmludHMtZXhpc3RpbmctdnBjL2xpYi9la3MtYmx1ZXByaW50LXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUEyRDtBQUMzRCwyRUFBNkQ7QUFDN0QseURBQTJDO0FBRTNDLHlEQUEyQztBQUMzQyx5REFBMkM7QUFHM0M7Ozs7R0FJRztBQUNILE1BQXFCLGlCQUFrQixTQUFRLG1CQUFLO0lBQ2hELFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7O1FBQ3hELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE9BQU8sQ0FBQztRQUMxRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsNEJBQTRCLENBQUMsQ0FBQztRQUMxSCxNQUFNLE1BQU0sR0FBbUM7WUFDM0MsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLHNCQUFzQjtZQUM1QyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsOEJBQThCO1lBQ3BELElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0I7WUFDeEMsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLHNCQUFzQjtZQUM1QyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsV0FBVztZQUNqQyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsWUFBWTtZQUNsQyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsY0FBYztTQUN2QyxDQUFDO1FBQ0YsTUFBTSxlQUFlLEdBQUcsSUFBSSxVQUFVLENBQUMsc0JBQXNCLENBQUM7WUFDMUQsT0FBTyxFQUFFLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLO1lBQ3BDLGlCQUFpQixFQUFFLENBQUM7b0JBQ2hCLEVBQUUsRUFBRSxLQUFLO29CQUNULE9BQU8sRUFBRSxDQUFDO29CQUNWLE9BQU8sRUFBRSxFQUFFO29CQUNYLFFBQVEsRUFBRSxFQUFFO29CQUNaLHFEQUFxRDtvQkFDckQscUJBQXFCLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJO2lCQUMvQyxDQUFDO1NBQ0wsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUU7YUFDakQsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDO2FBQ2pCLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLElBQUksVUFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNuRixlQUFlLENBQUMsZUFBZSxDQUFDO1lBQ2pDLHFDQUFxQzthQUNwQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUUvQixNQUFBLFlBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxVQUFVLDBDQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNsRCxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsd0JBQXdCLENBQUMsOEJBQThCLENBQUMsQ0FBQyxDQUFDO1FBQ3hHLENBQUMsRUFBRTtRQUVILElBQUksdUJBQVMsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNqRyxJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZLENBQUMsY0FBYyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDbkcsQ0FBQztDQUNKO0FBeENELG9DQXdDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzLCBDZm5PdXRwdXQgfSBmcm9tICdhd3MtY2RrLWxpYic7XHJcbmltcG9ydCAqIGFzIGJsdWVwcmludHMgZnJvbSAnQGF3cy1xdWlja3N0YXJ0L2Vrcy1ibHVlcHJpbnRzJztcclxuaW1wb3J0ICogYXMgZWtzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1la3MnO1xyXG5pbXBvcnQgKiBhcyBlYzIgZnJvbSAnYXdzLWNkay1saWIvYXdzLWVjMic7XHJcbmltcG9ydCAqIGFzIHNzbSBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtc3NtJztcclxuaW1wb3J0ICogYXMgaWFtIGZyb20gJ2F3cy1jZGstbGliL2F3cy1pYW0nO1xyXG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcclxuXHJcbi8qKlxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYXdzLXF1aWNrc3RhcnQvY2RrLWVrcy1ibHVlcHJpbnRzL2lzc3Vlcy8zNzJcclxuICogXHJcbiAqIEFtYXpvblNTTU1hbmFnZWRJbnN0YW5jZUNvcmUgcm9sZSBpcyBhZGRlZCB0byBjb25uZWN0IHRvIEVDMiBpbnN0YW5jZXMgYnkgdXNpbmcgU1NNIG9uIEFXUyB3ZWIgY29uc29sZVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWtzQmx1ZXByaW50U3RhY2sgZXh0ZW5kcyBTdGFjayB7XHJcbiAgICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcclxuICAgICAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcclxuXHJcbiAgICAgICAgY29uc3Qgc3RhZ2UgPSB0aGlzLm5vZGUudHJ5R2V0Q29udGV4dCgnc3RhZ2UnKSB8fCAnbG9jYWwnO1xyXG4gICAgICAgIGNvbnN0IHZwY0lkID0gdGhpcy5ub2RlLnRyeUdldENvbnRleHQoJ3ZwY0lkJykgfHwgc3NtLlN0cmluZ1BhcmFtZXRlci52YWx1ZUZyb21Mb29rdXAodGhpcywgJy9jZGstZWtzLWJsdWVwcmludHMvdnBjLWlkJyk7XHJcbiAgICAgICAgY29uc3QgYWRkT25zOiBBcnJheTxibHVlcHJpbnRzLkNsdXN0ZXJBZGRPbj4gPSBbXHJcbiAgICAgICAgICAgIG5ldyBibHVlcHJpbnRzLmFkZG9ucy5DbHVzdGVyQXV0b1NjYWxlckFkZE9uLFxyXG4gICAgICAgICAgICBuZXcgYmx1ZXByaW50cy5hZGRvbnMuQXdzTG9hZEJhbGFuY2VyQ29udHJvbGxlckFkZE9uLFxyXG4gICAgICAgICAgICBuZXcgYmx1ZXByaW50cy5hZGRvbnMuTWV0cmljc1NlcnZlckFkZE9uLFxyXG4gICAgICAgICAgICBuZXcgYmx1ZXByaW50cy5hZGRvbnMuQ29udGFpbmVySW5zaWdodHNBZGRPbixcclxuICAgICAgICAgICAgbmV3IGJsdWVwcmludHMuYWRkb25zLlZwY0NuaUFkZE9uLFxyXG4gICAgICAgICAgICBuZXcgYmx1ZXByaW50cy5hZGRvbnMuQ29yZURuc0FkZE9uLFxyXG4gICAgICAgICAgICBuZXcgYmx1ZXByaW50cy5hZGRvbnMuS3ViZVByb3h5QWRkT25cclxuICAgICAgICBdO1xyXG4gICAgICAgIGNvbnN0IGNsdXN0ZXJQcm92aWRlciA9IG5ldyBibHVlcHJpbnRzLkdlbmVyaWNDbHVzdGVyUHJvdmlkZXIoe1xyXG4gICAgICAgICAgICB2ZXJzaW9uOiBla3MuS3ViZXJuZXRlc1ZlcnNpb24uVjFfMjEsXHJcbiAgICAgICAgICAgIG1hbmFnZWROb2RlR3JvdXBzOiBbe1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwiY3B1XCIsXHJcbiAgICAgICAgICAgICAgICBtaW5TaXplOiAyLFxyXG4gICAgICAgICAgICAgICAgbWF4U2l6ZTogMTAsXHJcbiAgICAgICAgICAgICAgICBkaXNrU2l6ZTogMjUsXHJcbiAgICAgICAgICAgICAgICAvLyBpbnN0YW5jZVR5cGVzOiBbbmV3IGVjMi5JbnN0YW5jZVR5cGUoJ2M1LmxhcmdlJyldLFxyXG4gICAgICAgICAgICAgICAgbm9kZUdyb3VwQ2FwYWNpdHlUeXBlOiBla3MuQ2FwYWNpdHlUeXBlLlNQT1QsXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgZWtzQmx1ZXByaW50ID0gYmx1ZXByaW50cy5Fa3NCbHVlcHJpbnQuYnVpbGRlcigpXHJcbiAgICAgICAgICAgIC5hZGRPbnMoLi4uYWRkT25zKVxyXG4gICAgICAgICAgICAucmVzb3VyY2VQcm92aWRlcihibHVlcHJpbnRzLkdsb2JhbFJlc291cmNlcy5WcGMsIG5ldyBibHVlcHJpbnRzLlZwY1Byb3ZpZGVyKHZwY0lkKSlcclxuICAgICAgICAgICAgLmNsdXN0ZXJQcm92aWRlcihjbHVzdGVyUHJvdmlkZXIpXHJcbiAgICAgICAgICAgIC8vIC5lbmFibGVDb250cm9sUGxhbmVMb2dUeXBlcygnYXBpJylcclxuICAgICAgICAgICAgLmJ1aWxkKHRoaXMsIHN0YWdlLCBwcm9wcyk7XHJcblxyXG4gICAgICAgIGVrc0JsdWVwcmludC5nZXRDbHVzdGVySW5mbygpLm5vZGVHcm91cHM/LmZvckVhY2gobiA9PiB7XHJcbiAgICAgICAgICAgIG4ucm9sZS5hZGRNYW5hZ2VkUG9saWN5KGlhbS5NYW5hZ2VkUG9saWN5LmZyb21Bd3NNYW5hZ2VkUG9saWN5TmFtZSgnQW1hem9uU1NNTWFuYWdlZEluc3RhbmNlQ29yZScpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbmV3IENmbk91dHB1dCh0aGlzLCAnQ2x1c3Rlck5hbWUnLCB7IHZhbHVlOiBla3NCbHVlcHJpbnQuZ2V0Q2x1c3RlckluZm8oKS5jbHVzdGVyLmNsdXN0ZXJOYW1lIH0pO1xyXG4gICAgICAgIG5ldyBDZm5PdXRwdXQodGhpcywgJ0NsdXN0ZXJBcm4nLCB7IHZhbHVlOiBla3NCbHVlcHJpbnQuZ2V0Q2x1c3RlckluZm8oKS5jbHVzdGVyLmNsdXN0ZXJBcm4gfSk7XHJcbiAgICB9XHJcbn0iXX0=