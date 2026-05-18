export default {
  routes: [
    {
      method: "POST",
      path: "/blog-posts/sync-from-site",
      handler: "blog-post.syncFromSite",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
