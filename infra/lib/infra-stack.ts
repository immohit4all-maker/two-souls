import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1. VPC for RDS
    const vpc = new ec2.Vpc(this, 'TwoSoulsVpc', { maxAzs: 2 });

    // 2. RDS PostgreSQL
    const db = new rds.DatabaseInstance(this, 'TwoSoulsDb', {
      engine: rds.DatabaseInstanceEngine.postgres({ version: rds.PostgresEngineVersion.VER_16 }),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE3, ec2.InstanceSize.MICRO),
      vpc,
      databaseName: 'twosouls',
      publiclyAccessible: false,
    });

    // Allow inbound traffic from application security group
    // Replace 'APP_SECURITY_GROUP_ID_HERE' with your actual App Security Group ID
    db.connections.allowFrom(ec2.SecurityGroup.fromSecurityGroupId(this, 'AppSecurityGroup', 'APP_SECURITY_GROUP_ID_HERE'), ec2.Port.tcp(5432), 'Allow access from application');

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
  }
}
