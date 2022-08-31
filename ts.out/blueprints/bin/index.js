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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = __importStar(require("aws-cdk-lib"));
const ec2 = __importStar(require("aws-cdk-lib/aws-ec2"));
const iam = __importStar(require("aws-cdk-lib/aws-iam"));
const eks = __importStar(require("aws-cdk-lib/aws-eks"));
const blueprints = __importStar(require("@aws-quickstart/eks-blueprints"));
const cluster_config_1 = require("../lib/cluster-config");
const app = new cdk.App();
const stage = app.node.tryGetContext('stage') || 'dev';
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
            instanceTypes: [new ec2.InstanceType('c5.large')],
            nodeGroupCapacityType: eks.CapacityType.SPOT,
        }]
});
const eksBlueprint = blueprints.EksBlueprint.builder()
    .addOns(...addOns)
    .clusterProvider(clusterProvider)
    .enableControlPlaneLogTypes('api')
    .build(app, `${cluster_config_1.CLUSTER_NAME}-${stage}`);
(_a = eksBlueprint.getClusterInfo().nodeGroups) === null || _a === void 0 ? void 0 : _a.forEach(n => {
    n.role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9ibHVlcHJpbnRzL2Jpbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQW1DO0FBQ25DLHlEQUEyQztBQUMzQyx5REFBMkM7QUFDM0MseURBQTJDO0FBQzNDLDJFQUE2RDtBQUU3RCwwREFBcUQ7QUFFckQsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDMUIsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxDQUFDO0FBRXZELE1BQU0sTUFBTSxHQUFtQztJQUMzQyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsc0JBQXNCO0lBQzVDLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyw4QkFBOEI7SUFDcEQsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLGtCQUFrQjtJQUN4QyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsc0JBQXNCO0lBQzVDLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxXQUFXO0lBQ2pDLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxZQUFZO0lBQ2xDLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxjQUFjO0NBQ3ZDLENBQUM7QUFDRixNQUFNLGVBQWUsR0FBRyxJQUFJLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQztJQUMxRCxPQUFPLEVBQUUsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEtBQUs7SUFDcEMsaUJBQWlCLEVBQUUsQ0FBQztZQUNoQixFQUFFLEVBQUUsS0FBSztZQUNULE9BQU8sRUFBRSxDQUFDO1lBQ1YsT0FBTyxFQUFFLEVBQUU7WUFDWCxhQUFhLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDakQscUJBQXFCLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJO1NBQy9DLENBQUM7Q0FDTCxDQUFDLENBQUM7QUFDSCxNQUFNLFlBQVksR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRTtLQUNqRCxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUM7S0FDakIsZUFBZSxDQUFDLGVBQWUsQ0FBQztLQUNoQywwQkFBMEIsQ0FBQyxLQUFLLENBQUM7S0FDakMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLDZCQUFZLElBQUksS0FBSyxFQUFFLENBQUMsQ0FBQztBQUU1QyxNQUFBLFlBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxVQUFVLDBDQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtJQUNsRCxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsd0JBQXdCLENBQUMsOEJBQThCLENBQUMsQ0FBQyxDQUFDO0FBQ3hHLENBQUMsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBlYzIgZnJvbSAnYXdzLWNkay1saWIvYXdzLWVjMic7XG5pbXBvcnQgKiBhcyBpYW0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XG5pbXBvcnQgKiBhcyBla3MgZnJvbSAnYXdzLWNkay1saWIvYXdzLWVrcyc7XG5pbXBvcnQgKiBhcyBibHVlcHJpbnRzIGZyb20gJ0Bhd3MtcXVpY2tzdGFydC9la3MtYmx1ZXByaW50cyc7XG5cbmltcG9ydCB7IENMVVNURVJfTkFNRSB9IGZyb20gJy4uL2xpYi9jbHVzdGVyLWNvbmZpZyc7XG5cbmNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG5jb25zdCBzdGFnZSA9IGFwcC5ub2RlLnRyeUdldENvbnRleHQoJ3N0YWdlJykgfHwgJ2Rldic7XG5cbmNvbnN0IGFkZE9uczogQXJyYXk8Ymx1ZXByaW50cy5DbHVzdGVyQWRkT24+ID0gW1xuICAgIG5ldyBibHVlcHJpbnRzLmFkZG9ucy5DbHVzdGVyQXV0b1NjYWxlckFkZE9uLFxuICAgIG5ldyBibHVlcHJpbnRzLmFkZG9ucy5Bd3NMb2FkQmFsYW5jZXJDb250cm9sbGVyQWRkT24sXG4gICAgbmV3IGJsdWVwcmludHMuYWRkb25zLk1ldHJpY3NTZXJ2ZXJBZGRPbixcbiAgICBuZXcgYmx1ZXByaW50cy5hZGRvbnMuQ29udGFpbmVySW5zaWdodHNBZGRPbixcbiAgICBuZXcgYmx1ZXByaW50cy5hZGRvbnMuVnBjQ25pQWRkT24sXG4gICAgbmV3IGJsdWVwcmludHMuYWRkb25zLkNvcmVEbnNBZGRPbixcbiAgICBuZXcgYmx1ZXByaW50cy5hZGRvbnMuS3ViZVByb3h5QWRkT25cbl07XG5jb25zdCBjbHVzdGVyUHJvdmlkZXIgPSBuZXcgYmx1ZXByaW50cy5HZW5lcmljQ2x1c3RlclByb3ZpZGVyKHtcbiAgICB2ZXJzaW9uOiBla3MuS3ViZXJuZXRlc1ZlcnNpb24uVjFfMjEsXG4gICAgbWFuYWdlZE5vZGVHcm91cHM6IFt7XG4gICAgICAgIGlkOiBcImNwdVwiLFxuICAgICAgICBtaW5TaXplOiAyLFxuICAgICAgICBtYXhTaXplOiAxMCxcbiAgICAgICAgaW5zdGFuY2VUeXBlczogW25ldyBlYzIuSW5zdGFuY2VUeXBlKCdjNS5sYXJnZScpXSxcbiAgICAgICAgbm9kZUdyb3VwQ2FwYWNpdHlUeXBlOiBla3MuQ2FwYWNpdHlUeXBlLlNQT1QsXG4gICAgfV1cbn0pO1xuY29uc3QgZWtzQmx1ZXByaW50ID0gYmx1ZXByaW50cy5Fa3NCbHVlcHJpbnQuYnVpbGRlcigpXG4gICAgLmFkZE9ucyguLi5hZGRPbnMpXG4gICAgLmNsdXN0ZXJQcm92aWRlcihjbHVzdGVyUHJvdmlkZXIpXG4gICAgLmVuYWJsZUNvbnRyb2xQbGFuZUxvZ1R5cGVzKCdhcGknKVxuICAgIC5idWlsZChhcHAsIGAke0NMVVNURVJfTkFNRX0tJHtzdGFnZX1gKTtcblxuZWtzQmx1ZXByaW50LmdldENsdXN0ZXJJbmZvKCkubm9kZUdyb3Vwcz8uZm9yRWFjaChuID0+IHtcbiAgICBuLnJvbGUuYWRkTWFuYWdlZFBvbGljeShpYW0uTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoJ0FtYXpvblNTTU1hbmFnZWRJbnN0YW5jZUNvcmUnKSk7XG59KTtcbiJdfQ==