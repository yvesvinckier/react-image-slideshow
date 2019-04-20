const path = require('path');


exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;
    return new Promise((resolve, reject) => {
        graphql(`
      {
        allContentfulGallery {
          edges {
            node {
                slug
            }
          }
        }
      }    
    `).then(results => {
            results.data.allContentfulGallery.edges.forEach(({ node }) => {
                createPage({
                    path: node.slug,
                    component: path.resolve('./src/components/project.js'),
                    context: {
                        slug: node.slug,
                    }
                });
            })
            resolve();
        })
    });
}