module.exports = {
  title: "Commentor",
  tagline: "",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/",
  favicon: "img/favicon.ico",
  organizationName: "bamlab",
  projectName: "commentor",
  themeConfig: {
    navbar: {
      title: "COMMENTOR",
      logo: {
        alt: "Commentor Logo",
        src: "img/logo.svg"
      },
      links: [
        {
          to: "docs/doc1",
          activeBasePath: "docs",
          label: "Docs",
          position: "left"
        },
        {
          href: "https://github.com/bamlab/commentor",
          label: "GitHub",
          position: "right"
        }
      ]
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Social",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/bamlab/commentor"
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Commentor, Inc. Built with Docusaurus.`
    }
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/facebook/docusaurus/edit/master/website/"
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css")
        }
      }
    ]
  ]
};
