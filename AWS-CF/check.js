import {
  CloudFrontClient,
  GetInvalidationCommand,
} from '@aws-sdk/client-cloudfront'

export default async function handler(req, res) {
  const { id } = req.query
  const client = new CloudFrontClient({
    credentials: {
      accessKeyId: process.env.AWS_CLOUDFRONT_KEY,
      secretAccessKey: process.env.AWS_CLOUDFRONT_SECRET,
    },
    region: process.env.AWS_REGION,
  })
  const command = new GetInvalidationCommand({
    DistributionId: process.env.AWS_CLOUDFRONT_ID,
    Id: id,
  })
  const response = await client.send(command)
  res.json(response)
}
