### Photography Portfolio Site
Minimal design and display of photo galleries

### Create site using Flask, AWS Elastic Beanstalk, AWS S3, AngularJS

This site was created using Flask, AWS Elastic Beanstalk, AWS S3, and AngularJS. The following steps will show you how to deploy a basic static site with AWS Elastic Beanstalk, storing resources in AWS S3 buckets. The following information assumes you already have a Flask app setup. See site at www.lesliearice.com.

If you haven't created an [Amazon Web Services account]("https://aws.amazon.com/"), go ahead and do so. You will also need to create a User by going to IAM and then to Users. Once you have created a user, go to permissions, and attach policy, selecting "AWSElasticBeanstalkFullAccess". Under this user's summary, there is a User ARN that you will need. In addition, you will need to create an Access Key by going to Security Credentials under this user's summary. Save the Access Key and Secret Key that will be generated.

####AWS S3

In the console, go to S3, and create a bucket. Once you've done so, you can upload resources to that bucket. In the properties of the bucket, you need to go to Permissions, and click Edit Bucket Policy, and add the following, but including your own bucket name and User ARN:
<pre><code>
    {
    	"Version": "2008-10-17",
    	"Statement": [
    		{
    			"Sid": "PublicReadForGetBucketObjects",
    			"Effect": "Allow",
    			"Principal": {
    				"AWS": "*"
    			},
    			"Action": "s3:GetObject",
    			"Resource": "arn:aws:s3:::BUCKET-NAME/*"
    		},
    		{
    			"Sid": "",
    			"Effect": "Allow",
    			"Principal": {
    				"AWS": "USER-ARN"
    			},
    			"Action": "s3:*",
    			"Resource": [
    				"arn:aws:s3:::BUCKET-NAME/*",
    				"arn:aws:s3:::BUCKET-NAME"
    			]
    		}
    	]
    }
</code></pre>

Once you have done this, you should be able to include images, for example, that are stored in your S3 buckets, using the URL: https://s3-us-west-2.amazonaws.com/BUCKET-NAME/*, for example. (*Note: I ended up using CloudFront. If you go to AWS CloudFront and create a distribution, you set the origin domain name to be the S3 bucket you have stored your photos in. Then you can set your image link in your HTML to be the "cloudfront_domain/folder_your_picture_is_in/picture_name"). 

####AWS Elastic Beanstalk
Start by installing the AWS Command Line interface if you have not already done so.  
<code>pip install awscli</code><br><br>
Setup your AWS credentials.  
<code>aws configure</code><br><br>
Create a virtual environment.  
<code>virtualenv eb-virt</code><br>
<code>source eb-virt/bin/activate</code><br>
<code>pip install flask==0.10.1</code><br>
<code>pip freeze > requirements.txt</code><br>
<code>deactivate</code><br><br>
Initialize Elastic Beanstalk environment.  
<code>eb init -p python2.7 site-app-name</code><br>
<code>eb create site-app-name</code><br>
<code>eb open</code>

####AWS Setup Domain
To set up a custom domain, go to the AWS console, and go to Route53. Click hosted zones. Click "Create Hosted Zone". Click on the hosted zone you create, and click create record set. Click Yes under Alias. Set the Alias target to be the Elastic Beanstalk address of your site (ending in elasticbeanstalk.com).
:
