import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from '@aws-sdk/client-cloudfront'

module.exports = async (req, res) => {
  let Response = {
    success: false,
    error: 'Default error',
  }

  let { path } = req.query

  if (!path) {
    Response = {
      success: false,
      message: 'Error: path needed.',
    }
  } else {
    if (path.indexOf('http') > -1) {
      path = new URL(path).pathname
    }
    const URLs = [path]

    const client = new CloudFrontClient({
      credentials: {
        accessKeyId: process.env.AWS_CLOUDFRONT_KEY,
        secretAccessKey: process.env.AWS_CLOUDFRONT_SECRET,
      },
      region: process.env.AWS_REGION,
    })
    const command = new CreateInvalidationCommand({
      DistributionId: process.env.AWS_CLOUDFRONT_ID,
      InvalidationBatch: {
        CallerReference: Date.now().toString(),
        Paths: {
          Quantity: URLs.length,
          Items: URLs,
        },
      },
    })
    let Invalidation = {}
    const data = await client.send(command)
    Invalidation = data.Invalidation
    console.log('Invalidation:', {
      id: Invalidation.Id,
      status: Invalidation.Status,
      createdtime: Invalidation.CreateTime,
      path: path,
    })
    Response = {
      success: true,
      Invalidation,
    }
  }
  if (!Response.success) {
    console.error(Response, body)
  }
  res.json(Response)
}
