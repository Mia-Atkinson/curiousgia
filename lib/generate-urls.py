import boto3
import urllib

# Create an S3 client
s3 = boto3.resource('s3')

# response = s3.list_buckets()
# buckets = [bucket['Name'] for bucket in response['Buckets']]
# print("Bucket List: %s" % buckets)
## Bucket List: [neil-life']


def get_image_names_encode(bucket):
    count = 1
    for object in bucket.objects.all():
        if (count < 3):
            f.write("\"" + urllib.quote_plus(object.key) + "\"" + ',')
            count = count + 1
        else:
            f.write("\"" + urllib.quote_plus(object.key) + "\"" + ',\n')
            count = 1

def get_image_names(bucket):
    count = 1
    for object in bucket.objects.all():
        if (count < 3):
            f.write("\"" + object.key + "\"" + ',')
            count = count + 1
        else:
            f.write("\"" + object.key + "\"" + ',\n')
            count = 1

base_url = "https://s3.amazonaws.com/neil-life/"
my_bucket = s3.Bucket('neil-life')
f = open('image_urls.txt', 'w')
get_image_names(my_bucket)
