const baseUrl: string = 'http://localhost:9090';
export const ApiEndpoint = {
  apiProduct: {
    product: `${baseUrl}/api/v1/product`,
    create: `${baseUrl}/api/v1/product/create`,
    update: `${baseUrl}/api/v1/product/update`,
    delete: `${baseUrl}/api/v1/product/delete`
  }
}
