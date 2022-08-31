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
exports.EcrCodeCommitStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const path = __importStar(require("path"));
const ssm = __importStar(require("aws-cdk-lib/aws-ssm"));
const ecr = __importStar(require("aws-cdk-lib/aws-ecr"));
const assets = __importStar(require("aws-cdk-lib/aws-ecr-assets"));
const ecrdeploy = __importStar(require("cdk-ecr-deployment"));
const config_1 = require("../../config");
/**
 * Build 'app/Dockerfile' and push to ECR for X86 and ARM
 */
class EcrCodeCommitStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const stage = props.stage;
        const asset = new assets.DockerImageAsset(this, 'ecr-image', {
            directory: path.join(__dirname, "../../", "app")
        });
        const ecrRepo = new ecr.Repository(this, `${props.repositoryName}`, {
            repositoryName: `${props.repositoryName}`
        });
        new ecrdeploy.ECRDeployment(this, 'ecr-deploy', {
            src: new ecrdeploy.DockerImageName(asset.imageUri),
            dest: new ecrdeploy.DockerImageName(`${ecrRepo.repositoryUriForTag('latest')}`),
        });
        aws_cdk_lib_1.Tags.of(ecrRepo).add('Stage', stage);
        new aws_cdk_lib_1.CfnOutput(this, 'URI', { value: ecrRepo.repositoryUri });
        new ssm.StringParameter(this, 'ssm-ecr-repo-name', { parameterName: `${config_1.SSM_PREFIX}/ecr-repo-name`, stringValue: ecrRepo.repositoryName });
        new ssm.StringParameter(this, 'ssm-ecr-repo-arn', { parameterName: `${config_1.SSM_PREFIX}/ecr-repo-arn`, stringValue: ecrRepo.repositoryArn });
    }
}
exports.EcrCodeCommitStack = EcrCodeCommitStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNyLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZWNyL2xpYi9lY3Itc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDZDQUFxRDtBQUNyRCwyQ0FBNkI7QUFDN0IseURBQTJDO0FBQzNDLHlEQUEyQztBQUMzQyxtRUFBcUQ7QUFDckQsOERBQWdEO0FBRWhELHlDQUE0RDtBQUs1RDs7R0FFRztBQUNILE1BQWEsa0JBQW1CLFNBQVEsbUJBQUs7SUFDekMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFvQjtRQUMxRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQzFCLE1BQU0sS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxXQUFXLEVBQUU7WUFDekQsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUM7U0FDbkQsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxjQUFjLEVBQUUsRUFBRTtZQUNoRSxjQUFjLEVBQUUsR0FBRyxLQUFLLENBQUMsY0FBYyxFQUFFO1NBQzVDLENBQUMsQ0FBQztRQUNILElBQUksU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQzVDLEdBQUcsRUFBRSxJQUFJLFNBQVMsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUNsRCxJQUFJLEVBQUUsSUFBSSxTQUFTLENBQUMsZUFBZSxDQUFDLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7U0FDbEYsQ0FBQyxDQUFDO1FBRUgsa0JBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNyQyxJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztRQUM3RCxJQUFJLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLG1CQUFtQixFQUFFLEVBQUUsYUFBYSxFQUFFLEdBQUcsbUJBQVUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO1FBQzFJLElBQUksR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxhQUFhLEVBQUUsR0FBRyxtQkFBVSxlQUFlLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO0lBQzNJLENBQUM7Q0FDSjtBQXJCRCxnREFxQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcclxuaW1wb3J0IHsgU3RhY2ssIENmbk91dHB1dCwgVGFncyB9IGZyb20gJ2F3cy1jZGstbGliJztcclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0ICogYXMgc3NtIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zc20nO1xyXG5pbXBvcnQgKiBhcyBlY3IgZnJvbSAnYXdzLWNkay1saWIvYXdzLWVjcic7XHJcbmltcG9ydCAqIGFzIGFzc2V0cyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZWNyLWFzc2V0cyc7XHJcbmltcG9ydCAqIGFzIGVjcmRlcGxveSBmcm9tICdjZGstZWNyLWRlcGxveW1lbnQnO1xyXG5cclxuaW1wb3J0IHsgU3RhY2tDb21tb25Qcm9wcywgU1NNX1BSRUZJWCB9IGZyb20gJy4uLy4uL2NvbmZpZyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEVjclN0YWNrUHJvcHMgZXh0ZW5kcyBTdGFja0NvbW1vblByb3BzIHtcclxuICAgIHJlcG9zaXRvcnlOYW1lOiBzdHJpbmc7XHJcbn1cclxuLyoqXHJcbiAqIEJ1aWxkICdhcHAvRG9ja2VyZmlsZScgYW5kIHB1c2ggdG8gRUNSIGZvciBYODYgYW5kIEFSTVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEVjckNvZGVDb21taXRTdGFjayBleHRlbmRzIFN0YWNrIHtcclxuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBFY3JTdGFja1Byb3BzKSB7XHJcbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHN0YWdlID0gcHJvcHMuc3RhZ2U7XHJcbiAgICAgICAgY29uc3QgYXNzZXQgPSBuZXcgYXNzZXRzLkRvY2tlckltYWdlQXNzZXQodGhpcywgJ2Vjci1pbWFnZScsIHtcclxuICAgICAgICAgICAgZGlyZWN0b3J5OiBwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uLy4uL1wiLCBcImFwcFwiKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IGVjclJlcG8gPSBuZXcgZWNyLlJlcG9zaXRvcnkodGhpcywgYCR7cHJvcHMucmVwb3NpdG9yeU5hbWV9YCwge1xyXG4gICAgICAgICAgICByZXBvc2l0b3J5TmFtZTogYCR7cHJvcHMucmVwb3NpdG9yeU5hbWV9YFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG5ldyBlY3JkZXBsb3kuRUNSRGVwbG95bWVudCh0aGlzLCAnZWNyLWRlcGxveScsIHtcclxuICAgICAgICAgICAgc3JjOiBuZXcgZWNyZGVwbG95LkRvY2tlckltYWdlTmFtZShhc3NldC5pbWFnZVVyaSksXHJcbiAgICAgICAgICAgIGRlc3Q6IG5ldyBlY3JkZXBsb3kuRG9ja2VySW1hZ2VOYW1lKGAke2VjclJlcG8ucmVwb3NpdG9yeVVyaUZvclRhZygnbGF0ZXN0Jyl9YCksXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIFRhZ3Mub2YoZWNyUmVwbykuYWRkKCdTdGFnZScsIHN0YWdlKTtcclxuICAgICAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdVUkknLCB7IHZhbHVlOiBlY3JSZXBvLnJlcG9zaXRvcnlVcmkgfSk7XHJcbiAgICAgICAgbmV3IHNzbS5TdHJpbmdQYXJhbWV0ZXIodGhpcywgJ3NzbS1lY3ItcmVwby1uYW1lJywgeyBwYXJhbWV0ZXJOYW1lOiBgJHtTU01fUFJFRklYfS9lY3ItcmVwby1uYW1lYCwgc3RyaW5nVmFsdWU6IGVjclJlcG8ucmVwb3NpdG9yeU5hbWUgfSk7XHJcbiAgICAgICAgbmV3IHNzbS5TdHJpbmdQYXJhbWV0ZXIodGhpcywgJ3NzbS1lY3ItcmVwby1hcm4nLCB7IHBhcmFtZXRlck5hbWU6IGAke1NTTV9QUkVGSVh9L2Vjci1yZXBvLWFybmAsIHN0cmluZ1ZhbHVlOiBlY3JSZXBvLnJlcG9zaXRvcnlBcm4gfSk7XHJcbiAgICB9XHJcbn1cclxuIl19