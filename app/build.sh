ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
REGION=$(aws configure get default.region)

echo "ACCOUNT_ID: $ACCOUNT_ID"
echo "REGION: $REGION"
sleep 1

docker build -t eks-cdk-blueprints .

aws ecr create-repository --repository-name eks-cdk-blueprints --image-scanning-configuration scanOnPush=true --region $REGION

docker tag eks-cdk-blueprints:latest ${ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/eks-cdk-blueprints:latest

aws ecr get-login-password --region ${REGION} | docker login --username AWS --password-stdin ${ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com

docker push ${ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/eks-cdk-blueprints:latest

# docker run -it -p 8080:8080 eks-cdk-blueprints