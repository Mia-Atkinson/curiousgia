# Curious Gia

## Quick Commands

### Sync Code with S3
`aws s3 sync --delete /Users/miaatkinson/curiousgia/ s3://doggos.theneillife.com --exclude '.idea/*' --exclude '.git*' --exclude '*DS_Store*' --exclude 'README.md' --dryrun`

### Sync Photos with S3
`aws s3 sync --delete /Users/miaatkinson/Desktop/GiaInstagram s3://neil-life --exclude '*DS_Store*' --dryrun`