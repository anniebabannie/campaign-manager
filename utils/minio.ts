import * as Minio from 'minio'

export const minioClient = new Minio.Client({
  endPoint: process.env.NODE_ENV === "development" ? 'localhost' : 'campaigns-manager-minio.internal',
  port: 9000,
  useSSL: process.env.NODE_ENV === "development" ? false : true,
  accessKey: process.env.MINIO_ACCESS_KEY!,
  secretKey: process.env.MINIO_SECRET_KEY!,
})