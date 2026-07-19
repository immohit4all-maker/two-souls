import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1. VPC for RDS
    const vpc = new ec2.Vpc(this, 'TwoSoulsVpc', { maxAzs: 2 });

    const appSecurityGroup = new ec2.SecurityGroup(this, 'AppSecurityGroup', {
      vpc,
      description: 'Security group for the application',
    });

    // 2. RDS PostgreSQL
    const db = new rds.DatabaseInstance(this, 'TwoSoulsDb', {
      engine: rds.DatabaseInstanceEngine.postgres({ version: rds.PostgresEngineVersion.VER_16 }),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE3, ec2.InstanceSize.MICRO),
      vpc,
      databaseName: 'twosouls',
      publiclyAccessible: false,
      securityGroups: [appSecurityGroup],
    });

    // Allow inbound traffic from application security group
    db.connections.allowFrom(appSecurityGroup, ec2.Port.tcp(5432), 'Allow access from application');

    // 3. S3 Bucket
    new s3.Bucket(this, 'TwoSoulsProductAssets', {
      bucketName: 'two-souls-product-assets',
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // For dev
    });

    // 4. Cognito User Pool
    const userPool = new cognito.UserPool(this, 'TwoSoulsUserPool', {
      userPoolName: 'two-souls-users',
      signInAliases: { email: true },
    });
    
    userPool.addClient('AppClient', {
      userPoolClientName: 'two-souls-client',
    });

    // 5. Sample Lambda Function
    const sampleLambda = new nodejs.NodejsFunction(this, 'SampleLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: 'lib/handler.ts',
      handler: 'handler',
      vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
      securityGroups: [appSecurityGroup],
      environment: {
        DB_SECRET_ARN: db.secret!.secretArn,
        DB_HOST: db.dbInstanceEndpointAddress,
        DB_PORT: db.dbInstanceEndpointPort,
        DB_NAME: 'twosouls',
      },
    });

    db.secret!.grantRead(sampleLambda);

    // 6. API Gateway
    const api = new apigateway.RestApi(this, 'TwoSoulsApi', {
      restApiName: 'TwoSoulsApi',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });

    const lambdaIntegration = new apigateway.LambdaIntegration(sampleLambda);
    api.root.addMethod('ANY', lambdaIntegration);
  }
}
