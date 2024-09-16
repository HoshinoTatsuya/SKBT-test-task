export const externalsRoutes = {
  msInfo: {
    msName: 'ms-category',
    prefixes: {
      category: 'category',
    },
    apiTags: 'Microservice Category',
  },
  methods: {
    health: {},
    category: {
      create: 'create',
      partialUpdate: 'partialUpdate',
      delete: 'delete',
      getOne: 'getOne',
      getMany: 'getMany',
    },
  },
}
